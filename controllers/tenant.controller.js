const Tenant = require('../models/tenant.js')

// Retrieve all tenants from the database
const getTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find({});
        res.status(200).json(tenants);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Retrieve a single tenant by ID
const getTenant = async (req, res) => {
    try {
        const {id} = req.params;
        const tenant = await Tenant.findById(id);
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Create a new tenant and add them to the database
const postTenant = async (req, res) => {
    try {
        const tenant = await Tenant.create(req.body);
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update an existing tenant's information
const updateTenant = async (req, res) => {
    try {
        const {id} = req.params;
        const tenant = await Tenant.findByIdAndUpdate(id, req.body, {new: true});
        if (!tenant) {
            return res.status(404).json({message: "Tenant not found"});
        }
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete a tenant from the database
const deleteTenant = async (req, res) => {
    try {
        const {id} = req.params;
        const tenant = await Tenant.findByIdAndDelete(id);
        if (!tenant) {
            return res.status(404).json({message: "Tenant not found"});
        }
        res.status(200).json({message: "Tenant deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Export the controller methods to be used in other parts of the application
module.exports = {
    getTenants,
    getTenant,
    postTenant,
    updateTenant,
    deleteTenant
};



// Impact on REST API Development:
// The REST API provides HTTP request methods like GET, POST, PUT, and DELETE to perform operations on landlord resources.
// Each API endpoint corresponds to a controller method responsible for handling the respective HTTP request and interacting with the database.
// Asynchronous operations (async/await) are used in controller methods to handle database queries and operations, ensuring efficient and reliable code execution.
