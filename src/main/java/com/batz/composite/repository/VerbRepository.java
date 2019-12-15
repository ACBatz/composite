package com.batz.composite.repository;

import com.batz.composite.domain.Verb;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Verb entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VerbRepository extends JpaRepository<Verb, Long> {

}
