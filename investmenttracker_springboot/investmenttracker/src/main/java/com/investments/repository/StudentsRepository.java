package com.investments.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.investments.entity.Students;

public interface StudentsRepository extends JpaRepository<Students, Long> {

}
