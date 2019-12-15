package com.batz.composite.repository;

import com.batz.composite.domain.LoadDirection;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LoadDirection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoadDirectionRepository extends JpaRepository<LoadDirection, Long> {

}
