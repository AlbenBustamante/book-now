package dev.alben.booknowapi.core.auditable;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

/**
 * Abstract Entity Model to audit child entities.
 */
@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@SQLRestriction("deleted_date IS NULL")
public abstract class AuditableEntity {
    /**
     * Created By {@code ID}.
     */
    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    /**
     * Creation Date.
     */
    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    /**
     * Updated By {@code ID}.
     */
    @LastModifiedBy
    private String updatedBy;

    /**
     * Last Update Date.
     */
    @LastModifiedDate
    private Instant updatedAt;

    /**
     * Soft-Deletion Date.
     */
    private Instant deletedAt;
}
