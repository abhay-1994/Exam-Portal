import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: any;
  userRole: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (
    name: string,
    email: string,
    password: string,
    rollNumber: string
  ) => Promise<boolean>; // ✅ Added
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const API_URL = "http://localhost:5003/api/auth";

  // Restore user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setUserRole(storedRole);
    }
  }, []);

  const login = async (email: string, password: string, role: string) => {
    console.log(role);
    let path = role === "admin" ? "login-admin" : "login";
    try {
      const res = await axios.post(
        `${API_URL}/${path}`,
        { email, password }
      );
      const { token, user } = res.data;

      // Store token + user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      setUser(user);
      setUserRole(user.role);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    rollNumber: string
  ): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5003/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          rollNumber,
          role: "student",
        }), // role set to 'student'
      });

      if (!res.ok) return false;
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
