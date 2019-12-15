package com.batz.composite.repository;

import com.batz.composite.domain.Calculation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Calculation entity.
 */
@Repository
public interface CalculationRepository extends JpaRepository<Calculation, Long> {

    @Query(value = "select distinct calculation from Calculation calculation left join fetch calculation.environmentalEffects left join fetch calculation.miscConstraints left join fetch calculation.loads",
        countQuery = "select count(distinct calculation) from Calculation calculation")
    Page<Calculation> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct calculation from Calculation calculation left join fetch calculation.environmentalEffects left join fetch calculation.miscConstraints left join fetch calculation.loads")
    List<Calculation> findAllWithEagerRelationships();

    @Query("select calculation from Calculation calculation left join fetch calculation.environmentalEffects left join fetch calculation.miscConstraints left join fetch calculation.loads where calculation.id =:id")
    Optional<Calculation> findOneWithEagerRelationships(@Param("id") Long id);

}
