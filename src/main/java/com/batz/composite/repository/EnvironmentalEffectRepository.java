package com.batz.composite.repository;

import com.batz.composite.domain.EnvironmentalEffect;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EnvironmentalEffect entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnvironmentalEffectRepository extends JpaRepository<EnvironmentalEffect, Long> {

}
