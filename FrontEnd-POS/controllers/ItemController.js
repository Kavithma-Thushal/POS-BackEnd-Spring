/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/

let baseUrl = "http://localhost:8080/spring_pos/";
loadAllItems();
/**
 * Item Save
 * */

$("#btnAddItem").attr('disabled', true);
$("#btnUpdateItem").attr('disabled', true);
$("#btnDeleteItem").attr('disabled', true);

/**
 * Item Save
 * Item ID
 * */
function generateItemID() {
    $("#txtItemCode").val("I00-001");
    $.ajax({
        url: baseUrl + "item/ItemIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let code = resp.value;
            let tempId = parseInt(code.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtItemCode").val("I00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtItemCode").val("I00-0" + tempId);
            } else {
                $("#txtItemCode").val("I00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * Button Add New Item
 * */
$("#btnAddItem").click(function () {
    let formData = $("#itemForm").serialize();
    $.ajax({
        url: baseUrl + "item",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            successAlert("item", res.message);
            loadAllItems();
        },
        error: function (error) {
            errorAlert("item", JSON.parse(error.responseText).message);
        }
    });
});

/**
 * clear input fields Values Method
 * */
function setTextFieldValues(code, description, qty, price) {
    $("#txtItemCode").val(code);
    $("#txtItemDescription").val(description);
    $("#txtItemQuantity").val(qty);
    $("#txtItemUnitPrice").val(price);
    $("#txtItemDescription").focus();
    checkValidity(ItemsValidations);
    $("#btnAddItem").attr('disabled', true);
    $("#btnUpdateItem").attr('disabled', true);
    $("#btnDeleteItem").attr('disabled', true);

}

/**
 * load all Item Method
 * */
function loadAllItems() {
    $("#itemTable").empty();
    $.ajax({
        url: baseUrl + "item/loadAllItem",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            for (let i of res.data) {
                let code = i.code;
                let description = i.description;
                let qty = i.qty;
                let unitPrice = i.unitPrice;

                let row = "<tr><td>" + code + "</td><td>" + description + "</td><td>" + qty + "</td><td>" + unitPrice + "</td></tr>";
                $("#itemTable").append(row);
            }
            blindClickEvents();
            generateItemID();
            setTextFieldValues("", "", "", "");
            console.log(res.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEvents() {
    $("#itemTable>tr").on("click", function () {
        let code = $(this).children().eq(0).text();
        let description = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let unitPrice = $(this).children().eq(3).text();
        console.log(code, description, qty, unitPrice);

        $("#txtItemCode").val(code);
        $("#txtItemDescription").val(description);
        $("#txtItemQuantity").val(qty);
        $("#txtItemUnitPrice").val(unitPrice);
    });
    $("#btnAddItem").attr('disabled', true);
}


/**
 * Search id and Load Table
 * */
$("#txtSearchItemCode").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#txtSearchItemCode").val();
        $("#itemTable").empty();
        $.ajax({
            url: baseUrl + "item/searchItemCode/?code=" + search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                let row = "<tr><td>" + res.code + "</td><td>" + res.description + "</td><td>" + res.qty + "</td><td>" + res.unitPrice + "</td></tr>";
                $("#itemTable").append(row);
                blindClickEvents();
            },
            error: function (error) {
                loadAllItems();
                let message = JSON.parse(error.responseText).message;
                emptyMessage(message);
            }
        })
    }
});

/**
 * Item Update
 * */

/**
 * Update Action
 * */
$("#btnUpdateItem").click(function () {

    let code = $("#txtItemCode").val();
    let description = $("#txtItemDescription").val();
    let qty = $("#txtItemQuantity").val();
    let unitPrice = $("#txtItemUnitPrice").val();

    var itemOb = {
        code: code,
        description: description,
        qty: qty,
        unitPrice: unitPrice
    }

    $.ajax({
        url: baseUrl + "item",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(itemOb),
        success: function (res) {
            successAlert("Item", res.message);
            loadAllItems();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            errorAlert("Item", message);
        }
    });
});


/**
 * Item Delete
 * */

/**
 * Delete Action
 * */
$("#btnDeleteItem").click(function () {

    let itCode = $("#txtItemCode").val();
    let itDescription = $("#txtItemDescription").val();
    let itQty = $("#txtItemQuantity").val();
    let itUnitPrice = $("#txtItemUnitPrice").val();

    const itemOb = {
        code: itCode,
        description: itDescription,
        qty: itQty,
        unitPrice: itUnitPrice
    }
    $.ajax({
        url: baseUrl + "item",
        method: "delete",
        contentType: "application/json",
        data: JSON.stringify(itemOb),
        success: function (res) {
            successAlert("Item", res.message);
            loadAllItems();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            errorAlert("Item", message);
        }
    });
});


/**
 * Auto Forces Input Fields Save
 * */
$("#txtItemCode").focus();
const regExItemCode = /^(I00-)[0-9]{3,4}$/;
const regExItemName = /^[A-z ]{3,20}$/;
const regExItemPrice = /^[0-9]{1,10}$/;
const regExItemQtyOnHand = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let ItemsValidations = [];
ItemsValidations.push({
    reg: regExItemCode,
    field: $('#txtItemCode'),
    error: 'Item ID Pattern is Wrong : I00-001'
});
ItemsValidations.push({
    reg: regExItemName,
    field: $('#txtItemDescription'),
    error: 'Item Name Pattern is Wrong : A-z 3-20'
});
ItemsValidations.push({
    reg: regExItemPrice,
    field: $('#txtItemQuantity'),
    error: 'Item Qty Pattern is Wrong : 0-9 1-10'
});
ItemsValidations.push({
    reg: regExItemQtyOnHand,
    field: $('#txtItemUnitPrice'),
    error: 'Item Salary Pattern is Wrong : 100 or 100.00'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtItemCode,#txtItemDescription,#txtItemQuantity,#txtItemUnitPrice").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode,#txtItemDescription,#txtItemQuantity,#txtItemUnitPrice").on('keyup', function (event) {
    checkValidity(ItemsValidations);
});

$("#txtItemCode,#txtItemDescription,#txtItemQuantity,#txtItemUnitPrice").on('blur', function (event) {
    checkValidity(ItemsValidations);
});

/**
 * Enable ENTER-KEY
 **/
$("#txtItemCode").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemCode, $("#txtItemCode"))) {
        $("#txtItemDescription").focus();
    }
});
$("#txtItemDescription").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemName, $("#txtItemDescription"))) {
        $("#txtItemQuantity").focus();
    }
});
$("#txtItemQuantity").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemPrice, $("#txtItemQuantity"))) {
        $("#txtItemUnitPrice").focus();
    }
});
$("#txtItemUnitPrice").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExItemQtyOnHand, $("#txtItemUnitPrice"))) {
        $("#btnAddItem").focus();
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnAddItem").attr('disabled', true);
        $("#btnUpdateItem").attr('disabled', true);
        $("#btnDeleteItem").attr('disabled', true);
    } else {
        $("#btnAddItem").attr('disabled', false);
        $("#btnUpdateItem").attr('disabled', false);
        $("#btnDeleteItem").attr('disabled', false);
    }
}