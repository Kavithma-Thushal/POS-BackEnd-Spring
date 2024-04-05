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
public class CustomerDTO {
    @Pattern(regexp = "^(C00-)[0-9]{3}$")
    private String id;
    @Pattern(regexp = "^[A-z ]{3,20}$")
    private String name;
    @Pattern(regexp = "^[A-Za-z0-9/, -]{4,30}$")
    private String address;
    @Pattern(regexp = "^[0-9]{1,}[.]?[0-9]{2}$")
    private String salary;
}