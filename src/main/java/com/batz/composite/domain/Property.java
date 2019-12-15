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
 * A Property.
 */
@Entity
@Table(name = "property")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Property implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToOne(mappedBy = "property")
    @JsonIgnore
    private Limit limit;

    @ManyToMany(mappedBy = "properties")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<WeightingFactor> weightingFactors = new HashSet<>();

    @ManyToMany(mappedBy = "properties")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<MiscellaneousConstraint> miscellaneousConstraints = new HashSet<>();

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

    public Property name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Limit getLimit() {
        return limit;
    }

    public Property limit(Limit limit) {
        this.limit = limit;
        return this;
    }

    public void setLimit(Limit limit) {
        this.limit = limit;
    }

    public Set<WeightingFactor> getWeightingFactors() {
        return weightingFactors;
    }

    public Property weightingFactors(Set<WeightingFactor> weightingFactors) {
        this.weightingFactors = weightingFactors;
        return this;
    }

    public Property addWeightingFactors(WeightingFactor weightingFactor) {
        this.weightingFactors.add(weightingFactor);
        weightingFactor.getProperties().add(this);
        return this;
    }

    public Property removeWeightingFactors(WeightingFactor weightingFactor) {
        this.weightingFactors.remove(weightingFactor);
        weightingFactor.getProperties().remove(this);
        return this;
    }

    public void setWeightingFactors(Set<WeightingFactor> weightingFactors) {
        this.weightingFactors = weightingFactors;
    }

    public Set<MiscellaneousConstraint> getMiscellaneousConstraints() {
        return miscellaneousConstraints;
    }

    public Property miscellaneousConstraints(Set<MiscellaneousConstraint> miscellaneousConstraints) {
        this.miscellaneousConstraints = miscellaneousConstraints;
        return this;
    }

    public Property addMiscellaneousConstraints(MiscellaneousConstraint miscellaneousConstraint) {
        this.miscellaneousConstraints.add(miscellaneousConstraint);
        miscellaneousConstraint.getProperties().add(this);
        return this;
    }

    public Property removeMiscellaneousConstraints(MiscellaneousConstraint miscellaneousConstraint) {
        this.miscellaneousConstraints.remove(miscellaneousConstraint);
        miscellaneousConstraint.getProperties().remove(this);
        return this;
    }

    public void setMiscellaneousConstraints(Set<MiscellaneousConstraint> miscellaneousConstraints) {
        this.miscellaneousConstraints = miscellaneousConstraints;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Property)) {
            return false;
        }
        return id != null && id.equals(((Property) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Property{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
