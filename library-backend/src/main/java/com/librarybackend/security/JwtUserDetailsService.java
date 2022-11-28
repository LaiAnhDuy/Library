package com.librarybackend.security;

import com.librarybackend.entity.UserEntity;
import com.librarybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByUsername(username);
        if(userEntity != null) {
            LibraryUserDetails userDetails = new LibraryUserDetails(userEntity);
            System.out.println("=========");
            System.out.println(userDetails);
            System.out.println("=========");
            return userDetails;
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

}