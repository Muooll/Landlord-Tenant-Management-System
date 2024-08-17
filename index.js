//Using macOS operating system and Chrome browser.
//These codes provide provides a framework for a web application designed to manage tenant, landlord, and contract data for a prototype Landlord-Tenant Management System. 
//Including Express.js for server-side operations, MongoDB for data storage, and jQuery combined with Bootstrap for the frontend.

const express = require('express');
const mongoose = require('mongoose');
const tenantRoute = require('./routes/tenant.route.js');
const landlordRoute = require('./routes/landlord.route.js');
const contractRoute = require('./routes/contract.route.js');
const cors = require('cors'); // Include CORS to allow cross-origin resource sharing

const app = express(); // Create an instance of express

// Middleware
app.use(express.json()); // Enable the server to accept JSON requests
app.use(express.urlencoded({ extended: false })); // Enable the server to accept URL-encoded requests
app.use(cors()); // Apply CORS middleware to allow cross-origin requests

// Routes
app.use("/api/tenant", tenantRoute); // Mount tenant-related routes at /api/tenant
app.use("/api/landlord", landlordRoute); // Mount landlord-related routes at /api/landlord
app.use("/api/contract", contractRoute); // Mount contract-related routes at /api/contract

// Database connection
mongoose.connect("mongodb+srv://miuolee0408:t8KuM2375LS6etvQ@backenddb.hvy69va.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
    // Start the server
    app.listen(3000, () => {
        console.log("Server is running on port 3000"); 
    });
})
.catch(() => {
    console.log("Connection failed!"); // Notify if database connection fails
});

