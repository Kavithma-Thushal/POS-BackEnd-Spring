package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItemDTO {
    String code;
    String description;
    int qty;
    double unitPrice;
}