# Real-Time Chat Application

This project is a real-time chat application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Socket.IO for real-time communication. It features a reliable real-time chat interface, a solid backend, and a respectable frontend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Challenges and Learnings](#challenges-and-learnings)
- [Areas for Improvement](#areas-for-improvement)
- [Next Steps](#next-steps)

## Features

- Real-time messaging with Socket.IO
- User authentication and management
- Persistent chat history with MongoDB
- Notifications for new messages
- Online user tracking
- Responsive and user-friendly UI

## Technologies Used

- **Frontend**: React, React-Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for ODM)
- **Real-time Communication**: Socket.IO
- **Deployment**: Vite (for development), Express server

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB database (local or cloud-based, e.g., MongoDB Atlas)
- An environment to host the application (e.g., AWS, Heroku, or a local server)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/eyzee00/flashat-app.git
    cd flashat-app/
    ```

2. **Install dependencies**:

    For the backend:
    
    ```bash
    cd server/
    npm install
    ```
    
    For the frontend:
    
    ```bash
    cd client/
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory of your backend with the following variables:
    
    ```bash
    PORT=6808
    ATLAS_URI=your_mongodb_connection_string
    ```

    Adjust the values as needed, especially the MongoDB connection string.

4. **Start the application**:

    - **Backend**: 

      Start the Express server:
      
      ```bash
      cd server/
      node index.js # preferably install pm2 and run the server using it
      ```

    - **Frontend**:

      Start the React application using Vite:
      
      ```bash
      cd client/
      npm run dev
      ```

5. **Access the application**:

    - Open your browser and navigate to `http://localhost:5173` to see the frontend in action.

## Configuration

### SSL Configuration (Optional but recommended)

To secure your application with HTTPS, follow these steps:

1. **Obtain SSL Certificates**:
   - You can use Let's Encrypt or another SSL provider to get your certificates.

2. **Configure Express for HTTPS**:
   - Update your Express server setup to use the SSL certificates.

3. **Redirect HTTP to HTTPS**:
   - Modify your server configuration to redirect all HTTP traffic to HTTPS.

4. **Update Frontend**:
   - Ensure your frontend is connecting to the backend over HTTPS.

### Socket.IO Configuration

The Socket.IO connection is configured to keep the socket connection alive using a ping-pong mechanism. This ensures that the connection remains active, even when there is no chat activity for a while.

### Handling Mixed Content Issues

When deploying, ensure that your socket connections and other resources are served over HTTPS to avoid mixed content issues.

## Usage

- **Registering And Logging In**: Users can register and log in to access their chats.
- **Sending Messages**: Users can send and receive messages in real-time.
- **Notifications**: Receive notifications for new messages.
- **Online Users**: View which users are currently online.

## Challenges and Learnings From This Project

### Challenges

- **Deployment**: Deploying the app and configuring the server presented challenges, particularly with ensuring proper SSL setup and handling mixed content issues.
- **Frontend Development**: As a backend engineer, working on the frontend was more challenging but also a valuable learning experience.

### Lessons Learned

- **Importance of Deployment**: Deployment is as critical as development; a well-developed application must be properly configured and deployed to function as intended.
- **Core Backbone**: The ability to send and receive requests is the backbone of a web application. Real-time features add complexity but significantly enhance user experience.

## Areas for Improvement

- **UI Enhancements**: The user interface can be improved to be more intuitive and visually appealing.
- **User Joining System**: Implement a system to better handle new users joining the chat.
- **Reconnect System**: Add a robust system to handle socket reconnections if the connection drops.

## Next Steps

- **Scaling**: Consider adding more servers and load balancers to handle increased traffic if resources are available.
- **Message Encryption**: Implement end-to-end encryption for messages to enhance security.
- **Improved User Management**: Enhance the user authentication and management system for better security and user experience.

