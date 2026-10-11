-- Optional sample records.
-- Run AFTER the backend has started once (so the students table exists).

USE student_db;

INSERT INTO students (first_name, last_name, email, phone, course, date_of_birth, created_at) VALUES
('Arun',   'Kumar',  'arun@example.com',   '9876543210', 'Computer Science',       '2003-05-14', NOW(6)),
('Priya',  'Sharma', 'priya@example.com',  '9123456780', 'Mechanical Engineering', '2002-11-02', NOW(6)),
('Rahul',  'Verma',  'rahul@example.com',  '9988776655', 'Information Technology', '2003-01-20', NOW(6)),
('Sneha',  'Reddy',  'sneha@example.com',  '9090909090', 'Electronics',            '2002-07-08', NOW(6));
