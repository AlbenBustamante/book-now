package dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity;

import dev.alben.booknowapi.core.auditable.AuditableEntity;
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

import java.time.ZonedDateTime;

import static dev.alben.booknowapi.module.user.util.EmailVerificationTokenConstants.TOKEN_LENGTH;

@Setter
@Getter
@Entity
@Table(name = "email_verification_tokens")
@SQLDelete(sql = "UPDATE email_verification_tokens SET deleted_at = NOW() WHERE id = ?")
public class EmailVerificationTokenEntity extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, updatable = false)
    private ZonedDateTime expiresAt;

    @Column(nullable = false, length = TOKEN_LENGTH, updatable = false)
    private String token;

    @Column(nullable = false)
    private Boolean verified;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id", updatable = false)
    private UserEntity user;
}
