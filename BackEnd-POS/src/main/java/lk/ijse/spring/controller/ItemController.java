package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/
@RestController
@CrossOrigin
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveItem(@Valid @RequestBody ItemDTO dto) {
        service.saveItem(dto);
        return new ResponseUtil("200 OK", "saved successfully...!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/searchItem/{code}")
    public ItemDTO searchItem(@PathVariable("code") String code) {
        return service.searchItemCode(code);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateItem(@Valid @RequestBody ItemDTO dto) {
        service.updateItem(dto);
        return new ResponseUtil("200 OK", "updated successfully...!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping("/{code}")
    public ResponseUtil deleteItem(@PathVariable("code") String code) {
        service.deleteItem(code);
        return new ResponseUtil("200 OK", "deleted successfully...!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/loadAllItems")
    public ResponseUtil loadAllItem() {
        return new ResponseUtil("200 OK", "loaded successfully...! : ", service.loadAllItem());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/generateItemCode")
    public @ResponseBody CustomDTO ItemIdGenerate() {
        return service.itemIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/itemCount")
    public @ResponseBody CustomDTO getSumItem() {
        return service.getSumItem();
    }
}