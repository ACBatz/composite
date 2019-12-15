package com.batz.composite.repository;

import com.batz.composite.domain.UnitOfMeasure;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the UnitOfMeasure entity.
 */
@Repository
public interface UnitOfMeasureRepository extends JpaRepository<UnitOfMeasure, Long> {

    @Query(value = "select distinct unitOfMeasure from UnitOfMeasure unitOfMeasure left join fetch unitOfMeasure.limits",
        countQuery = "select count(distinct unitOfMeasure) from UnitOfMeasure unitOfMeasure")
    Page<UnitOfMeasure> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct unitOfMeasure from UnitOfMeasure unitOfMeasure left join fetch unitOfMeasure.limits")
    List<UnitOfMeasure> findAllWithEagerRelationships();

    @Query("select unitOfMeasure from UnitOfMeasure unitOfMeasure left join fetch unitOfMeasure.limits where unitOfMeasure.id =:id")
    Optional<UnitOfMeasure> findOneWithEagerRelationships(@Param("id") Long id);

}
