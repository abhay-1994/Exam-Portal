# Exam-Portal

An online exam management portal built with Node.js, Express, MySQL, and JWT authentication.  
Supports role-based access for students and a single admin user.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation & Setup](#installation--setup)  
- [Database Setup](#database-setup)  
- [Running the Application](#running-the-application)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## Project Overview

Exam-Portal is a full-stack web application designed to manage online examinations.  
Students can register, login, and take exams (future feature).  
Admin has special privileges and can register only once in the system.  

The backend uses JWT for secure authentication and bcrypt for password encryption.

---

## Features

- User registration and login for students  
- Single admin registration and login  
- Password hashing with bcrypt  
- JWT-based authentication and role-based access control  
- Validation and error handling  
- Separate tables for students and admin users

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Authentication:** JWT, bcrypt  
- **Config Management:** dotenv  
- **Frontend:** (React + Tailwind CSS — if applicable)

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or above recommended)  
- MySQL database server

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/abhay-1994/Exam-Portal.git
   cd Exam-Portal
Exam-Portal/
│
├── backend/
│   ├── controllers/      # API logic handlers
│   ├── models/           # Database queries/models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions (e.g. hashing, token)
│   ├── server.js         # Entry point
│   └── ...
│
├── frontend/             # React frontend 
│
├── .env                  # Environment variables
├── package.json
├── README.md
└── ...
