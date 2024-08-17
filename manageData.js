$(document).ready(function() {
    // Function to load all tenants from the server and display them in the table
    function loadTenants() {
        $.ajax({
            url: 'http://localhost:3000/api/tenant',
            method: 'GET',
            success: function(tenants) {
                $('#tenantTable').empty();
                tenants.forEach(function(tenant) {
                    $('#tenantTable').append(`<tr>
                        <td><button class="btn btn-danger deleteTenant" data-id="${tenant._id}">Delete</button></td>
                        <td><button class="btn btn-primary updateTenant" data-id="${tenant._id}">Update</button></td>
                        <td><button class="btn btn-success submitUpdatedTenant" data-id="${tenant._id}" style="display:none;">Submit</button></td>
                        <td data-editable="true" data-key="title">${tenant.title}</td>
                        <td data-editable="true" data-key="firstName">${tenant.firstName}</td>
                        <td data-editable="true" data-key="surname">${tenant.surname}</td>
                        <td data-editable="true" data-key="mobile">${tenant.mobile}</td>
                        <td data-editable="true" data-key="email">${tenant.email}</td>
                        <td data-editable="true" data-key="homeAddressLine1">${tenant.homeAddress.addressLine1}</td>
                        <td data-editable="true" data-key="homeAddressLine2">${tenant.homeAddress.addressLine2}</td>
                        <td data-editable="true" data-key="homeTown">${tenant.homeAddress.town}</td>
                        <td data-editable="true" data-key="homeCountyCity">${tenant.homeAddress.countyCity}</td>
                        <td data-editable="true" data-key="homeEIRCODE">${tenant.homeAddress.eircode}</td>
                    </tr>`);
                });
            },
            error: function(xhr) {
                console.error('Error loading tenants:', xhr.responseText);
            }
        });
    }

    // Event handler to add a new tenant input row to the table when the 'add tenant' button is clicked
    $('#addTenantBtn').click(function() {
        const newRow = `<tr>
            <td></td>
            <td></td>
            <td><button class="btn btn-success submitTenant">Submit</button></td>
            <td><input type="text" class="newTitle" placeholder="Title"></td>
            <td><input type="text" class="newFirstName" placeholder="First Name"></td>
            <td><input type="text" class="newSurname" placeholder="Surname"></td>
            <td><input type="text" class="newMobile" placeholder="Mobile"></td>
            <td><input type="email" class="newEmail" placeholder="Email"></td>
            <td><input type="text" class="newHomeAddressLine1" placeholder="Home Address Line 1"></td>
            <td><input type="text" class="newHomeAddressLine2" placeholder="Home Address Line 2"></td>
            <td><input type="text" class="newHomeTown" placeholder="Home Town"></td>
            <td><input type="text" class="newHomeCountyCity" placeholder="Home County/City"></td>
            <td><input type="text" class="newHomeEIRCODE" placeholder="Home EIRCODE"></td>
        </tr>`;
        $('#tenantTable').append(newRow);
    });

    // Event handler for submitting a new tenant
    $('body').on('click', '.submitTenant', function() {
        const row = $(this).closest('tr');
        const tenant = {
            title: row.find('.newTitle').val(),
            firstName: row.find('.newFirstName').val(),
            surname: row.find('.newSurname').val(),
            mobile: row.find('.newMobile').val(),
            email: row.find('.newEmail').val(),
            homeAddress: {
                addressLine1: row.find('.newHomeAddressLine1').val(),
                addressLine2: row.find('.newHomeAddressLine2').val(),
                town: row.find('.newHomeTown').val(),
                countyCity: row.find('.newHomeCountyCity').val(),
                eircode: row.find('.newHomeEIRCODE').val()
            }
        };
        $.ajax({
            url: 'http://localhost:3000/api/tenant',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(tenant),
            success: function() {
                loadTenants(); 
            },
            error: function(xhr) {
                console.error('Error adding tenant:', xhr.responseText);
            }
        });
    });

    // Event handler for deleting a tenant
    $('body').on('click', '.deleteTenant', function() {
        const tenantId = $(this).data('id');
        $.ajax({
            url: `http://localhost:3000/api/tenant/${tenantId}`,
            method: 'DELETE',
            success: function() {
                loadTenants(); 
            },
            error: function(xhr) {
                console.error('Error deleting tenant:', xhr.responseText);
            }
        });
    });

    // Event handler for initiating update mode on tenant records
    $('body').on('click', '.updateTenant', function() {
        const row = $(this).closest('tr');
        row.find('td[data-editable="true"]').each(function() {
            const currentText = $(this).text();
            const dataType = $(this).data('type') || 'text';
            const dataKey = $(this).data('key');
            $(this).html(`<input type="${dataType}" value="${currentText}" class="form-control" data-key="${dataKey}">`);
        });
        row.find('.submitUpdatedTenant').show(); 
    });

    // Event handler for submitting updated tenant data
    $('body').on('click', '.submitUpdatedTenant', function() {
        const row = $(this).closest('tr');
        const id = $(this).data('id');

        // Validation to ensure title is correct
        const title = row.find('[data-key="title"] input').val();
        if (!['Mr', 'Mrs', 'Ms', 'Dr', 'Mx', 'Miss', 'Other'].includes(title)) {
            alert('Invalid title. Please select from Mr, Mrs, Ms, Dr, Mx, Miss, Other.');
            return; 
        }

        const updatedTenant = {
            title: row.find('[data-key="title"] input').val(),
            firstName: row.find('[data-key="firstName"] input').val(),
            surname: row.find('[data-key="surname"] input').val(),
            mobile: row.find('[data-key="mobile"] input').val(),
            email: row.find('[data-key="email"] input').val(),
            homeAddress: {
                addressLine1: row.find('[data-key="homeAddressLine1"] input').val(),
                addressLine2: row.find('[data-key="homeAddressLine2"] input').val(),
                town: row.find('[data-key="homeTown"] input').val(),
                countyCity: row.find('[data-key="homeCountyCity"] input').val(),
                eircode: row.find('[data-key="homeEIRCODE"] input').val()
            }
        };
        $.ajax({
            url: `http://localhost:3000/api/tenant/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedTenant),
            success: function(response) {
                loadTenants(); 
                $(this).hide(); 
            },
            error: function(xhr) {
                console.error('Error updating tenant information:', xhr.responseText);
            }
        });
    });

    // Initial data load when the document is ready
    loadTenants();
});







$(document).ready(function() {
    // Function to load all landlords from the server and display them in the table
    function loadLandlords() {
        $.ajax({
            url: 'http://localhost:3000/api/landlord',
            method: 'GET',
            success: function(landlords) {
                $('#landlordTable').empty();
                landlords.forEach(function(landlord) {
                    $('#landlordTable').append(`<tr>
                        <td><button class="btn btn-danger deleteLandlord" data-id="${landlord._id}">Delete</button></td>
                        <td><button class="btn btn-primary updateLandlord" data-id="${landlord._id}">Update</button></td>
                        <td><button class="btn btn-success submitUpdatedLandlord" data-id="${landlord._id}" style="display:none;">Submit</button></td>
                        <td data-editable="true" data-key="title">${landlord.title}</td>
                        <td data-editable="true" data-key="firstName">${landlord.firstName}</td>
                        <td data-editable="true" data-key="surname">${landlord.surname}</td>
                        <td data-editable="true" data-key="mobile">${landlord.mobile}</td>
                        <td data-editable="true" data-key="email">${landlord.email}</td>
                        <td data-editable="true" data-key="homeAddressLine1">${landlord.homeAddress.addressLine1}</td>
                        <td data-editable="true" data-key="homeAddressLine2">${landlord.homeAddress.addressLine2 || ''}</td>
                        <td data-editable="true" data-key="homeTown">${landlord.homeAddress.town}</td>
                        <td data-editable="true" data-key="homeCountyCity">${landlord.homeAddress.countyCity}</td>
                        <td data-editable="true" data-key="homeEIRCODE">${landlord.homeAddress.eircode || ''}</td>
                        <td data-editable="true" data-key="dob">${landlord.dob ? new Date(landlord.dob).toLocaleDateString() : ''}</td>
                        <td data-editable="true" data-key="permissionToRent">${landlord.permissionToRent ? 'Yes' : 'No'}</td>
                        <td data-editable="true" data-key="allowContactByEmail">${landlord.allowContactByEmail ? 'Yes' : 'No'}</td>                        
                    </tr>`);
                });
            },
            error: function(xhr) {
                console.error('Error loading landlords:', xhr.responseText);
            }
        });
    }

    // Event handler to add a new landlord input row to the table when the 'add landlord' button is clicked
    $('#addLandlordBtn').click(function() {
        const newRow = `<tr>
            <td></td>
            <td></td>
            <td><button class="btn btn-success submitLandlord">Submit</button></td>
            <td><input type="text" class="newTitle" placeholder="Title"></td>
            <td><input type="text" class="newFirstName" placeholder="First Name(s)"></td>
            <td><input type="text" class="newSurname" placeholder="Surname"></td>
            <td><input type="text" class="newMobile" placeholder="Mobile"></td>
            <td><input type="email" class="newEmail" placeholder="Email"></td>
            <td><input type="text" class="newHomeAddressLine1" placeholder="Home Address Line 1"></td>
            <td><input type="text" class="newHomeAddressLine2" placeholder="Home Address Line 2"></td>
            <td><input type="text" class="newHomeTown" placeholder="Home Town"></td>
            <td><input type="text" class="newHomeCountyCity" placeholder="Home County/City"></td>
            <td><input type="text" class="newHomeEIRCODE" placeholder="Home EIRCODE"></td>
            <td><input type="text" class="newDOB" placeholder="Date of Birth"></td>
            <td><input type="checkbox" class="newPermissionToRent"> Permission to Rent</td>
            <td><input type="checkbox" class="newAllowContactByEmail"> Allow Email Contact</td>
        </tr>`;
        $('#landlordTable').append(newRow);
    });

    // Event handler for submitting a new landlord
    $('body').on('click', '.submitLandlord', function() {
        const row = $(this).closest('tr');
        const landlord = {
            title: row.find('.newTitle').val(),
            firstName: row.find('.newFirstName').val(),
            surname: row.find('.newSurname').val(),
            mobile: row.find('.newMobile').val(),
            email: row.find('.newEmail').val(),
            homeAddress: {
                addressLine1: row.find('.newHomeAddressLine1').val(),
                addressLine2: row.find('.newHomeAddressLine2').val(),
                town: row.find('.newHomeTown').val(),
                countyCity: row.find('.newHomeCountyCity').val(),
                eircode: row.find('.newHomeEIRCODE').val()
            },
            // dob: new Date(row.find('.newDOB').val()).toISOString(),
            dob: row.find('.newDOB').val(),
            permissionToRent: row.find('.newPermissionToRent').is(':checked'),
            allowContactByEmail: row.find('.newAllowContactByEmail').is(':checked')
        };
        $.ajax({
            url: 'http://localhost:3000/api/landlord',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(landlord),
            success: function() {
                loadLandlords(); // Reload the landlord list upon successful creation
            },
            error: function(xhr) {
                console.error('Error adding landlord:', xhr.responseText);
            }
        });
    });

    // Event handler for deleting a landlord
    $('body').on('click', '.deleteLandlord', function() {
        const landlordId = $(this).data('id');
        $.ajax({
            url: `http://localhost:3000/api/landlord/${landlordId}`,
            method: 'DELETE',
            success: function() {
                loadLandlords(); // Reload the landlord list after deletion
            },
            error: function(xhr) {
                console.error('Error deleting landlord:', xhr.responseText);
            }
        });
    });

    // Event handler for initiating update mode on landlord records
    $('body').on('click', '.updateLandlord', function() {
        const row = $(this).closest('tr');
        row.find('td[data-editable="true"]').each(function() {
            const currentText = $(this).text();
            const dataType = $(this).data('type') || 'text';
            const dataKey = $(this).data('key');
            $(this).html(`<input type="${dataType}" value="${currentText}" class="form-control" data-key="${dataKey}">`);
        });
        row.find('.submitUpdatedLandlord').show();
    });

    // Event handler for submitting updated landlord data
    $('body').on('click', '.submitUpdatedLandlord', function() {
        const row = $(this).closest('tr');
        const id = $(this).data('id');
        // Validation to ensure title is correct
        const title = row.find('[data-key="title"] input').val();
        if (!['Mr', 'Mrs', 'Ms', 'Dr', 'Mx', 'Miss', 'Other'].includes(title)) {
            alert('Invalid title. Please select from Mr, Mrs, Ms, Dr, Mx, Miss, Other.');
            return; 
        }
        const dobValue = row.find('.newDOB').val();

        const updatedLandlord = {
            title: row.find('[data-key="title"] input').val(),
            firstName: row.find('[data-key="firstName"] input').val(),
            surname: row.find('[data-key="surname"] input').val(),
            mobile: row.find('[data-key="mobile"] input').val(),
            email: row.find('[data-key="email"] input').val(),
            homeAddress: {
                addressLine1: row.find('[data-key="homeAddressLine1"] input').val(),
                addressLine2: row.find('[data-key="homeAddressLine2"] input').val(),
                town: row.find('[data-key="homeTown"] input').val(),
                countyCity: row.find('[data-key="homeCountyCity"] input').val(),
                eircode: row.find('[data-key="homeEIRCODE"] input').val()
            },
            // dob: dobDate ? dobDate.toISOString() : null,
            dob: row.find('[data-key="dob"] input').val(),
            permissionToRent: row.find('.newPermissionToRent').is(':checked'),
            allowContactByEmail: row.find('.newAllowContactByEmail').is(':checked')
        };
        $.ajax({
            url: `http://localhost:3000/api/landlord/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedLandlord),
            success: function(response) {
                loadLandlords(); // Reload the landlord list to reflect changes
                $(this).hide(); // Hide the submit button after successful update
            },
            error: function(xhr) {
                console.error('Error updating landlord information:', xhr.responseText);
            }
        });
    });


    // Initialize data loading
    loadLandlords();
});






$(document).ready(function() {
    // Function to load all contracts from the server and display them in the table
    function loadContracts() {
        $.ajax({
            url: 'http://localhost:3000/api/contract',
            method: 'GET',
            success: function(contracts) {
                $('#contractTable').empty();
                contracts.forEach(function(contract) {
                    const formattedDate = new Date(contract.contractDate).toLocaleDateString();
                    $('#contractTable').append(`<tr>
                        <td><button class="btn btn-danger deleteContract" data-id="${contract._id}">Delete</button></td>
                        <td><button class="btn btn-primary updateContract" data-id="${contract._id}">Update</button></td>
                        <td><button class="btn btn-success submitUpdatedContract" data-id="${contract._id}" style="display:none;">Submit</button></td>
                        <td data-editable="true" data-key="contractDate">${formattedDate}</td>
                        <td data-editable="true" data-key="propertyAddress">${contract.propertyAddress}</td>
                        <td data-editable="true" data-key="tenants">${contract.tenants.join(', ')}</td>
                        <td data-editable="true" data-key="landlord">${contract.landlord}</td>
                        <td data-editable="true" data-key="feeMonthly">${contract.feeMonthly.toFixed(2)}</td>
                        <td data-editable="true" data-key="contractLength">${contract.contractLength}</td>
                        <td data-editable="true" data-key="propertyType">${contract.propertyType}${contract.propertyType === 'Other' ? `: ${contract.propertyTypeOther}` : ''}</td>
                    </tr>`);
                });
            },
            error: function(xhr) {
                console.error('Error loading contracts:', xhr.responseText);
            }
        });
    }

    // Event handler to add a new contract input row to the table when the 'add contract' button is clicked
    $('#addContractBtn').click(function() {
        const newRow = `<tr>
            <td></td>
            <td></td>
            <td><button class="btn btn-success submitContract">Submit</button></td>
            <td><input type="text" class="newContractDate" placeholder="Contract Date"></td>
            <td><input type="text" class="newPropertyAddress" placeholder="Property Address"></td>
            <td><input type="text" class="newTenantIDs" placeholder="Tenant ID(s)"></td>
            <td><input type="text" class="newLandlordID" placeholder="Landlord ID"></td>
            <td><input type="number" class="newFeeMonthly" placeholder="Fee (Monthly)"></td>
            <td><select class="newContractLength"><option>Month</option><option>Year</option><option>Permanent</option></select></td>
            <td><select class="newPropertyType">
                <option>Apartment</option><option>Semi-Detached</option><option>Detached</option><option>Other</option>
                </select><input type="text" class="newPropertyTypeOther" style="display:none;" placeholder="Specify other type"></td>
        </tr>`;
        $('#contractTable').append(newRow);
    });

    // Event handler for submitting a new contract
    $('body').on('click', '.submitContract', function() {
        const row = $(this).closest('tr');
        const contract = {
            contractDate: row.find('.newContractDate').val(),
            propertyAddress: row.find('.newPropertyAddress').val(),
            tenants: row.find('.newTenantIDs').val().split(',').map(id => id.trim()),
            landlord: row.find('.newLandlordID').val(),
            feeMonthly: parseFloat(row.find('.newFeeMonthly').val()),
            contractLength: row.find('.newContractLength').val(),
            propertyType: row.find('.newPropertyType').val(),
            propertyTypeOther: row.find('.newPropertyType').val() === 'Other' ? row.find('.newPropertyTypeOther').val() : undefined
        };
        $.ajax({
            url: 'http://localhost:3000/api/contract',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(contract),
            success: function() {
                loadContracts(); // Reload the contract list upon successful creation
            },
            error: function(xhr) {
                console.error('Error adding contract:', xhr.responseText);
            }
        });
    });

    // Event handler for deleting a contract
    $('body').on('click', '.deleteContract', function() {
        const contractId = $(this).data('id');
        $.ajax({
            url: `http://localhost:3000/api/contract/${contractId}`,
            method: 'DELETE',
            success: function() {
                loadContracts(); // Reload the contract list after deletion
            },
            error: function(xhr) {
                console.error('Error deleting contract:', xhr.responseText);
            }
        });
    });

    // Event handler for initiating update mode on contract records
    $('body').on('click', '.updateContract', function() {
        const row = $(this).closest('tr');
        row.find('td[data-editable="true"]').each(function() {
            const currentText = $(this).text();
            const dataType = $(this).data('type') || 'text';
            const dataKey = $(this).data('key');
            $(this).html(`<input type="${dataType}" value="${currentText}" class="form-control" data-key="${dataKey}">`);
        });
        if (row.find('[data-key="propertyType"] select').val() === 'Other') {
            row.find('.newPropertyTypeOther').show();
        }
        row.find('.submitUpdatedContract').show();
    });

    // Event handler for submitting updated contract data
    $('body').on('click', '.submitUpdatedContract', function() {
        const row = $(this).closest('tr');
        const id = $(this).data('id');
        const updatedContract = {
            contractDate: new Date(row.find('[data-key="contractDate"] input').val()).toISOString(),
            propertyAddress: row.find('[data-key="propertyAddress"] input').val(),
            feeMonthly: parseFloat(row.find('[data-key="feeMonthly"] input').val()),
            contractLength: row.find('[data-key="contractLength"] select').val(),
            propertyType: row.find('[data-key="propertyType"] select').val(),
            propertyTypeOther: row.find('[data-key="propertyType"] select').val() === 'Other' ? row.find('.newPropertyTypeOther').val() : undefined
        };
        $.ajax({
            url: `http://localhost:3000/api/contract/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedContract),
            success: function(response) {
                loadContracts(); // Reload the contract list to reflect changes
                $(this).hide(); // Hide the submit button after successful update
            },
            error: function(xhr) {
                console.error('Error updating contract information:', xhr.responseText);
            }
        });
    });
    
    // Initialize data loading
    loadContracts();
});
