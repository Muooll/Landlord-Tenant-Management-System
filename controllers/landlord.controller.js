const Landlord = require('../models/landlord.js')

// Retrieve all landlords from the database
const getLandlords = async (req, res) => {
    try {
        const landlords = await Landlord.find({});
        res.status(200).json(landlords);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Retrieve a single landlord by ID
const getLandlord = async (req, res) => {
    try {
        const {id} = req.params;
        const landlord = await Landlord.findById(id);
        res.status(200).json(landlord);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Create a new landlord and add them to the database
const postLandlord = async (req, res) => {
    try {
        const landlord = await Landlord.create(req.body);
        res.status(200).json(landlord);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update an existing landlord's information
const updateLandlord = async (req, res) => {
    try {
        const {id} = req.params;
        const landlord = await Landlord.findByIdAndUpdate(id, req.body, {new: true});
        if (!landlord) {
            return res.status(404).json({message: "Landlord not found"});
        }
        res.status(200).json(landlord);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete a landlord from the database
const deleteLandlord = async (req, res) => {
    try {
        const {id} = req.params;
        const landlord = await Landlord.findByIdAndDelete(id);
        if (!landlord) {
            return res.status(404).json({message: "Landlord not found"});
        }
        res.status(200).json({message: "Landlord deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Export the controller methods to be used in other parts of the application
module.exports = {
    getLandlords,
    getLandlord,
    postLandlord,
    updateLandlord,
    deleteLandlord
};



// Impact on REST API Development:
// The REST API provides HTTP request methods like GET, POST, PUT, and DELETE to perform operations on landlord resources.
// Each API endpoint corresponds to a controller method responsible for handling the respective HTTP request and interacting with the database.
// Asynchronous operations (async/await) are used in controller methods to handle database queries and operations, ensuring efficient and reliable code execution.
