package com.batz.composite.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Limit.
 */
@Entity
@Table(name = "jhi_limit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Limit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "maximum")
    private Boolean maximum;

    @Column(name = "value")
    private Double value;

    @OneToOne
    @JoinColumn(unique = true)
    private Property property;

    @ManyToMany(mappedBy = "limits")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Composite> composites = new HashSet<>();

    @ManyToMany(mappedBy = "limits")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<UnitOfMeasure> unitOfMeasures = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isMaximum() {
        return maximum;
    }

    public Limit maximum(Boolean maximum) {
        this.maximum = maximum;
        return this;
    }

    public void setMaximum(Boolean maximum) {
        this.maximum = maximum;
    }

    public Double getValue() {
        return value;
    }

    public Limit value(Double value) {
        this.value = value;
        return this;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Property getProperty() {
        return property;
    }

    public Limit property(Property property) {
        this.property = property;
        return this;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public Set<Composite> getComposites() {
        return composites;
    }

    public Limit composites(Set<Composite> composites) {
        this.composites = composites;
        return this;
    }

    public Limit addComposites(Composite composite) {
        this.composites.add(composite);
        composite.getLimits().add(this);
        return this;
    }

    public Limit removeComposites(Composite composite) {
        this.composites.remove(composite);
        composite.getLimits().remove(this);
        return this;
    }

    public void setComposites(Set<Composite> composites) {
        this.composites = composites;
    }

    public Set<UnitOfMeasure> getUnitOfMeasures() {
        return unitOfMeasures;
    }

    public Limit unitOfMeasures(Set<UnitOfMeasure> unitOfMeasures) {
        this.unitOfMeasures = unitOfMeasures;
        return this;
    }

    public Limit addUnitOfMeasure(UnitOfMeasure unitOfMeasure) {
        this.unitOfMeasures.add(unitOfMeasure);
        unitOfMeasure.getLimits().add(this);
        return this;
    }

    public Limit removeUnitOfMeasure(UnitOfMeasure unitOfMeasure) {
        this.unitOfMeasures.remove(unitOfMeasure);
        unitOfMeasure.getLimits().remove(this);
        return this;
    }

    public void setUnitOfMeasures(Set<UnitOfMeasure> unitOfMeasures) {
        this.unitOfMeasures = unitOfMeasures;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Limit)) {
            return false;
        }
        return id != null && id.equals(((Limit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Limit{" +
            "id=" + getId() +
            ", maximum='" + isMaximum() + "'" +
            ", value=" + getValue() +
            "}";
    }
}
