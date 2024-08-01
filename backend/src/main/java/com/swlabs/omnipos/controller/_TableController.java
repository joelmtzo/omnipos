package com.swlabs.omnipos.controller;

import com.swlabs.omnipos.entity._Table;
import com.swlabs.omnipos.service._TableService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tables")
public class _TableController {

    private final _TableService tableService;

    public _TableController(_TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping("")
    public ResponseEntity<List<_Table>> getTables() {
        return new ResponseEntity<>(tableService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<_Table> getTableById(@PathVariable Long id) {
        return new ResponseEntity<>(tableService.findById(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<_Table> createTable(@RequestBody _Table table) {
        return new ResponseEntity<>(tableService.save(table), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTable(@PathVariable Long id) {
        tableService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
