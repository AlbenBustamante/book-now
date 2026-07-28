package dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity;

import dev.alben.booknowapi.core.auditable.AuditableEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;

import java.time.ZonedDateTime;
import java.util.UUID;

import static dev.alben.booknowapi.module.user.util.EmailVerificationTokenConstants.TOKEN_LENGTH;

@Setter
@Getter
@Entity
@Table(name = "email_verification_tokens")
@SQLDelete(sql = "UPDATE email_verification_tokens SET deleted_at = NOW() WHERE id = ?")
public class EmailVerificationTokenEntity extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, updatable = false)
    private ZonedDateTime expiresAt;

    @Column(nullable = false, length = TOKEN_LENGTH, updatable = false)
    private String token;

    @Column(nullable = false)
    private Boolean verified;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(nullable = false, name = "user_id", updatable = false)
    private UserEntity user;
}
