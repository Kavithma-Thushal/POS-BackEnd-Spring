package lk.ijse.spring.util;

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
public class ResponseUtil {
    private String state;
    private String message;
    private Object data;
}