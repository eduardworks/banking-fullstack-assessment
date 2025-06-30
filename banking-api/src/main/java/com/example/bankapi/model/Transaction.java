package com.example.bankingapi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class Transaction {

    private Long id;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Amount is required")
    private Double amount;

    @NotNull(message = "Date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    public Transaction() {}

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
