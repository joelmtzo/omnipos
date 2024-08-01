package com.swlabs.omnipos.service.impl;

import com.swlabs.omnipos.entity.Zone;
import com.swlabs.omnipos.repository.ZoneRepository;
import com.swlabs.omnipos.service.ZoneService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZoneServiceImpl implements ZoneService {

    private final ZoneRepository zoneRepository;

    public ZoneServiceImpl(ZoneRepository zoneRepository) {
        this.zoneRepository = zoneRepository;
    }

    @Override
    public List<Zone> findAll() {
        return zoneRepository.findAll();
    }

    @Override
    public Zone findById(Long id) {
        return zoneRepository.findById(id).orElse(null);
    }

    @Override
    public Zone save(Zone entity) {
        return zoneRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        zoneRepository.deleteById(id);
    }
}
