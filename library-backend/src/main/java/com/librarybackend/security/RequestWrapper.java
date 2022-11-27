package com.librarybackend.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.HashMap;

public class RequestWrapper extends HttpServletRequestWrapper {

    private HashMap<String, String> params = new HashMap<>();

    public RequestWrapper(HttpServletRequest request) {
        super(request);
    }

    @Override
    public String getParameter(String name) {
        // if we added one, return that one
        if ( params.get(name) != null ) {
            return (String) params.get( name );
        }
        System.out.println("Vào RequestWrapper!");
        // otherwise return what's in the original request
        HttpServletRequest req = (HttpServletRequest) super.getRequest();
        return req.getParameter(name);
    }

    public void addParameter( String name, String value ) {
        params.put( name, value );
    }
}
