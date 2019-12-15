package com.batz.composite.repository;

import com.batz.composite.domain.Load;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Load entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoadRepository extends JpaRepository<Load, Long> {

}
