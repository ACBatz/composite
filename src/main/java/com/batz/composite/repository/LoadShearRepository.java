package com.batz.composite.repository;

import com.batz.composite.domain.LoadShear;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LoadShear entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoadShearRepository extends JpaRepository<LoadShear, Long> {

}
