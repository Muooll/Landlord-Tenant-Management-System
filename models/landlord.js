const mongoose = require('mongoose');

// Define the schema for the Landlord model
const LandlordSchema = mongoose.Schema({
    title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Ms', 'Dr', 'Mx', 'Miss', 'Other'],
        required: [true, 'Title is required']
    },
    titleOther: {
        type: String,
        required: function() { return this.title === 'Other'; },
    },
    firstName: {
        type: String,
        required: [true, 'First Name(s) is required']
    },
    surname: {
        type: String,
        required: [true, 'Surname is required']
    },
    mobile: {
        type: String,
        required: [true, 'Phone Number is required']
    },
    email: {
        type: String,
        required: [true, 'Email address is required']
    },
    homeAddress: {
        addressLine1: {
            type: String,
            required: [true, 'Home address line 1 is required']
        },
        addressLine2: {
            type: String
        },
        town: {
            type: String,
            required: [true, 'Town is required']
        },
        countyCity: {
            type: String,
            required: [true, 'County/City is required']
        },
        eircode: {
            type: String
        }
    },
    dob: {
        type: Date,
        required: [true, 'Date of Birth is required']
    },
    permissionToRent: {
        type: Boolean,
        required: [true, 'Permission to rent properties from the council is required']
    },
    allowContactByEmail: {
        type: Boolean,
        required: [true, 'Permission for tenants to contact via email is required']
    }
});

// Create the Landlord model based on the schema
const Landlord = mongoose.model("Landlord", LandlordSchema);

module.exports = Landlord; // Export the Landlord model for use in other parts of the application




// Database Design:

// MongoDB is adopted as the database management system.
// Mongoose is utilized as the Node.js object modeling tool for MongoDB.
// The schema for the Landlord model is defined, encompassing personal information and attributes of the landlord, such as name, contact details, address, date of birth, etc.
// Validation rules are applied to certain fields in the landlord schema, such as required fields and enum types, to ensure data integrity and accuracy.