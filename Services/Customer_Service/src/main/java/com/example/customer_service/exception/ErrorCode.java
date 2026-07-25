package com.example.customer_service.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

public enum ErrorCode {
    EXIST_ACCOUNT(101, "Account already exists", HttpStatus.BAD_REQUEST),
    NOT_FOUND(102, "Account not found", HttpStatus.NOT_FOUND),
    INVALID_REQUEST(103, "Invalid request", HttpStatus.BAD_REQUEST),
    CANNOT_LOAD_DATA(104, "Cannot load data", HttpStatus.BAD_REQUEST),
    CUSTOMER_NOT_FOUND(105, "Cannot find customer by id", HttpStatus.BAD_REQUEST ),;
    private int code;
    private String message;
    private HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }
}
