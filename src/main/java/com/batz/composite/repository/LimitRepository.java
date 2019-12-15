package com.batz.composite.repository;

import com.batz.composite.domain.Limit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Limit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LimitRepository extends JpaRepository<Limit, Long> {

}
