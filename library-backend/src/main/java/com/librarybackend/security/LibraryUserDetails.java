package com.librarybackend.security;

import com.librarybackend.entity.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;

public class LibraryUserDetails implements UserDetails {

    private UserEntity userEntity;

    public LibraryUserDetails() {

    }

    public LibraryUserDetails(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    @Override
    @Transactional
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        RoleEntity roleEntities = userEntity.getRole();
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("user"));
        return authorities;
    }

    @Override
    public String getPassword() {
        return userEntity.getPassword();
    }

    @Override
    public String getUsername() {
        return userEntity.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !userEntity.getDeleted();
    }

    public UserEntity getUserEntity() {
        return this.userEntity;
    }
}
