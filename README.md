Employee Leave Management System
Overview
Employee Leave Management System is a full-stack web application designed to streamline employee leave requests and approval workflows within an organization. The system provides separate Admin and Employee portals with secure role-based access control, allowing employees to apply for leave and administrators to manage employees, monitor leave statistics, and approve or reject leave requests.

Features
Authentication & Authorization
* JWT-based Authentication
* Role-Based Access Control (Admin & Employee)
* Protected Frontend Routes
* Secure REST APIs
Admin Features
* Dashboard with Leave Analytics
* Employee Management (Add, View, Delete Employees)
* View All Leave Requests
* Approve Leave Requests
* Reject Leave Requests
* Track Leave Statistics
Employee Features
* Secure Login
* Apply for Leave
* View Personal Leave History
* Track Leave Status (Pending, Approved, Rejected)
Dashboard Analytics
* Total Employees
* Total Leave Requests
* Approved Leaves
* Pending Leaves
* Rejected Leaves

System Architecture
Frontend:
* React.js
* JavaScript
* HTML
* CSS
* Axios
Backend:
* Java
* Spring Boot
* Spring Security
* JWT Authentication
* REST APIs
Database:
* MySQL
* JPA/Hibernate

Tech Stack
Java, Spring Boot, Spring Security, JWT, React.js, JavaScript, MySQL, JPA/Hibernate, REST APIs, HTML, CSS, Git

Project Structure
employee-leave-management-system
│
├── leave-management-backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── security
│   └── dto
│
└── leave-management-frontend
    ├── pages
    ├── components
    ├── services
    └── assets

Workflow
Admin Workflow
1. Login as Admin
2. Manage Employees
3. View Dashboard Statistics
4. View Leave Requests
5. Approve or Reject Leave Applications
Employee Workflow
1. Login as Employee
2. Apply for Leave
3. View Personal Leave History
4. Track Leave Status

API Endpoints
Authentication
POST /auth/login
Employees
GET    /employees
POST   /employees
PUT    /employees/{id}
DELETE /employees/{id}
Leaves
GET    /leaves
GET    /leaves/my
POST   /leaves
PUT    /leaves/{id}/approve
PUT    /leaves/{id}/reject
Dashboard
GET /dashboard/stats

Future Enhancements
* BCrypt Password Encryption
* Forgot Password via OTP
* Email Notifications
* Employee Profile Management
* Leave Balance Tracking
* File Upload for Medical Certificates
* Dashboard Charts & Reports

Author
Balajee H
B.Tech Computer Science & Engineering (AI & ML)
Periyar Maniammai Institute of Science & Technology
GitHub: https://github.com/BalajeeHarikrishnan

