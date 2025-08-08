// backend/controllers/authController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = (req, res) => {
  try {
    const { name, email, rollNumber, password, role } = req.body;

    // Default role to student if not provided
    const userRole = role || "student";

    if (!name || !email || !rollNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    db.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Database error (register):", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
          if (hashErr) {
            console.error("Hashing error:", hashErr);
            return res
              .status(500)
              .json({ message: "Password encryption failed" });
          }

          // Insert new user
          db.query(
            "INSERT INTO users (name, email, roll_number, password, role) VALUES (?, ?, ?, ?, ?)",
            [name, email, rollNumber, hashedPassword, userRole],
            (insertErr, result) => {
              if (insertErr) {
                console.error("Database insert error:", insertErr);
                return res.status(500).json({ message: "Registration failed" });
              }

              // Auto login after successful signup
              const token = jwt.sign(
                {
                  id: result.insertId,
                  role: userRole,
                  name,
                  email,
                  rollNumber,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );

              return res.status(201).json({
                message: "Registered successfully",
                token,
                user: {
                  id: result.insertId,
                  name,
                  email,
                  rollNumber,
                  role: userRole,
                },
              });
            }
          );
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error (register):", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// LOGIN
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        console.error("Database error (login):", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const user = results[0];

      // Compare password
      bcrypt.compare(password, user.password, (compareErr, isMatch) => {
        if (compareErr || !isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
          {
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email,
            rollNumber: user.roll_number,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            rollNumber: user.roll_number,
            role: user.role,
          },
        });
      });
    });
  } catch (error) {
    console.error("Unexpected error (login):", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.registerAdmin = (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Default role to 'admin'
    const userRole = role || "admin";

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check if admin already exists in admins table
    db.query(
      "SELECT id FROM admins WHERE role = ?",
      ["admin"],
      (err, adminResults) => {
        if (err) {
          console.error("Database error (check admin):", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (adminResults.length > 0) {
          return res
            .status(400)
            .json({ message: "An admin user already exists" });
        }

        // Check if email already exists in admins table
        db.query(
          "SELECT id FROM admins WHERE email = ?",
          [email],
          (emailErr, emailResults) => {
            if (emailErr) {
              console.error("Database error (check email):", emailErr);
              return res.status(500).json({ message: "Internal server error" });
            }

            if (emailResults.length > 0) {
              return res.status(400).json({ message: "Email already exists" });
            }

            // Hash password
            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
              if (hashErr) {
                console.error("Hashing error:", hashErr);
                return res
                  .status(500)
                  .json({ message: "Password encryption failed" });
              }

              // Insert new admin user into admins table
              db.query(
                "INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, userRole],
                (insertErr, result) => {
                  if (insertErr) {
                    console.error("Database insert error:", insertErr);
                    return res
                      .status(500)
                      .json({ message: "Registration failed" });
                  }

                  // Generate JWT token for the admin user
                  const token = jwt.sign(
                    {
                      id: result.insertId,
                      role: userRole,
                      name,
                      email,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                  );

                  return res.status(201).json({
                    message: "Admin registered successfully",
                    token,
                    user: {
                      id: result.insertId,
                      name,
                      email,
                      role: userRole,
                    },
                  });
                }
              );
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Unexpected error (registerAdmin):", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.loginAdmin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    db.query(
      "SELECT * FROM admins WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Database error (admin login):", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const admin = results[0];

        // Compare password
        bcrypt.compare(password, admin.password, (compareErr, isMatch) => {
          if (compareErr || !isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
          }

          // Generate JWT
          const token = jwt.sign(
            {
              id: admin.id,
              role: admin.role,
              name: admin.name,
              email: admin.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          console.log(token);

          res.cookie("token", token, {
            maxAge: 1 * 60 * 60 * 1000,
          });

          res.json({
            token,
            user: {
              id: admin.id,
              name: admin.name,
              email: admin.email,
              role: admin.role,
            },
          });
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error (admin login):", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
