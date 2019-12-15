package com.batz.composite.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Load.
 */
@Entity
@Table(name = "load")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Load implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "is_tensile_or_compressive")
    private Boolean isTensileOrCompressive;

    @Column(name = "is_shear")
    private Boolean isShear;

    @ManyToOne
    @JsonIgnoreProperties("loads")
    private LoadShear loadShear;

    @ManyToOne
    @JsonIgnoreProperties("loads")
    private LoadDirection loadDirection;

    @ManyToMany(mappedBy = "loads")
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

    public String getName() {
        return name;
    }

    public Load name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsTensileOrCompressive() {
        return isTensileOrCompressive;
    }

    public Load isTensileOrCompressive(Boolean isTensileOrCompressive) {
        this.isTensileOrCompressive = isTensileOrCompressive;
        return this;
    }

    public void setIsTensileOrCompressive(Boolean isTensileOrCompressive) {
        this.isTensileOrCompressive = isTensileOrCompressive;
    }

    public Boolean isIsShear() {
        return isShear;
    }

    public Load isShear(Boolean isShear) {
        this.isShear = isShear;
        return this;
    }

    public void setIsShear(Boolean isShear) {
        this.isShear = isShear;
    }

    public LoadShear getLoadShear() {
        return loadShear;
    }

    public Load loadShear(LoadShear loadShear) {
        this.loadShear = loadShear;
        return this;
    }

    public void setLoadShear(LoadShear loadShear) {
        this.loadShear = loadShear;
    }

    public LoadDirection getLoadDirection() {
        return loadDirection;
    }

    public Load loadDirection(LoadDirection loadDirection) {
        this.loadDirection = loadDirection;
        return this;
    }

    public void setLoadDirection(LoadDirection loadDirection) {
        this.loadDirection = loadDirection;
    }

    public Set<Calculation> getCalculations() {
        return calculations;
    }

    public Load calculations(Set<Calculation> calculations) {
        this.calculations = calculations;
        return this;
    }

    public Load addCalculations(Calculation calculation) {
        this.calculations.add(calculation);
        calculation.getLoads().add(this);
        return this;
    }

    public Load removeCalculations(Calculation calculation) {
        this.calculations.remove(calculation);
        calculation.getLoads().remove(this);
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
        if (!(o instanceof Load)) {
            return false;
        }
        return id != null && id.equals(((Load) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Load{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isTensileOrCompressive='" + isIsTensileOrCompressive() + "'" +
            ", isShear='" + isIsShear() + "'" +
            "}";
    }
}
