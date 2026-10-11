# Student Management System

A full stack CRUD web application for managing student records.

- **Frontend:** React (Vite), JavaScript, Axios, React Router
- **Backend:** Java 17, Spring Boot 3.3, Spring Data JPA, Hibernate
- **Database:** MySQL 8
- **Build tool:** Maven

## Features

- Create, view, update, delete and search students
- Form validation (React and Spring Boot)
- Loading spinners, success and error messages
- Delete confirmation dialog
- Responsive layout

## Architecture

```
React (5173)  --HTTP/JSON-->  Spring Boot (8080)  --JPA/SQL-->  MySQL (3306)
              <--JSON--       Controller > Service > Repository
```

## Project structure

```
student-management-system/
├── README.md
├── .gitignore
├── database/
│   ├── schema.sql
│   └── sample-data.sql
├── backend/        (Spring Boot + Maven)
│   ├── pom.xml
│   └── src/main/java/com/example/studentmanagement/
│       ├── StudentManagementApplication.java
│       ├── config/CorsConfig.java
│       ├── controller/StudentController.java
│       ├── service/StudentService.java
│       ├── repository/StudentRepository.java
│       ├── entity/Student.java
│       ├── dto/StudentRequest.java, StudentResponse.java
│       └── exception/ (handlers and error classes)
└── frontend/       (React + Vite)
    ├── .env
    ├── vite.config.js
    └── src/ (api, components, pages, utils, styles)
```

## Prerequisites

| Software | Version |
|---|---|
| Java JDK | 17 |
| Maven | 3.9.x |
| Node.js | 20 LTS |
| MySQL | 8.0 or newer |

Verify:

```powershell
java -version
mvn -version
node -v
npm -v
mysql --version
```

`mvn -version` must report Java 17. If it shows another version, set `JAVA_HOME` to your JDK 17 folder.

## 1. Database setup

1. Open `database/schema.sql` and change the password `ChangeMe_123!` to your own.
2. Run it (use your own path):

```powershell
mysql -u root -p -e "source D:/projects/student-management-system/database/schema.sql"
```

3. Verify:

```powershell
mysql -u student_user -p -e "SHOW DATABASES;"
```

The `students` table is created automatically by Hibernate when the backend starts.

## 2. Run the backend

Terminal 1:

```powershell
cd D:\projects\student-management-system\backend
$env:DB_PASSWORD="your_student_user_password"
mvn spring-boot:run
```

The password is read from the `DB_PASSWORD` environment variable and is never stored in the code. Set it again in every new terminal.

Success looks like: `HikariPool-1 - Start completed` and `Started StudentManagementApplication`.

Check: http://localhost:8080/api/students should show `[]`.

## 3. Run the frontend

Terminal 2:

```powershell
cd D:\projects\student-management-system\frontend
npm install
npm run dev
```

Open http://localhost:5173.

The API address is set in `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Restart `npm run dev` after changing `.env`.

## 4. Optional: sample data

After the backend has started once (so the table exists):

```powershell
mysql -u student_user -p student_db < database/sample-data.sql
```

In PowerShell, if `<` is not allowed, use:

```powershell
mysql -u student_user -p -e "source D:/projects/student-management-system/database/sample-data.sql" student_db
```

## API endpoints

Base URL: `http://localhost:8080/api`

| Method | URL | Purpose | Success |
|---|---|---|---|
| GET | `/students` | List all students | 200 |
| GET | `/students?search=text` | Search by name, email or course | 200 |
| GET | `/students/{id}` | Get one student | 200 |
| POST | `/students` | Create a student | 201 |
| PUT | `/students/{id}` | Update a student | 200 |
| DELETE | `/students/{id}` | Delete a student | 204 |

Error codes: `400` invalid input, `404` not found, `409` duplicate email, `500` server error.

Sample request body (POST and PUT):

```json
{
  "firstName": "Arun",
  "lastName": "Kumar",
  "email": "arun@example.com",
  "phone": "9876543210",
  "course": "Computer Science",
  "dateOfBirth": "2003-05-14"
}
```

## Testing with Postman

1. Create a collection named `Student API`.
2. For POST and PUT: Body > raw > JSON.
3. Test each endpoint above and check the status codes.
4. Error tests: send `{}` (400), a duplicate email (409), `GET /students/999` (404).
5. Verify in MySQL:

```powershell
mysql -u student_user -p -e "USE student_db; SELECT id, first_name, email, course FROM students;"
```

## Troubleshooting

| Problem | Fix |
|---|---|
| `mvn` or `mysql` not recognized | Add the `bin` folder to PATH, then reopen the terminal |
| `release version 17 not supported` | Maven is using an older Java. Set `JAVA_HOME` to JDK 17 |
| `JAVA_HOME is not defined correctly` | Point `JAVA_HOME` to the JDK folder (no `\bin`, no quotes) |
| `Access denied for user 'student_user'` | Wrong password. Run `ALTER USER 'student_user'@'localhost' IDENTIFIED BY 'newpass';` as root and update `DB_PASSWORD` |
| `Unknown database 'student_db'` | Run `database/schema.sql` |
| `Communications link failure` | Start MySQL: `net start MySQL80` (Administrator PowerShell) |
| `Could not resolve placeholder 'DB_PASSWORD'` | Set `$env:DB_PASSWORD` in the same terminal |
| `Port 8080 was already in use` | `netstat -ano \| findstr :8080`, then `taskkill /PID <pid> /F` |
| `Port 5173 is already in use` | Another Vite server is running. Close it or kill the node process |
| CORS error in browser console | Open the app at exactly `http://localhost:5173` and check `CorsConfig.java` |
| Axios `Network Error` | Backend not running, or wrong `VITE_API_BASE_URL` |
| `Failed to resolve import` | A file is missing or misspelled (case matters) |
| `students` table not created | Check the DB connection in the startup log and `spring.jpa.hibernate.ddl-auto=update` |
| Package/class errors in Java | Folder names and `package` lines must match (`com.example.studentmanagement`) |

## Security notes

- Database credentials come from environment variables, never from the code.
- Do not commit passwords, `.env.local` files or logs.
- `spring.jpa.hibernate.ddl-auto=update` is for development. Use migrations in production.

## Author

Your Name
