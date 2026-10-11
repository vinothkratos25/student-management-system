package com.example.studentmanagement.dto;

import com.example.studentmanagement.entity.Student;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class StudentResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String course;
    private LocalDate dateOfBirth;
    private LocalDateTime createdAt;

    public StudentResponse() {
    }

    // Converts an Entity into a Response object
    public static StudentResponse fromEntity(Student s) {
        StudentResponse r = new StudentResponse();
        r.id = s.getId();
        r.firstName = s.getFirstName();
        r.lastName = s.getLastName();
        r.email = s.getEmail();
        r.phone = s.getPhone();
        r.course = s.getCourse();
        r.dateOfBirth = s.getDateOfBirth();
        r.createdAt = s.getCreatedAt();
        return r;
    }

    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getCourse() { return course; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}