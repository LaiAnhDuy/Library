package com.librarybackend.utils;

import com.librarybackend.entity.UserEntity;
import com.librarybackend.security.LibraryUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserUtils {

    public static UserEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LibraryUserDetails userDetails = (LibraryUserDetails) authentication.getPrincipal();
        return userDetails.getUserEntity();
    }
}
