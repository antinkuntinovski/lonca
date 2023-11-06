# Lonca
 Vendor Dashboard Case Study for lonca.co

## Getting Started:
   ### Clone the Repository:
        - "git clone https://github.com/antinkuntinovski/lonca.git"
  
   ### Start the Backend
   - Navigate to the lonca/backend directory.
   - Install the required dependencies by running:
     - npm install
   - Launch the backend server by running:
     - npm run serve

   ### Start the Frontend
   - Navigate to the lonca/dashboard directory.
   - Install the necessary frontend dependencies with:
   -  npm install
        
   - To run the frontend in development mode, execute:
   -  npm start
   
   -  Alternatively, to run the frontend in build mode, execute the following:
            - npm run build
            - serve -S build
            - (In order to run in build mode, modify the API_BASE_URL constant in lonca/dashboard/src/config.js to match the public IP of your backend environment)
 
## General
- The backend server by default uses port 5000. Ensure that this port is available or modify the code to specify an alternative port if needed.
- The web application is designed to run on localhost port 3000. If port 3000 is not available, React will automatically select the next available port. Simply navigate to the designated port in your web browser, and the Lonca Vendor Dashboard will be accessible.

