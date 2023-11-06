# Lonca Vendor Dashboard

This document will guide you through the steps to set up and run the Lonca Vendor Dashboard on your local environment.

## Getting Started

### Clone the Repository

To get started, clone the Lonca Vendor Dashboard repository by running the following command:

```bash
git clone https://github.com/antinkuntinovski/lonca.git
```

### Start the Backend

1. Navigate to the backend directory:
   ```bash
   cd lonca/backend
   ```

2. Install the required backend dependencies:
   ```bash
   npm install
   ```

3. Launch the backend server:
   ```bash
   npm run serve
   ```

### Start the Frontend

1. Navigate to the dashboard directory:
   ```bash
   cd lonca/dashboard
   ```

2. Install the necessary frontend dependencies:
   ```bash
   npm install
   ```

3. To run the frontend in development mode, execute:
   ```bash
   npm start
   ```

Alternatively, to run the frontend in build mode, follow these steps:

   - Build the frontend:
     ```bash
     npm run build
     ```

   - Serve the built files:
     ```bash
     serve -S build
     ```

   To run the app successfully in build mode, you need to modify the `API_BASE_URL` constant in `lonca/dashboard/src/config.js` to match the public IP of your backend environment.

## General

- The backend server, by default, uses port 5000. If this port is not available, you can modify the .env file in the backend directory to specify an alternative port.
- The web application is designed to run on localhost port 3000. If port 3000 is not available, React will automatically select the next available port. You can access the Lonca Vendor Dashboard by navigating to the designated port in your web browser.

