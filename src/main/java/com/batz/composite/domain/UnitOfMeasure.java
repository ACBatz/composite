package com.batz.composite.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A UnitOfMeasure.
 */
@Entity
@Table(name = "unit_of_measure")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UnitOfMeasure implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "unit_of_measure_limits",
               joinColumns = @JoinColumn(name = "unit_of_measure_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "limits_id", referencedColumnName = "id"))
    private Set<Limit> limits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public UnitOfMeasure name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Limit> getLimits() {
        return limits;
    }

    public UnitOfMeasure limits(Set<Limit> limits) {
        this.limits = limits;
        return this;
    }

    public UnitOfMeasure addLimits(Limit limit) {
        this.limits.add(limit);
        limit.getUnitOfMeasures().add(this);
        return this;
    }

    public UnitOfMeasure removeLimits(Limit limit) {
        this.limits.remove(limit);
        limit.getUnitOfMeasures().remove(this);
        return this;
    }

    public void setLimits(Set<Limit> limits) {
        this.limits = limits;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UnitOfMeasure)) {
            return false;
        }
        return id != null && id.equals(((UnitOfMeasure) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UnitOfMeasure{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
