package com.alumnihub.AlumniHub.exception;

public class JobPostNotFoundException extends RuntimeException{
    public JobPostNotFoundException(String message) {
        super(message);
    }
}
