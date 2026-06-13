package com.balajee.leavemanagement.controller;

import com.balajee.leavemanagement.dto.LoginRequest;
import com.balajee.leavemanagement.dto.LoginResponse;
import com.balajee.leavemanagement.entity.Employee;
import com.balajee.leavemanagement.repository.EmployeeRepository;
import com.balajee.leavemanagement.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Employee employee = employeeRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (employee.getPassword() == null ||
                !employee.getPassword().equals(request.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        String token =
                JwtUtil.generateToken(employee.getEmail());

        return new LoginResponse(
                token,
                employee.getRole()
        );
    }
}