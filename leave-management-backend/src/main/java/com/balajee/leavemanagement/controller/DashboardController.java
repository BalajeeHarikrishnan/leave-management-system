package com.balajee.leavemanagement.controller;

import com.balajee.leavemanagement.repository.EmployeeRepository;
import com.balajee.leavemanagement.repository.LeaveRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final EmployeeRepository employeeRepository;
    private final LeaveRepository leaveRepository;

    public DashboardController(EmployeeRepository employeeRepository,
                               LeaveRepository leaveRepository) {
        this.employeeRepository = employeeRepository;
        this.leaveRepository = leaveRepository;
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("employees", employeeRepository.count());

        stats.put("leaves", leaveRepository.count());

        stats.put(
                "approved",
                leaveRepository.findAll()
                        .stream()
                        .filter(l -> "APPROVED".equals(l.getStatus()))
                        .count()
        );

        stats.put(
                "pending",
                leaveRepository.findAll()
                        .stream()
                        .filter(l -> "PENDING".equals(l.getStatus()))
                        .count()
        );

        stats.put(
                "rejected",
                leaveRepository.findAll()
                        .stream()
                        .filter(l -> "REJECTED".equals(l.getStatus()))
                        .count()
        );

        return stats;
    }
}