# Blogger Platform

A full-stack blogging application built with React and Node.js, featuring user authentication, post management, categories, author management, and commenting capabilities.

## 📋 Table of Contents
- [Screenshots](#screenshots)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)

---

## 📸 Screenshots

### Login
![Login Screen](./screenshots/Screenshot%202026-04-16%20230703.png)

### JWT Token Stored in Cookie
![JWT Token in Cookie](./screenshots/Screenshot%202026-04-16%20230734.png)

### User Management
![User Management](./screenshots/Screenshot%202026-04-16%20233828.png)

### Post Editor
![Post Editor](./screenshots/Screenshot%202026-04-16%20230832.png)

### Author Management
![Author Management](./screenshots/Screenshot%202026-04-16%20233841.png)

### Category Management
![Category Management](./screenshots/Screenshot%202026-04-16%20233855.png)

### Comment Management
![Category Management](./screenshots/Screenshot%202026-04-16%20230820.png)

## Overview

This is a comprehensive blogging platform that allows users to create, read, update, and delete blog posts. Users can manage multiple authors, organize posts into categories, and enable commenting functionality. The application features role-based access control with JWT-based authentication.

## ✨ Features

- **User Management**
  - User registration and login with MD5 password encryption
  - User authentication using JWT tokens
  - Session management with cookies

- **Post Management**
  - Create, read, update, and delete blog posts
  - Categorize posts with multiple categories
  - Author assignment to posts
  - Status tracking (published/draft/active/inactive)

- **Author Management**
  - Create and manage multiple authors
  - Store author contact information (email, phone)
  - Track author creation dates

- **Category Management**
  - Create custom categories with descriptions
  - Organize posts by category
  - Status management for categories

- **Comments System**
  - Comment on blog posts
  - Comment moderation (approved/pending/rejected)
  - Track comment metadata

- **Admin Dashboard**
  - DataGrid-based UI for managing all entities
  - Real-time data fetching
  - Delete and update operations with confirmations
  - Responsive Material-UI design

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Material-UI (MUI)** - Component library
- **DataGrid** - Data table component
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **SweetAlert2** - Alert dialogs
- **Redux** - State management (optional)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **MD5** - Password encryption
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request parsing middleware

## 📁 Project Structure

```
Blogger/
├── backend/
│   ├── schemas/           # MongoDB schemas
│   │   ├── users-schema.js
│   │   ├── posts-schema.js
│   │   ├── category-schema.js
│   │   ├── comment-schema.js
│   │   └── auther-schema.js
│   ├── models/            # Mongoose models
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── category.js
│   ├── model/             # Business logic models
│   │   ├── user-model.js
│   │   ├── posts-model.js
│   │   ├── category-model.js
│   │   ├── comment-model.js
│   │   └── Auther-model.js
│   ├── controllers/       # Request handlers
│   │   ├── user-controller.js
│   │   ├── users-controller.js
│   │   ├── post-controller.js
│   │   ├── posts-controller.js
│   │   ├── category-controller.js
│   │   ├── categroy-controller.js
│   │   ├── comments-controller.js
│   │   └── Auther-controller.js
│   ├── routers/           # Route definitions
│   │   ├── users.js
│   │   ├── post.js
│   │   ├── category.js
│   │   ├── comments.js
│   │   └── Auther.js
│   ├── helpers/           # Utility functions
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── mongodb.js
│   │   └── mongoose.js
│   ├── db/                # JSON data backups
│   ├── index.js           # Server entry point
│   ├── doc.js
│   └── package.json
│
├── frontend/
│   ├── public/            # Static files
│   ├── src/
│   │   ├── Pages/         # Page components
│   │   │   ├── Accounts/  # User management
│   │   │   ├── Authors/   # Author management
│   │   │   ├── Categoray/ # Category management
│   │   │   ├── Comments/  # Comment management
│   │   │   ├── Posts/     # Post management
│   │   │   └── login/     # Authentication
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context API
│   │   ├── api/           # API configuration
│   │   ├── Stores/        # Redux stores
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```
   MONGODB_URI=mongodb://localhost:27017/blogger
   JWT_SECRET=your_jwt_secret_here
   PORT=3000
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3001`

## 📡 API Endpoints

### Users
- `POST /users/login` - User login
- `POST /users/adduser` - Create new user
- `GET /users/getuser` - Get all users
- `POST /users/verify` - Verify token
- `POST /users/logout` - Logout user

### Authors
- `GET /author/authlist` - Get all authors
- `POST /author/addauth` - Create author
- `PUT /author/updateauth/:cid` - Update author
- `DELETE /author/deleteauth/:cid` - Delete author

### Categories
- `GET /category/catlist` - Get all categories
- `POST /category/addcat` - Create category
- `PUT /category/updatecat/:cid` - Update category
- `DELETE /category/deletecat/:cid` - Delete category

### Posts
- `GET /post/posts` - Get all posts
- `POST /post/addpost` - Create post
- `PUT /post/updatepost/:cid` - Update post
- `DELETE /post/deletepost/:cid` - Delete post

### Comments
- `GET /comment/commentsdata` - Get all comments
- `POST /comment/addcomment` - Create comment
- `PUT /comment/updatecomment/:cid` - Update comment
- `DELETE /comment/deletecomment/:cid` - Delete comment

## 📊 Database Schema

### Users Collection
```javascript
{
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  password: String (MD5 hashed),
  status: String,
  created: Date
}
```

### Authors Collection
```javascript
{
  first_name: String,
  last_name: String,
  email: String,
  phone: Number,
  status: String,
  created: Date
}
```

### Categories Collection
```javascript
{
  cat_name: String,
  cat_desc: String,
  status: String,
  created: Date
}
```

### Posts Collection
```javascript
{
  title: String,
  description: String,
  status: String,
  created: Date,
  cat_id: ObjectId (references categories),
  auth_id: ObjectId (references Authors)
}
```

### Comments Collection
```javascript
{
  comment: String,
  subject: String,
  status: String,
  post_id: ObjectId (references Posts),
  created: Date
}
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in with email and password
2. Password is hashed using MD5
3. JWT token is generated and stored in a secure cookie
4. Token is verified for protected routes
5. Token expires after 1 hour

