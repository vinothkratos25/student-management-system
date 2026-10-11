package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.StudentRequest;
import com.example.studentmanagement.dto.StudentResponse;
import com.example.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController: every method returns JSON automatically
// @RequestMapping: base URL for all methods in this class
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // GET /api/students  or  GET /api/students?search=john
    @GetMapping
    public List<StudentResponse> getAll(@RequestParam(required = false) String search) {
        return service.getAll(search);
    }

    // GET /api/students/5
    @GetMapping("/{id}")
    public StudentResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // POST /api/students  (body = JSON). @Valid runs the validation rules.
    @PostMapping
    public ResponseEntity<StudentResponse> create(@Valid @RequestBody StudentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    // PUT /api/students/5
    @PutMapping("/{id}")
    public StudentResponse update(@PathVariable Long id, @Valid @RequestBody StudentRequest request) {
        return service.update(id, request);
    }

    // DELETE /api/students/5  ->  204 No Content
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}