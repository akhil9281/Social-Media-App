package com.collpoll.feedApplication.Handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object ...responseObj) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status.value());
        map.put("data", responseObj);

        return new ResponseEntity<Object>(map,status);
    }

    public static ResponseEntity<Object> generateResponse(HttpStatus status, Object ...responseObj) {
        return ResponseHandler.generateResponse(null, status, responseObj);
    }

    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status) {
        return ResponseHandler.generateResponse(message, status, null);
    }
}
