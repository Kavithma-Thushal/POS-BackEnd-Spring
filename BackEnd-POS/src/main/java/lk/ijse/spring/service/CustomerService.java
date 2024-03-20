package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomDTO;
import lk.ijse.spring.dto.CustomerDTO;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/
public interface CustomerService {
    void saveCustomer(@ModelAttribute CustomerDTO dto);

    void updateCustomer(@RequestBody CustomerDTO dto);

    void deleteCustomer(@PathVariable("customerId") String id);

    CustomerDTO searchCusId(String id);

    ArrayList<CustomerDTO> loadAllCustomer();

    @ResponseBody
    CustomDTO customerIdGenerate();

    @ResponseBody
    CustomDTO getSumCustomer();
}