package io.aetherit.project.base.service;

import io.aetherit.project.base.exception.BaseException;
import io.aetherit.project.base.exception.ErrorCode;
import io.aetherit.project.base.exception.NotAcceptableIdException;
import io.aetherit.project.base.model.support.BaseUserType;
import io.aetherit.project.base.repository.UserRepository;
import io.aetherit.project.base.model.BaseUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private static final String DEFAULT_ADMIN_ID = "admin";
    private static final String DEFAULT_ADMIN_PASSWORD = "1234";
    private static final String DEFAULT_ADMIN_NAME = "administrator";
    private static final Map<String, Boolean> notAcceptableIdMap = new HashMap<>();
    static {
        notAcceptableIdMap.put("check", false);
        notAcceptableIdMap.put("signin", false);
        notAcceptableIdMap.put("signout", false);
        notAcceptableIdMap.put("signcheck", false);
        notAcceptableIdMap.put("login", false);
        notAcceptableIdMap.put("logout", false);
        notAcceptableIdMap.put("logincheck", false);
    }

    private UserRepository repository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void checkAdmin() {
        final List<BaseUser> users = getUsers(BaseUserType.Admin);

        if((users == null) || (users.size() < 1)) {
            logger.info("Admin account not exists : create a default admin account");

            final BaseUser newAdmin = BaseUser.builder()
                    .id(DEFAULT_ADMIN_ID)
                    .password(DEFAULT_ADMIN_PASSWORD)
                    .name(DEFAULT_ADMIN_NAME)
                    .email("hyun8503@gmail.com")
                    .country("South Korea")
                    .city("seoul")
                    .userLanguage("Korean")
                    .selectedLanguage("English")
                    .type(BaseUserType.Admin)
                    .isEnabled(true)
                    .build();

            createNewUser(newAdmin);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertUser(BaseUser user) {
        userIdDuplicateCheck(user.getId());

        user.setId(UUID.randomUUID().toString());
        user.setCreatedDatetime(LocalDateTime.now());
        user.setUpdatedDatetime(LocalDateTime.now());
//      userRepository.insertUser(user);
    }

    private void userIdDuplicateCheck(String id) {
        long count = repository.selectUserIdCount(id);

        if(count != 0) {
            throw new BaseException(ErrorCode.Unknown, HttpStatus.BAD_REQUEST, "Id must be unique");
        }
    }


    public BaseUser getUser(String id) {
        return repository.selectUser(id);
    }

    public List<BaseUser> getUsers(BaseUserType type) {
        return repository.selectUsers(type);
    }

    public BaseUser createNewUser(BaseUser user) {
        if(isNotAcceptableId(user.getId())) {
            throw new NotAcceptableIdException(user.getId());
        }
        final String encodedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        user.setCreatedDatetime(LocalDateTime.now());
        user.setUpdatedDatetime(LocalDateTime.now());

        repository.insertUser(user);

        return user;
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }
}
