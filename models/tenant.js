const mongoose = require('mongoose');

// Define the schema for the Tenant model
const TenantSchema = mongoose.Schema({
    title: {
        type: String,
        enum: ['Mr', 'Mrs', 'Ms', 'Dr', 'Mx', 'Miss', 'Other'],
        required: [true, 'Title is required']
    },
    titleOther: {
        type: String,
        required: function() { return this.title === 'Other'; },  // Require this field only if title is 'Other'
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
    }
});

// Create the Tenant model based on the schema
const Tenant = mongoose.model("Tenant", TenantSchema);

module.exports = Tenant;  // Export the Tenant model for use in other parts of the application



// Database Design:

// MongoDB is utilized as the underlying database management system.
// Mongoose is employed as the Node.js object modeling tool for MongoDB, facilitating the creation and management of data schemas.
// The Tenant model schema is defined, incorporating various attributes such as title, first name, surname, mobile number, email address, and home address.
// Validation rules are implemented to ensure the completeness and accuracy of the data, including required fields and custom validations for specific conditions such as the title being 'Other'.