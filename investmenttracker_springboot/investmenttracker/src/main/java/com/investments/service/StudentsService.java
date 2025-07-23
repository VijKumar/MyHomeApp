package com.investments.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.investments.entity.Students;


public interface StudentsService {
    Students createUser(Students user);

    Students getUserById(Long userId);

    List<Students> getAllUsers();

    Students updateUser(Students user);

    void deleteUser(Long userId);
}
