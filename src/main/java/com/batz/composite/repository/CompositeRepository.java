package com.batz.composite.repository;

import com.batz.composite.domain.Composite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Composite entity.
 */
@Repository
public interface CompositeRepository extends JpaRepository<Composite, Long> {

    @Query(value = "select distinct composite from Composite composite left join fetch composite.limits",
        countQuery = "select count(distinct composite) from Composite composite")
    Page<Composite> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct composite from Composite composite left join fetch composite.limits")
    List<Composite> findAllWithEagerRelationships();

    @Query("select composite from Composite composite left join fetch composite.limits where composite.id =:id")
    Optional<Composite> findOneWithEagerRelationships(@Param("id") Long id);

}
