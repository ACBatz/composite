package com.batz.composite.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.batz.composite.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.batz.composite.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.batz.composite.domain.User.class.getName());
            createCache(cm, com.batz.composite.domain.Authority.class.getName());
            createCache(cm, com.batz.composite.domain.User.class.getName() + ".authorities");
            createCache(cm, com.batz.composite.domain.PersistentToken.class.getName());
            createCache(cm, com.batz.composite.domain.User.class.getName() + ".persistentTokens");
            createCache(cm, com.batz.composite.domain.Composite.class.getName());
            createCache(cm, com.batz.composite.domain.Composite.class.getName() + ".limits");
            createCache(cm, com.batz.composite.domain.Property.class.getName());
            createCache(cm, com.batz.composite.domain.Property.class.getName() + ".weightingFactors");
            createCache(cm, com.batz.composite.domain.Property.class.getName() + ".miscellaneousConstraints");
            createCache(cm, com.batz.composite.domain.Noun.class.getName());
            createCache(cm, com.batz.composite.domain.Verb.class.getName());
            createCache(cm, com.batz.composite.domain.Load.class.getName());
            createCache(cm, com.batz.composite.domain.Load.class.getName() + ".calculations");
            createCache(cm, com.batz.composite.domain.EnvironmentalEffect.class.getName());
            createCache(cm, com.batz.composite.domain.EnvironmentalEffect.class.getName() + ".calculations");
            createCache(cm, com.batz.composite.domain.MiscellaneousConstraint.class.getName());
            createCache(cm, com.batz.composite.domain.MiscellaneousConstraint.class.getName() + ".properties");
            createCache(cm, com.batz.composite.domain.MiscellaneousConstraint.class.getName() + ".calculations");
            createCache(cm, com.batz.composite.domain.Limit.class.getName());
            createCache(cm, com.batz.composite.domain.Limit.class.getName() + ".composites");
            createCache(cm, com.batz.composite.domain.Limit.class.getName() + ".unitOfMeasures");
            createCache(cm, com.batz.composite.domain.UnitOfMeasure.class.getName());
            createCache(cm, com.batz.composite.domain.UnitOfMeasure.class.getName() + ".limits");
            createCache(cm, com.batz.composite.domain.Calculation.class.getName());
            createCache(cm, com.batz.composite.domain.Calculation.class.getName() + ".weightingFactors");
            createCache(cm, com.batz.composite.domain.Calculation.class.getName() + ".environmentalEffects");
            createCache(cm, com.batz.composite.domain.Calculation.class.getName() + ".miscConstraints");
            createCache(cm, com.batz.composite.domain.Calculation.class.getName() + ".loads");
            createCache(cm, com.batz.composite.domain.Calculation.class.getName() + ".results");
            createCache(cm, com.batz.composite.domain.CalculationResult.class.getName());
            createCache(cm, com.batz.composite.domain.WeightingFactor.class.getName());
            createCache(cm, com.batz.composite.domain.WeightingFactor.class.getName() + ".properties");
            createCache(cm, com.batz.composite.domain.LoadDirection.class.getName());
            createCache(cm, com.batz.composite.domain.LoadDirection.class.getName() + ".loads");
            createCache(cm, com.batz.composite.domain.LoadShear.class.getName());
            createCache(cm, com.batz.composite.domain.LoadShear.class.getName() + ".loads");
            createCache(cm, com.batz.composite.domain.Property.class.getName() + ".unitOfMeasures");
            createCache(cm, com.batz.composite.domain.UnitOfMeasure.class.getName() + ".properties");
            createCache(cm, com.batz.composite.domain.WeightingFactor.class.getName() + ".calculations");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
