package com.batz.composite.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Noun.
 */
@Entity
@Table(name = "noun")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Noun implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private Calculation calculation;

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

    public Noun name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Calculation getCalculation() {
        return calculation;
    }

    public Noun calculation(Calculation calculation) {
        this.calculation = calculation;
        return this;
    }

    public void setCalculation(Calculation calculation) {
        this.calculation = calculation;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Noun)) {
            return false;
        }
        return id != null && id.equals(((Noun) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Noun{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
