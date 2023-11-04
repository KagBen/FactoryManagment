# Factory Management System - Full Stack Project

![Project Image](https://example.com/project-image.png)

Developed a comprehensive Factory Management System web application catering to administrators, based on a full stack of technologies, including Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript. This project empowers efficient management of employees, departments, and shifts.

## Features

- **User Authentication**: Secure login with JWT-based authentication. Different user roles, including admin and non-admin, offer varying access levels.
- **Employee Management**: Detailed employee information and efficient management of employees and departments. Admins can add, edit, and delete employee details.
- **Shift Management**: Efficient shift management and employee assignments. Admins can create, update, and delete shifts.
- **Department Management**: Create, edit, or delete departments with ease. Admins have full control over department management.
- **Role-Based Access**: Role-based access control ensures that admin users have controlled access to user data, while non-admin users have limited access.
- **Action Limits**: The system enforces daily action limits to maintain system integrity, allowing admins to monitor and restrict user actions.
- **Automatic Logout**: Users are automatically logged out if they exceed their daily action limits, enhancing security.

## Technology Stack

- **Server**: Node.js and Express.js for a robust backend.
- **Database**: MongoDB for efficient data storage and retrieval.
- **Frontend**: HTML, CSS, and JavaScript for a seamless user interface.
- **Authentication**: Secure login and user management using JSON Web Tokens (JWT).
- **Session Management**: Implementing server-side sessions for user interaction.
- **RESTful API**: Designing a RESTful API for seamless communication.

## Prerequisites

Before running the project, ensure you have the following prerequisites installed:

- Node.js (version x.x.x)
- npm (version x.x.x)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/KagBen/FullStack-FactoryMangmentSystem.git
   cd FullStack-FactoryMangmentSystem

2.Install project dependencies:
   ```bash
   npm install


3.Create a .env file in the project root directory and add the following environment variables:
   ````bash
   MONGODB_PATH = "mongodb://localhost:27017/factoryMangmentDb"
JWT_ACCESS_SECRET_TOKEN = "YanivAradF&ina4Pr0j3ct"
SESSION_SECRET_KEY = "$96HashedKeyBcrypt"
SERVER_PORT = '3000'

4.Start the server:
   ```bash
   npm start

## Dependencies
- express
- mongoose
- jsonwebtoken
- express-session
- cors
- dotenv
- bcrypt
- axios
