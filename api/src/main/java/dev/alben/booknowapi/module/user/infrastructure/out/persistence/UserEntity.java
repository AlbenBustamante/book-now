package dev.alben.booknowapi.module.user.infrastructure.out.persistence;

import dev.alben.booknowapi.core.auditable.AuditableEntity;
import dev.alben.booknowapi.module.user.util.Role;
import dev.alben.booknowapi.module.user.util.RoleConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;

import java.time.Instant;

import static dev.alben.booknowapi.module.user.util.UserConstants.DNI_LENGTH;
import static dev.alben.booknowapi.module.user.util.UserConstants.EMAIL_LENGTH;
import static dev.alben.booknowapi.module.user.util.UserConstants.LAST_NAME_LENGTH;
import static dev.alben.booknowapi.module.user.util.UserConstants.NAME_LENGTH;
import static dev.alben.booknowapi.module.user.util.UserConstants.PASSWORD_LENGTH;
import static dev.alben.booknowapi.module.user.util.UserConstants.PHOTO_URL_LENGTH;

/**
 * Entity model for users.
 */
@Setter
@Getter
@Entity
@Table(name = "users")
@SQLDelete(sql = "UPDATE users SET deleted_at = NOW() WHERE id = ?")
public class UserEntity extends AuditableEntity {
    /**
     * Auto Generated ID.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * First Name.
     */
    @Column(nullable = false, length = NAME_LENGTH)
    private String name;

    /**
     * Last Name.
     */
    @Column(nullable = false, length = LAST_NAME_LENGTH)
    private String lastName;

    /**
     * Official DNI.
     */
    @Column(nullable = false, length = DNI_LENGTH)
    private String dni;

    /**
     * URL for Profile Pic.
     */
    @Column(nullable = false, length = PHOTO_URL_LENGTH)
    private String photoUrl;

    /**
     * Email.
     */
    @Column(nullable = false, length = EMAIL_LENGTH)
    private String email;

    /**
     * Hashed Password.
     */
    @Column(nullable = false, length = PASSWORD_LENGTH)
    private String password;

    /**
     * System Role.
     */
    @Column(nullable = false, columnDefinition = "CHAR(1)")
    @Convert(converter = RoleConverter.class)
    private Role role;

    /**
     * Email verification timestamp.
     */
    private Instant accountVerifiedAt;

    /**
     * Account activated/deactivated.
     */
    @Column(nullable = false)
    private Boolean enabled;
}
