package io.aetherit.project.base.model;

import io.aetherit.project.base.model.support.BaseUserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaseUser {
    private String id;
    private String password;
    private String name;
    private String email;
    private String country;
    private String city;
    private String userLanguage;
    private String selectedLanguage;
    private BaseUserType type;
    private boolean isEnabled;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
