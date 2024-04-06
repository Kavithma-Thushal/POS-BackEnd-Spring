package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersDTO {
    private String oid;
    private String date;
    private String cusID;
    private List<OrderDetailsDTO> orderDetails;
}