package com.batz.composite.repository;

import com.batz.composite.domain.WeightingFactor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the WeightingFactor entity.
 */
@Repository
public interface WeightingFactorRepository extends JpaRepository<WeightingFactor, Long> {

    @Query(value = "select distinct weightingFactor from WeightingFactor weightingFactor left join fetch weightingFactor.properties",
        countQuery = "select count(distinct weightingFactor) from WeightingFactor weightingFactor")
    Page<WeightingFactor> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct weightingFactor from WeightingFactor weightingFactor left join fetch weightingFactor.properties")
    List<WeightingFactor> findAllWithEagerRelationships();

    @Query("select weightingFactor from WeightingFactor weightingFactor left join fetch weightingFactor.properties where weightingFactor.id =:id")
    Optional<WeightingFactor> findOneWithEagerRelationships(@Param("id") Long id);

}
