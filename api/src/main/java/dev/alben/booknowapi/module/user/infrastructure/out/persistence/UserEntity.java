package dev.alben.booknowapi.module.user.infrastructure.out.persistence;

import dev.alben.booknowapi.core.auditable.AuditableEntity;
import dev.alben.booknowapi.module.user.util.Role;
import jakarta.persistence.Column;
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

/**
 * Entity model for users.
 */
@Setter
@Getter
@Entity
@Table(name = "users")
@SQLDelete(sql = "UPDATE users SET deleted_at = NOW() WHERE id = ?")
public class UserEntity extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = NAME_LENGTH)
    private String name;

    @Column(nullable = false, length = LAST_NAME_LENGTH)
    private String lastName;

    @Column(nullable = false, length = DNI_LENGTH)
    private String dni;

    @Column(nullable = false, length = EMAIL_LENGTH)
    private String email;

    @Column(nullable = false, length = PASSWORD_LENGTH)
    private String password;

    @Column(nullable = false, columnDefinition = "CHAR(1)")
    private Role role;

    private Instant accountVerifiedAt;

    @Column(nullable = false)
    private Boolean enabled;
}
