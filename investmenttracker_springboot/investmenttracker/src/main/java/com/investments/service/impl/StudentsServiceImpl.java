package com.investments.service.impl;

import lombok.AllArgsConstructor;

import com.investments.entity.Students;
import com.investments.repository.StudentsRepository;
import com.investments.service.StudentsService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentsServiceImpl implements StudentsService {

	@Autowired
    private StudentsRepository studentsRepository;

    @Override
    public Students createUser(Students user) {
        return studentsRepository.save(user);
    }

    @Override
    public Students getUserById(Long userId) {
        Optional<Students> optionalUser = studentsRepository.findById(userId);
        return optionalUser.get();
    }

    @Override
    public List<Students> getAllUsers() {
        return studentsRepository.findAll();
    }

    @Override
    public Students updateUser(Students user) {
        Students existingUser = studentsRepository.findById(user.getId()).get();
        existingUser.setName(user.getName());
        existingUser.setAge(user.getAge());
        existingUser.setAddress(user.getAddress());
        Students updatedUser = studentsRepository.save(existingUser);
        return updatedUser;
    }

    @Override
    public void deleteUser(Long userId) {
        studentsRepository.deleteById(userId);
    }
}
