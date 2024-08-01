package com.swlabs.omnipos.repository;

import com.swlabs.omnipos.entity.Zone;
import com.swlabs.omnipos.entity._Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface _TableRepository extends JpaRepository<_Table, Long> {
}
