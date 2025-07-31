package com.investments.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "biocon_students")
public class Biocon_students {
	//id, p_fname, p_collegename, p_mobile, p_email, a_year, a_degree, a_specilization, ap_10, ap_12, ap_ug, ap_pg, transid, transstatus, datetime
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String p_fname;
    @Column
    private String p_collegename;
    @Column
    private String p_mobile;
    @Column
    private String p_email;
    @Column
    private String a_year;
    @Column
    private String a_degree;
    @Column
    private String a_specilization;
    @Column
    private String ap_10;
    @Column
    private String ap_12;
    @Column
    private String ap_ug;
    @Column
    private String ap_pg;
    @Column
    private String transid;
    @Column
    private String transstatus;
    @Column
    private LocalDateTime datetime;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getP_fname() {
		return p_fname;
	}
	public void setP_fname(String p_fname) {
		this.p_fname = p_fname;
	}
	public String getP_collegename() {
		return p_collegename;
	}
	public void setP_collegename(String p_collegename) {
		this.p_collegename = p_collegename;
	}
	public String getP_mobile() {
		return p_mobile;
	}
	public void setP_mobile(String p_mobile) {
		this.p_mobile = p_mobile;
	}
	public String getP_email() {
		return p_email;
	}
	public void setP_email(String p_email) {
		this.p_email = p_email;
	}
	public String getA_year() {
		return a_year;
	}
	public void setA_year(String a_year) {
		this.a_year = a_year;
	}
	public String getA_degree() {
		return a_degree;
	}
	public void setA_degree(String a_degree) {
		this.a_degree = a_degree;
	}
	public String getA_specilization() {
		return a_specilization;
	}
	public void setA_specilization(String a_specilization) {
		this.a_specilization = a_specilization;
	}
	public String getAp_10() {
		return ap_10;
	}
	public void setAp_10(String ap_10) {
		this.ap_10 = ap_10;
	}
	public String getAp_12() {
		return ap_12;
	}
	public void setAp_12(String ap_12) {
		this.ap_12 = ap_12;
	}
	public String getAp_ug() {
		return ap_ug;
	}
	public void setAp_ug(String ap_ug) {
		this.ap_ug = ap_ug;
	}
	public String getAp_pg() {
		return ap_pg;
	}
	public void setAp_pg(String ap_pg) {
		this.ap_pg = ap_pg;
	}
	public String getTransid() {
		return transid;
	}
	public void setTransid(String transid) {
		this.transid = transid;
	}
	public String getTransstatus() {
		return transstatus;
	}
	public void setTransstatus(String transstatus) {
		this.transstatus = transstatus;
	}
	public LocalDateTime getDatetime() {
		return datetime;
	}
	public void setDatetime(LocalDateTime datetime) {
		this.datetime = datetime;
	}
    
    
    
    
}
