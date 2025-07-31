package com.investments.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.investments.entity.Biocon_students;
import com.investments.entity.Students;

public interface BioconStudentsRepository extends JpaRepository<Biocon_students, Long> {

}
