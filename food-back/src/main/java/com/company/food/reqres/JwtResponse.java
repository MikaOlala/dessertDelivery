package com.company.food.reqres;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 987654321L;
    private final String jwtToken;

    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }
    public String getJwtToken() {
        return this.jwtToken;
    }

}
