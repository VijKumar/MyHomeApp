package com.investments.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.investments.entity.Students;
import com.investments.service.StudentsService;

@RestController
public class investmentcontroller {
	
	@Autowired
    private StudentsService studentService;

	
	@GetMapping("/hi")
	public ResponseEntity<Object> getmainurl() {
		return new ResponseEntity<>("HI Welcome",HttpStatus.OK);
	}
	
	@PostMapping("/Register")
    public ResponseEntity<Students> createUser(@RequestBody JsonNode jsonNode){
		
        ObjectMapper objectMapper = new ObjectMapper();

		
		System.out.println("Received dynamic data (Map): " + jsonNode);
		System.out.println("Received dynamic data (Map): " + jsonNode.get("formData").asText());
		try {
            JsonNode rootNode = objectMapper.readTree(jsonNode.get("formData").asText());
			Students user = objectMapper.treeToValue(rootNode, Students.class);
			
			Students savedUser = studentService.createUser((Students) user);
			return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
		} catch (JsonProcessingException | IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
		 
        return null;
        
    }


}
