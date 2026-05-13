


# **LostLink** <img src="https://avatars.githubusercontent.com/u/80686842?v=4" width="45" align="right" alt="Prerit Agarwal">


LostLink is a comprehensive, full-stack campus Lost and Found platform. It provides a seamless way for students and staff to report lost items, track found items, and connect with each other to return belongings. 

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://lostlink-08.web.app/)

---

## 🚀 **Features**

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **Item Management**: Users can report lost items and post found items.
- **Dashboard**: Track reported and found items.
- **Modern UI**: A responsive, accessible interface built with React and TailwindCSS.
- **Animations**: Smooth transitions using Framer Motion and AOS.
- **Form Handling**: Robust form validation and state management using Formik and Yup.

---


## Tech Stack

**Client:**
- React (v18)
- TailwindCSS
- React Router DOM
- Firebase
- Axios
- Formik & Yup
- Framer Motion

**Server:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- Bcrypt.js
- Morgan


## 📁 **Project Structure**

This repository uses a split client-server architecture:
```
📦 lostLink
┣ client 
┣ server
┗ README.md
```
- `client/` - Contains the React application.
- `server/` - Contains the Node.js/Express API.

---

## 🛠️ **Setup & Installation**

### 1. Clone the repository

```bash
git clone https://github.com/prerit008/lostLink.git
cd lostLink
```

### 2. Server Setup

Navigate to the `server` directory, install dependencies, and start the development server:

```bash
cd server
npm install
```

**Environment Variables:**
Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=5000
DB=<Your-MongoDB-Connection-String>
JWT_SECRET=<Your-JWT-Secret>
```

Run the server:
```bash
npm start
```

### 3. Client Setup

Open a new terminal window, navigate to the `client` directory, install dependencies, and start the React app:

```bash
cd client
npm install
```

**Environment Variables:**
Create a `.env` file in the `client` directory and add the following variables:
```env
REACT_APP_API_URL=<YOUR_SERVER_URL>,
REACT_APP_FIREBASE_API_KEY= <YOUR_API_KEY>,
REACT_APP_FIREBASE_AUTH_DOMAIN= <YOUR_AUTH_DOMAIN>,
REACT_APP_FIREBASE_PROJECT_ID= <YOUR_PROJECT_ID>,
REACT_APP_FIREBASE_STORAGE_BUCKET= <YOUR_STORAGE_BUCKET>,
REACT_APP_FIREBASE_MESSAGING_SENDER_ID= <YOUR_MESSAGING_SENDER_ID>,
REACT_APP_FIREBASE_APP_ID= <YOUR_APP_ID>,
REACT_APP_FIREBASE_MEASUREMENT_ID= <YOUR_MEASUREMENT_ID>,
```

Run the frontend:
```bash
npm start
```
---

## 🤝 **Contributing**

Contributions are welcome!
Feel free to open issues or submit PRs for bug fixes, features, or improvements.

---

## 🌐 **Live Demo**

You can try the live deployed version here:

👉 **[https://lostlink-08.web.app/](https://lostlink-08.web.app/)**