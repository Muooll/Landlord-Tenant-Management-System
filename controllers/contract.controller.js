const Contract = require('../models/contract.js')

// Retrieve all contracts from the database
const getContracts = async (req, res) => {
    try {
        const contracts = await Contract.find({});
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Retrieve a single contract by ID
const getContract = async (req, res) => {
    try {
        const {id} = req.params;
        const contract = await Contract.findById(id);
        if (!contract) {
            return res.status(404).json({message: "Contract not found"});
        }
        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Create a new contract and add it to the database
const postContract = async (req, res) => {
    try {
        const contract = await Contract.create(req.body);
        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update an existing contract's information
const updateContract = async (req, res) => {
    try {
        const {id} = req.params;
        const contract = await Contract.findByIdAndUpdate(id, req.body, {new: true});
        if (!contract) {
            return res.status(404).json({message: "Contract not found"});
        }
        res.status(200).json(contract);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete a contract from the database
const deleteContract = async (req, res) => {
    try {
        const {id} = req.params;
        const contract = await Contract.findByIdAndDelete(id);
        if (!contract) {
            return res.status(404).json({message: "Contract not found"});
        }
        res.status(200).json({message: "Contract deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Export the controller methods to be used in other parts of the application
module.exports = {
    getContracts,
    getContract,
    postContract,
    updateContract,
    deleteContract
};



// Impact on REST API Development:
// The REST API provides HTTP request methods like GET, POST, PUT, and DELETE to perform operations on landlord resources.
// Each API endpoint corresponds to a controller method responsible for handling the respective HTTP request and interacting with the database.
// Asynchronous operations (async/await) are used in controller methods to handle database queries and operations, ensuring efficient and reliable code execution.
