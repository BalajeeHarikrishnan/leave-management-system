package com.balajee.leavemanagement.controller;

import com.balajee.leavemanagement.entity.Employee;
import com.balajee.leavemanagement.entity.LeaveRequest;
import com.balajee.leavemanagement.repository.EmployeeRepository;
import com.balajee.leavemanagement.service.LeaveService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leaves")
@CrossOrigin("*")
public class LeaveController {

    private final LeaveService leaveService;
    private final EmployeeRepository employeeRepository;

    public LeaveController(
            LeaveService leaveService,
            EmployeeRepository employeeRepository) {

        this.leaveService = leaveService;
        this.employeeRepository = employeeRepository;
    }

    @PostMapping
    public LeaveRequest applyLeave(
            @RequestBody LeaveRequest leaveRequest) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        Employee employee =
                employeeRepository
                        .findByEmail(email)
                        .orElseThrow();

        leaveRequest.setEmployee(employee);

        return leaveService.applyLeave(
                leaveRequest
        );
    }

    @GetMapping
    public List<LeaveRequest> getAllLeaves() {

        return leaveService.getAllLeaves();
    }

    @GetMapping("/my")
    public List<LeaveRequest> getMyLeaves() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        Employee employee =
                employeeRepository
                        .findByEmail(email)
                        .orElseThrow();

        return leaveService.getLeavesByEmployeeId(
                employee.getId()
        );
    }

    @PutMapping("/{id}/approve")
    public LeaveRequest approveLeave(
            @PathVariable Long id) {

        return leaveService.approveLeave(id);
    }

    @PutMapping("/{id}/reject")
    public LeaveRequest rejectLeave(
            @PathVariable Long id) {

        return leaveService.rejectLeave(id);
    }
}