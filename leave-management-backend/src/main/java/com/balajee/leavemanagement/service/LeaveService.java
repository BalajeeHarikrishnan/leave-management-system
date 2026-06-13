package com.balajee.leavemanagement.service;

import com.balajee.leavemanagement.entity.LeaveRequest;
import com.balajee.leavemanagement.repository.LeaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    private final LeaveRepository leaveRepository;

    public LeaveService(LeaveRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    public LeaveRequest applyLeave(LeaveRequest leaveRequest) {

        leaveRequest.setStatus("PENDING");

        return leaveRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getAllLeaves() {

        return leaveRepository.findAll();
    }

    public LeaveRequest approveLeave(Long id) {

        LeaveRequest leave =
                leaveRepository.findById(id)
                        .orElseThrow();

        leave.setStatus("APPROVED");

        return leaveRepository.save(leave);
    }

    public LeaveRequest rejectLeave(Long id) {

        LeaveRequest leave =
                leaveRepository.findById(id)
                        .orElseThrow();

        leave.setStatus("REJECTED");

        return leaveRepository.save(leave);
    }

    public List<LeaveRequest> getLeavesByEmployeeId(Long employeeId) {

        return leaveRepository.findAll()
                .stream()
                .filter(leave ->
                        leave.getEmployee() != null
                                &&
                                leave.getEmployee().getId()
                                        .equals(employeeId)
                )
                .toList();
    }
}