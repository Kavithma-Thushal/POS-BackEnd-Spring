/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/

let baseUrl = "http://localhost:8080/spring_pos/";

/**
 * Customer Count
 **/
$.ajax({
    url: baseUrl + "customer/CustomerCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        $("#txtCustomerCount").text(resp.count);
    },
    error: function (error) {
        console.log("Customer Count Error : ", error);
    }
});

/**
 * Item Count
 **/
$.ajax({
    url: baseUrl + "item/itemCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        $("#txtItemsCount").text(resp.count);
    },
    error: function (error) {
        console.log("Item Count Error : ", error);
    }
});

/**
 * Orders Count
 **/
$.ajax({
    url: baseUrl + "orders/ordersCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        $("#txtOrderCount").text(resp.count);
    },
    error: function (error) {
        console.log("Orders Count Error : ", error);
    }
});