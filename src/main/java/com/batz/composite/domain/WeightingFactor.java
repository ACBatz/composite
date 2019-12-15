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
 * A WeightingFactor.
 */
@Entity
@Table(name = "weighting_factor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WeightingFactor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @DecimalMin(value = "0")
    @DecimalMax(value = "10")
    @Column(name = "value")
    private Double value;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "weighting_factor_property",
               joinColumns = @JoinColumn(name = "weighting_factor_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "property_id", referencedColumnName = "id"))
    private Set<Property> properties = new HashSet<>();

    @ManyToMany(mappedBy = "weightingFactors")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Calculation> calculations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getValue() {
        return value;
    }

    public WeightingFactor value(Double value) {
        this.value = value;
        return this;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public WeightingFactor properties(Set<Property> properties) {
        this.properties = properties;
        return this;
    }

    public WeightingFactor addProperty(Property property) {
        this.properties.add(property);
        property.getWeightingFactors().add(this);
        return this;
    }

    public WeightingFactor removeProperty(Property property) {
        this.properties.remove(property);
        property.getWeightingFactors().remove(this);
        return this;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }

    public Set<Calculation> getCalculations() {
        return calculations;
    }

    public WeightingFactor calculations(Set<Calculation> calculations) {
        this.calculations = calculations;
        return this;
    }

    public WeightingFactor addCalculations(Calculation calculation) {
        this.calculations.add(calculation);
        calculation.getWeightingFactors().add(this);
        return this;
    }

    public WeightingFactor removeCalculations(Calculation calculation) {
        this.calculations.remove(calculation);
        calculation.getWeightingFactors().remove(this);
        return this;
    }

    public void setCalculations(Set<Calculation> calculations) {
        this.calculations = calculations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WeightingFactor)) {
            return false;
        }
        return id != null && id.equals(((WeightingFactor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "WeightingFactor{" +
            "id=" + getId() +
            ", value=" + getValue() +
            "}";
    }
}
