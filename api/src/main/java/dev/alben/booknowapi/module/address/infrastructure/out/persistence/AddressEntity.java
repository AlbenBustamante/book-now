package dev.alben.booknowapi.module.address.infrastructure.out.persistence;

import dev.alben.booknowapi.core.auditable.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;

import static dev.alben.booknowapi.module.address.util.AddressConstants.CITY_LENGTH;
import static dev.alben.booknowapi.module.address.util.AddressConstants.COUNTRY_LENGTH;
import static dev.alben.booknowapi.module.address.util.AddressConstants.DIRECTION_LENGTH;
import static dev.alben.booknowapi.module.address.util.AddressConstants.STATE_LENGTH;

/**
 * Entity model for Addresses.
 */
@Setter
@Getter
@Entity
@Table(name = "addresses")
@SQLDelete(sql = "UPDATE addresses SET delete_at = NOW() WHERE id = ?")
public class AddressEntity extends AuditableEntity {
    /**
     * Auto generated ID.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Country name.
     */
    @Column(nullable = false, length = COUNTRY_LENGTH)
    private String country;

    /**
     * State name.
     */
    @Column(nullable = false, length = STATE_LENGTH)
    private String state;

    /**
     * City name.
     */
    @Column(nullable = false, length = CITY_LENGTH)
    private String city;

    /**
     * Full detailed address.
     */
    @Column(nullable = false, length = DIRECTION_LENGTH)
    private String direction;
}
