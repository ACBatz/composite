package com.batz.composite.repository;

import com.batz.composite.domain.Noun;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Noun entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NounRepository extends JpaRepository<Noun, Long> {

}
