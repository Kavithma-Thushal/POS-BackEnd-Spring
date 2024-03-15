/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/

let baseUrl = "http://localhost:8080/spring_pos/";

/**
 * Load All Orders
 **/
$.ajax({
    url: baseUrl + "orders/LoadOrders",
    method: "GET",
    dataType: "json",
    success: function (resp) {
        $("#tblOrder").empty();

        for (let i of resp.data) {
            let oid = i.oid;
            let date = i.date;
            let cusID = i.cusID;

            let row = "<tr><td>" + oid + "</td><td>" + date + "</td><td>" + cusID + "</td></tr>";
            $("#tblOrder").append(row);
        }
    },
    error: function (error) {
        console.log("Load All Orders Error : " + JSON.parse(error.responseText).message);
    }
});

/**
 * Load All OrderDetails
 **/
$.ajax({
    url: baseUrl + "orders/LoadOrderDetails",
    method: "GET",
    dataType: "json",
    success: function (resp) {
        $("#tblOrderDetails").empty();

        for (let i of resp.data) {
            let oid = i.oid;
            let itemCode = i.itemCode;
            let qty = i.qty;
            let unitPrice = i.unitPrice;

            let row = "<tr><td>" + oid + "</td><td>" + itemCode + "</td><td>" + qty + "</td><td>" + unitPrice + "</td></tr>";
            $("#tblOrderDetails").append(row);
        }
    },
    error: function (error) {
        console.log("Load All OrdersDetails Error : " + JSON.parse(error.responseText).message);
    }
});