package com.swlabs.omnipos.controller;

import com.swlabs.omnipos.entity.Zone;
import com.swlabs.omnipos.service.ZoneService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/zones")
public class ZoneController {

    private final ZoneService zoneService;

    public ZoneController(ZoneService zoneService) {
        this.zoneService = zoneService;
    }

    @GetMapping("")
    public ResponseEntity<List<Zone>> getItems() {
        return new ResponseEntity<>(zoneService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Zone> getItemById(@PathVariable Long id) {
        return new ResponseEntity<>(zoneService.findById(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Zone> createItem(@RequestBody Zone zone) {
        return new ResponseEntity<>(zoneService.save(zone), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        zoneService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
