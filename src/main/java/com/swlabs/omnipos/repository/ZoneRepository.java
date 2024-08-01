package com.swlabs.omnipos.repository;

import com.swlabs.omnipos.entity.Order;
import com.swlabs.omnipos.entity.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {
}
