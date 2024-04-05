package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.Pattern;

/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItemDTO {
    @Pattern(regexp = "^(I00-)[0-9]{3}$")
    private String code;
    @Pattern(regexp = "^[A-z ]{3,20}$")
    private String description;
    @Pattern(regexp = "^[0-9]{2,10}$")
    private String qty;
    @Pattern(regexp = "^[0-9]{1,}[.]?[0-9]{1}$")
    private String unitPrice;
}