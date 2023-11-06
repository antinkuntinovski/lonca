const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'http://192.168.0.83:5000' // Replace with your backend domain if running a build
    : 'http://localhost:5000'; // Use your development API URL when running in production

export default API_BASE_URL;
