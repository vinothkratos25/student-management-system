package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.StudentRequest;
import com.example.studentmanagement.dto.StudentResponse;
import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.exception.DuplicateResourceException;
import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    // Constructor injection: Spring passes in the repository automatically
    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<StudentResponse> getAll(String search) {
        List<Student> students = (search == null || search.isBlank())
                ? repository.findAll()
                : repository.search(search.trim());
        return students.stream().map(StudentResponse::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    public StudentResponse getById(Long id) {
        return StudentResponse.fromEntity(findOrThrow(id));
    }

    @Transactional
    public StudentResponse create(StudentRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("A student with this email already exists");
        }
        Student student = new Student();
        copyFields(request, student);
        return StudentResponse.fromEntity(repository.save(student));
    }

    @Transactional
    public StudentResponse update(Long id, StudentRequest request) {
        Student student = findOrThrow(id);
        if (repository.existsByEmailAndIdNot(request.getEmail(), id)) {
            throw new DuplicateResourceException("Another student already uses this email");
        }
        copyFields(request, student);
        return StudentResponse.fromEntity(repository.save(student));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(findOrThrow(id));
    }

    private Student findOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + id));
    }

    private void copyFields(StudentRequest request, Student student) {
        student.setFirstName(request.getFirstName().trim());
        student.setLastName(request.getLastName().trim());
        student.setEmail(request.getEmail().trim().toLowerCase());
        student.setPhone(request.getPhone());
        student.setCourse(request.getCourse().trim());
        student.setDateOfBirth(request.getDateOfBirth());
    }
}