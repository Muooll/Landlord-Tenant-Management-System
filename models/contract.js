const mongoose = require('mongoose');

// Define the schema for the Contract model
const ContractSchema = mongoose.Schema({
    contractDate: {
        type: Date,
        required: [true, 'Contract Date is required']
    },
    propertyAddress: {
        type: String,
        required: [true, 'Property Address is required']
    },
    tenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: [true, 'At least one tenant is required']
    }],
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Landlord',
        required: [true, 'Landlord is required']
    },
    feeMonthly: {
        type: Number,
        required: [true, 'Fee (Monthly) is required']
    },
    propertyDoorNumber: {
        type: String,
        required: [true, 'Property Door Number is required']
    },
    contractLength: {
        type: String,
        enum: ['Month', 'Year', 'Permanent'],
        required: [true, 'Contract Length is required']
    },
    propertyType: {
        type: String,
        enum: ['Apartment', 'Semi-Detached', 'Detached', 'Other'],
        required: [true, 'Property Type is required']
    },
    propertyTypeOther: {
        type: String,
        required: function() { return this.propertyType === 'Other'; }
    }
}, {
    validateBeforeSave: true
});

// Validate the number of tenants
ContractSchema.path('tenants').validate(function (value) {
    return value.length <= 3 && value.length > 0;
}, 'The number of tenants must be between 1 and 3');

// Create the Contract model based on the schema
const Contract = mongoose.model("Contract", ContractSchema);

module.exports = Contract; // Export the Contract model for use in other parts of the application



// Database Design:
// MongoDB serves as the chosen database management system.
// Mongoose is utilized as the Node.js object modeling tool for MongoDB.
// The schema for the Contract model is defined, encompassing various attributes such as contract date, property address, tenants, landlord, monthly fee, property door number, contract length, and property type.
// Validation rules are applied to ensure the integrity of the data, including required fields, enum types, and custom validations such as the number of tenants.
