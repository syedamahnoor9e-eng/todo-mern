# 📝 MERN Task Management App

A full-stack Task Management System built using the MERN stack (MongoDB, Express.js, React, Node.js).
This application allows users to manage tasks efficiently with authentication and role-based access.

---

## 🚀 Features

* 🔐 User Authentication (Register / Login)
* 🧑‍💼 Protected Routes (User & Admin)
* 📋 Create, Edit, Delete Tasks 
* 🗓️ Add Due Dates to Tasks
* ✅ Mark Tasks as Complete / Incomplete
* 🔍 Filter Tasks (Completed / Pending)
* 📊 Task Statistics (Total, Completed, Pending)
* 📊 Personal Dashboard for task tracking
* ⚡ Smooth and responsive UI
* ⚡ Fast frontend using Vite + React
* 🌐 RESTful API with Express & Node.js
* 🗄️ MongoDB database integration

## 🧑‍💼 Admin Features
* 👥 View all users and statistics
* 📋 Monitor all tasks across users
* 🛠️ Manage user activities (if implemented / extendable)
* 🔐 Role-based access control (Admin vs User)

---

### ✅ Demo Admin Access

Email: ahmed@gmail.com
Password: Pk@1234567

This is a demo account provided for testing admin features.

---

## 🛠️ Tech Stack

### Frontend:

* React.js (Vite)
* Axios
* Tailwind CSS 

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Nodemon (For development)

---

## 📁 Project Structure

```
todo-mern/
│
├── client/        # React Frontend
├── server/        # Node.js Backend
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/syedamahnoor9e-eng/todo-mern.git
cd todo-mern
```

---

### 2️⃣ Setup Backend

cd server
npm install

Create a .env file inside /server and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend (with auto-restart using nodemon):

npm run dev

⚠️ Make sure your package.json has:
"dev": "nodemon index.js"

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🌍 API Base URL

```
http://localhost:5000/api
```

---

## 🔐 Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| MONGO_URI  | MongoDB connection string |
| JWT_SECRET | Secret key for JWT        |

---

## 📌 Future Improvements

* 🌐 Deploy frontend & backend
* 📱 Responsive UI improvements
* 🔔 Notifications
* 🧠 Advanced task filtering
* 👥 Team collaboration (shared tasks)
* 🗂️ Task grouping (projects / categories)
* 🔔 Real-time notifications & reminders
* 📈 Advanced analytics dashboard (track project progress, completion percentage, and productivity insights)
* 🌐 Full deployment (Frontend + Backend)
* 🔒 Advanced role management (permissions)

---

## 👩‍💻 Author

**Syeda Mahnoor**
Software Engineer | MERN Stack Developer

---


