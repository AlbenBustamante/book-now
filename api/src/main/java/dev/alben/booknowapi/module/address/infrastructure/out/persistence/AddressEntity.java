package dev.alben.booknowapi.module.address.infrastructure.out.persistence;

import dev.alben.booknowapi.core.auditable.AuditableEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;

import java.util.UUID;

import static dev.alben.booknowapi.module.address.util.AddressConstants.*;

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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

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
    @Column(nullable = false, length = STREET_LENGTH)
    private String street;

    /**
     * Zip code (optional).
     */
    @Column(length = ZIP_CODE_LENGTH)
    private String zipCode;
}
