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
 * A Calculation.
 */
@Entity
@Table(name = "calculation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Calculation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Size(max = 100)
    @Column(name = "description", length = 100)
    private String description;

    @OneToMany(mappedBy = "calculation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WeightingFactor> weightingFactors = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "calculation_environmental_effects",
               joinColumns = @JoinColumn(name = "calculation_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "environmental_effects_id", referencedColumnName = "id"))
    private Set<EnvironmentalEffect> environmentalEffects = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "calculation_misc_constraints",
               joinColumns = @JoinColumn(name = "calculation_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "misc_constraints_id", referencedColumnName = "id"))
    private Set<MiscellaneousConstraint> miscConstraints = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "calculation_loads",
               joinColumns = @JoinColumn(name = "calculation_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "loads_id", referencedColumnName = "id"))
    private Set<Load> loads = new HashSet<>();

    @OneToOne(mappedBy = "calculation")
    @JsonIgnore
    private Noun noun;

    @OneToOne(mappedBy = "calculation")
    @JsonIgnore
    private Verb verb;

    @OneToMany(mappedBy = "calculation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CalculationResult> results = new HashSet<>();

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

    public Calculation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Calculation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<WeightingFactor> getWeightingFactors() {
        return weightingFactors;
    }

    public Calculation weightingFactors(Set<WeightingFactor> weightingFactors) {
        this.weightingFactors = weightingFactors;
        return this;
    }

    public Calculation addWeightingFactors(WeightingFactor weightingFactor) {
        this.weightingFactors.add(weightingFactor);
        weightingFactor.setCalculation(this);
        return this;
    }

    public Calculation removeWeightingFactors(WeightingFactor weightingFactor) {
        this.weightingFactors.remove(weightingFactor);
        weightingFactor.setCalculation(null);
        return this;
    }

    public void setWeightingFactors(Set<WeightingFactor> weightingFactors) {
        this.weightingFactors = weightingFactors;
    }

    public Set<EnvironmentalEffect> getEnvironmentalEffects() {
        return environmentalEffects;
    }

    public Calculation environmentalEffects(Set<EnvironmentalEffect> environmentalEffects) {
        this.environmentalEffects = environmentalEffects;
        return this;
    }

    public Calculation addEnvironmentalEffects(EnvironmentalEffect environmentalEffect) {
        this.environmentalEffects.add(environmentalEffect);
        environmentalEffect.getCalculations().add(this);
        return this;
    }

    public Calculation removeEnvironmentalEffects(EnvironmentalEffect environmentalEffect) {
        this.environmentalEffects.remove(environmentalEffect);
        environmentalEffect.getCalculations().remove(this);
        return this;
    }

    public void setEnvironmentalEffects(Set<EnvironmentalEffect> environmentalEffects) {
        this.environmentalEffects = environmentalEffects;
    }

    public Set<MiscellaneousConstraint> getMiscConstraints() {
        return miscConstraints;
    }

    public Calculation miscConstraints(Set<MiscellaneousConstraint> miscellaneousConstraints) {
        this.miscConstraints = miscellaneousConstraints;
        return this;
    }

    public Calculation addMiscConstraints(MiscellaneousConstraint miscellaneousConstraint) {
        this.miscConstraints.add(miscellaneousConstraint);
        miscellaneousConstraint.getCalculations().add(this);
        return this;
    }

    public Calculation removeMiscConstraints(MiscellaneousConstraint miscellaneousConstraint) {
        this.miscConstraints.remove(miscellaneousConstraint);
        miscellaneousConstraint.getCalculations().remove(this);
        return this;
    }

    public void setMiscConstraints(Set<MiscellaneousConstraint> miscellaneousConstraints) {
        this.miscConstraints = miscellaneousConstraints;
    }

    public Set<Load> getLoads() {
        return loads;
    }

    public Calculation loads(Set<Load> loads) {
        this.loads = loads;
        return this;
    }

    public Calculation addLoads(Load load) {
        this.loads.add(load);
        load.getCalculations().add(this);
        return this;
    }

    public Calculation removeLoads(Load load) {
        this.loads.remove(load);
        load.getCalculations().remove(this);
        return this;
    }

    public void setLoads(Set<Load> loads) {
        this.loads = loads;
    }

    public Noun getNoun() {
        return noun;
    }

    public Calculation noun(Noun noun) {
        this.noun = noun;
        return this;
    }

    public void setNoun(Noun noun) {
        this.noun = noun;
    }

    public Verb getVerb() {
        return verb;
    }

    public Calculation verb(Verb verb) {
        this.verb = verb;
        return this;
    }

    public void setVerb(Verb verb) {
        this.verb = verb;
    }

    public Set<CalculationResult> getResults() {
        return results;
    }

    public Calculation results(Set<CalculationResult> calculationResults) {
        this.results = calculationResults;
        return this;
    }

    public Calculation addResults(CalculationResult calculationResult) {
        this.results.add(calculationResult);
        calculationResult.setCalculation(this);
        return this;
    }

    public Calculation removeResults(CalculationResult calculationResult) {
        this.results.remove(calculationResult);
        calculationResult.setCalculation(null);
        return this;
    }

    public void setResults(Set<CalculationResult> calculationResults) {
        this.results = calculationResults;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Calculation)) {
            return false;
        }
        return id != null && id.equals(((Calculation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Calculation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
