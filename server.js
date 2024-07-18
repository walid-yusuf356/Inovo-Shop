import http from 'http';
import app from './app/app.js';


// create the server and listen on the port specified in the .env file
const PORT = process.env.PORT || 7000;
const server = http.createServer(app);
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     }
// );
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));