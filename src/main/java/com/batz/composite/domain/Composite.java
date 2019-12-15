package com.batz.composite.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Composite.
 */
@Entity
@Table(name = "composite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Composite implements Serializable {

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
    @JoinTable(name = "composite_limits",
               joinColumns = @JoinColumn(name = "composite_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "limits_id", referencedColumnName = "id"))
    private Set<Limit> limits = new HashSet<>();

    @OneToOne(mappedBy = "composite")
    @JsonIgnore
    private CalculationResult result;

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

    public Composite name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Limit> getLimits() {
        return limits;
    }

    public Composite limits(Set<Limit> limits) {
        this.limits = limits;
        return this;
    }

    public Composite addLimits(Limit limit) {
        this.limits.add(limit);
        limit.getComposites().add(this);
        return this;
    }

    public Composite removeLimits(Limit limit) {
        this.limits.remove(limit);
        limit.getComposites().remove(this);
        return this;
    }

    public void setLimits(Set<Limit> limits) {
        this.limits = limits;
    }

    public CalculationResult getResult() {
        return result;
    }

    public Composite result(CalculationResult calculationResult) {
        this.result = calculationResult;
        return this;
    }

    public void setResult(CalculationResult calculationResult) {
        this.result = calculationResult;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Composite)) {
            return false;
        }
        return id != null && id.equals(((Composite) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Composite{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
