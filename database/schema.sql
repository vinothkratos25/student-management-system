-- Student Management System: database setup
-- Run once as the MySQL root user.
-- IMPORTANT: change the password below before running. Never commit a real password.

CREATE DATABASE IF NOT EXISTS student_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Dedicated user so the app never uses root
CREATE USER IF NOT EXISTS 'student_user'@'localhost'
    IDENTIFIED BY 'ChangeMe_123!';

-- Full rights only on student_db
GRANT ALL PRIVILEGES ON student_db.* TO 'student_user'@'localhost';

FLUSH PRIVILEGES;

-- The "students" table is created automatically by Hibernate
-- when the Spring Boot backend starts (ddl-auto=update).
