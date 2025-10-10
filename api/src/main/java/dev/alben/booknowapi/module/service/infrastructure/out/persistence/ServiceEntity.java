package dev.alben.booknowapi.module.service.infrastructure.out.persistence;

import dev.alben.booknowapi.core.auditable.AuditableEntity;
import dev.alben.booknowapi.module.address.infrastructure.out.persistence.AddressEntity;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;

import java.math.BigDecimal;

import static dev.alben.booknowapi.module.service.util.ServiceConstants.DESCRIPTION_LENGTH;
import static dev.alben.booknowapi.module.service.util.ServiceConstants.NAME_LENGTH;

/**
 * Entity model for Services.
 */
@Setter
@Getter
@Entity
@Table(name = "services")
@SQLDelete(sql = "UPDATE services SET delete_at = NOW() WHERE id = ?")
public class ServiceEntity extends AuditableEntity {
    /**
     * Auto generated ID.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Service's name.
     */
    @Column(nullable = false, length = NAME_LENGTH)
    private String name;

    /**
     * Detailed description.
     */
    @Column(nullable = false, length = DESCRIPTION_LENGTH)
    private String description;

    /**
     * Duration in minutes.
     */
    @Column(nullable = false)
    private Integer durationInMinutes;

    /**
     * Price.
     */
    @Column(nullable = false)
    private BigDecimal price;

    /**
     * Full address.
     */
    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private AddressEntity address;

    /**
     * User as service's provider.
     */
    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private UserEntity provider;
}
