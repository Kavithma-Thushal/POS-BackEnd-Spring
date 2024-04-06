package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomDTO;
import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/
public interface PlaceOrderService {

    @ResponseBody
    CustomDTO OrderIdGenerate();

    void placeOrder(@RequestBody OrdersDTO dto);

    @ResponseBody
    CustomDTO getSumOrders();

    ArrayList<OrdersDTO> LoadOrders();

    ArrayList<OrderDetailsDTO> LoadOrderDetails();
}