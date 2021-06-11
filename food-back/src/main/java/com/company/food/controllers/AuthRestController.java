package com.company.food.controllers;

import com.company.food.models.Users;
import com.company.food.jwt.JwtTokenGenerator;
import com.company.food.reqres.JwtRequest;
import com.company.food.reqres.JwtResponse;
import com.company.food.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthRestController {
    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(value = "/auth")
    public ResponseEntity<?> auth(@RequestBody JwtRequest request) throws Exception{
        System.out.println("email:" + request.toString());
        authenticate(request.getEmail(), request.getPassword());
        final UserDetails userDetails =
                userService.loadUserByUsername(request.getEmail());
        final String token = jwtTokenGenerator.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    public void authenticate(String email, String password) throws Exception{
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        }catch (DisabledException e){
            throw new Exception("USER_DISABLED", e);
        }catch (BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @RequestMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        Users u = userService.getUserByTelephone(user.getTelephone());
        System.out.println(u);
        if (u!=null) {
            return (ResponseEntity<?>) ResponseEntity.status(409);
        }
        else {
            return ResponseEntity.ok(userService.addUser(user));
        }
    }
}
