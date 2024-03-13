/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/

let baseUrl = "http://localhost:8080/spring_pos/";

loadAllCustomers();

/**
 * Save Customer Button
 **/
$("#btnSaveCustomer").click(function () {
    let formData = $("#customerForm").serialize();
    $.ajax({
        url: baseUrl + "customer",
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (resp) {
            successAlert("Customer", resp.message);
            loadAllCustomers();
        },
        error: function (error) {
            errorAlert("Customer", JSON.parse(error.responseText).message);
        }
    });
});

/**
 * Update Customer Button
 **/
$("#btnUpdateCustomer").click(function () {
    let cusId = $("#txtCusId").val();
    let cusName = $("#txtCusName").val();
    let cusAddress = $("#txtCusAddress").val();
    let cusSalary = $("#txtCusSalary").val();

    let customerObj = {
        id: cusId,
        name: cusName,
        address: cusAddress,
        salary: cusSalary
    };

    $.ajax({
        url: baseUrl + "customer",
        method: "PUT",
        contentType: "application/json",        // Specify content type of the request body
        data: JSON.stringify(customerObj),      // This is the actual request
        dataType: 'json',                       // Specify server is expecting json data
        success: function (resp) {
            successAlert("Customer", resp.message);
            loadAllCustomers();
        },
        error: function (error) {
            errorAlert("Customer", JSON.parse(error.responseText).message);
        }
    });
});

/**
 * Delete Customer Button
 **/
$("#btnDeleteCustomer").click(function () {
    let cusId = $("#txtCusId").val();
    let cusName = $("#txtCusName").val();
    let cusAddress = $("#txtCusAddress").val();
    let cusSalary = $("#txtCusSalary").val();

    const customerObj = {
        id: cusId,
        name: cusName,
        address: cusAddress,
        salary: cusSalary
    };

    $.ajax({
        url: baseUrl + "customer",
        method: "DELETE",
        contentType: "application/json",
        data: JSON.stringify(customerObj),
        dataType: 'json',
        success: function (resp) {
            successAlert("Customer", resp.message);
            loadAllCustomers();
        },
        error: function (error) {
            errorAlert("Customer", JSON.parse(error.responseText).message);
        }
    });
});

$("#btnSaveCustomer").attr('disabled', true);
$("#btnUpdateCustomer").attr('disabled', true);
$("#btnDeleteCustomer").attr('disabled', true);

function generateCustomerID() {
    $("#txtCusId").val("C00-001");
    $.ajax({
        url: baseUrl + "customer/CustomerIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtCusId").val("C00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtCusId").val("C00-0" + tempId);
            } else {
                $("#txtCusId").val("C00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

function setTextFieldValues(id, name, address, salary) {
    $("#txtCusId").val(id);
    $("#txtCusName").val(name);
    $("#txtCusAddress").val(address);
    $("#txtCusSalary").val(salary);
    $("#txtCusName").focus();
    checkValidity(customerValidations);
    $("#btnSaveCustomer").attr('disabled', true);
    $("#btnUpdateCustomer").attr('disabled', true);
    $("#btnDeleteCustomer").attr('disabled', true);
}

function loadAllCustomers() {
    $("#customerTable").empty();
    $.ajax({
        url: baseUrl + "customer/loadAllCustomer",
        method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let id = i.id;
                let name = i.name;
                let address = i.address;
                let salary = i.salary;

                let row = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + address + "</td><td>" + salary + "</td></tr>";
                $("#customerTable").append(row);
            }
            blindClickEvents();
            generateCustomerID();
            setTextFieldValues("", "", "", "");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

function blindClickEvents() {
    $("#customerTable>tr").on("click", function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();
        console.log(id, name, address, salary);

        $("#txtCusId").val(id);
        $("#txtCusName").val(name);
        $("#txtCusAddress").val(address);
        $("#txtCusSalary").val(salary);
    });
    $("#btnSaveCustomer").attr('disabled', true);
}

$("#txtSearchCusId").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#txtSearchCusId").val();
        $("#customerTable").empty();
        $.ajax({
            url: baseUrl + "customer/searchCusId/?id=" + search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                let row = "<tr><td>" + res.id + "</td><td>" + res.name + "</td><td>" + res.address + "</td><td>" + res.salary + "</td></tr>";
                $("#customerTable").append(row);
                blindClickEvents();
            },
            error: function (error) {
                loadAllCustomers();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});

$("#txtCusId").focus();
const regExCusID = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{3,20}$/;
const regExCusAddress = /^[A-z0-9/ ]{4,30}$/;
const regExSalary = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let customerValidations = [];
customerValidations.push({
    reg: regExCusID, field: $('#txtCusId'), error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: regExCusName, field: $('#txtCusName'), error: 'Customer Name Pattern is Wrong : A-z 3-20'
});
customerValidations.push({
    reg: regExCusAddress, field: $('#txtCusAddress'), error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
});
customerValidations.push({
    reg: regExSalary, field: $('#txtCusSalary'), error: 'Customer Salary Pattern is Wrong : 0-9{1,}.0-9{1,2}'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtCusId,#txtCusName,#txtCusAddress,#txtCusSalary").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#txtCusId,#txtCusName,#txtCusAddress,#txtCusSalary").on('keyup', function (event) {
    checkValidity(customerValidations);
});

$("#txtCusId,#txtCusName,#txtCusAddress,#txtCusSalary").on('blur', function (event) {
    checkValidity(customerValidations);
});

$("#txtCusId").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusID, $("#txtCusId"))) {
        $("#txtCusName").focus();
    } else {
        focusText($("#txtCusId"));
    }
});

$("#txtCusName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusName, $("#txtCusName"))) {
        focusText($("#txtCusAddress"));
    }
});

$("#txtCusAddress").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress, $("#txtCusAddress"))) {
        focusText($("#txtCusSalary"));
    }
});

$("#txtCusSalary").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSalary, $("#txtCusSalary"))) {
        if (event.which === 13) {
            $('#btnSaveCustomer').focus();
        }
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveCustomer").attr('disabled', true);
        $("#btnUpdateCustomer").attr('disabled', true);
        $("#btnDeleteCustomer").attr('disabled', true);
    } else {
        $("#btnSaveCustomer").attr('disabled', false);
        $("#btnUpdateCustomer").attr('disabled', false);
        $("#btnDeleteCustomer").attr('disabled', false);
    }
}