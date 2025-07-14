package dev.alben.booknowapi.module.user.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;

@Converter
public class RoleConverter implements AttributeConverter<Role, Character> {
    @Override
    public Character convertToDatabaseColumn(Role attribute) {
        return attribute.role();
    }

    @Override
    public Role convertToEntityAttribute(Character dbData) {
        return Arrays.stream(Role.values())
                .filter(role -> role.role().equals(dbData))
                .findFirst()
                .orElseThrow();
    }
}
