package com.swlabs.omnipos.service.impl;

import com.swlabs.omnipos.entity.Zone;
import com.swlabs.omnipos.entity._Table;
import com.swlabs.omnipos.repository.ZoneRepository;
import com.swlabs.omnipos.repository._TableRepository;
import com.swlabs.omnipos.service._TableService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class _TableServiceImpl implements _TableService {

    private final _TableRepository tableRepository;
    private final ZoneRepository zoneRepository;

    public _TableServiceImpl(_TableRepository tableRepository, ZoneRepository zoneRepository) {
        this.tableRepository = tableRepository;
        this.zoneRepository = zoneRepository;
    }

    @Override
    public List<_Table> findAll() {
        List<_Table> tableList = tableRepository.findAll();
        List<Zone> zoneList = zoneRepository.findAll();

        tableList.forEach(table -> {
            Zone zone = zoneList.stream()
                    .filter(z -> z.getId().equals(table.getZoneId()))
                    .findFirst().orElse(null);
            table.setZoneName(zone.getName());
        });

        return tableList;
    }

    @Override
    public _Table findById(Long id) {
        return tableRepository.findById(id).orElse(null);
    }

    @Override
    public _Table save(_Table entity) {
        return tableRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        tableRepository.deleteById(id);
    }
}
