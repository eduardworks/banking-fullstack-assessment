package com.example.bankingapi.service;

import com.example.bankingapi.model.Transaction;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import com.fasterxml.jackson.databind.SerializationFeature;
@Service
public class TransactionService {

    private Map<Long, Transaction> transactions = new HashMap<>();
    private AtomicLong idCounter = new AtomicLong();

    private final ObjectMapper mapper = new ObjectMapper()
    .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule())
    .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    // Adjust path if running outside IDE: use absolute or resource folder
    private final File jsonFile = new File("src/main/resources/data/transactions.json");
  
    @PostConstruct
    public void init() {
        try {
            if (jsonFile.exists()) {
                System.out.println("jsonFile-----------------------------------------------------" + jsonFile);
                List<Transaction> list = mapper.readValue(jsonFile, new TypeReference<List<Transaction>>() {});
                for (Transaction t : list) {
                    transactions.put(t.getId(), t);
                    if (t.getId() > idCounter.get()) {
                        idCounter.set(t.getId());
                    }
                }
            } else {
                // Create empty file on first run
                saveToFile();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Transaction> findAll() {
        return new ArrayList<>(transactions.values());
    }

    public Optional<Transaction> findById(Long id) {
        return Optional.ofNullable(transactions.get(id));
    }

    public Transaction save(Transaction transaction) {
        if (transaction.getId() == null) {
            transaction.setId(idCounter.incrementAndGet());
        }
        transactions.put(transaction.getId(), transaction);
        saveToFile();
        return transaction;
    }

    public boolean delete(Long id) {
        boolean removed = transactions.remove(id) != null;
        if (removed) {
            saveToFile();
        }
        return removed;
    }

    private void saveToFile() {
        try {
            mapper.writerWithDefaultPrettyPrinter()
                  .writeValue(jsonFile, transactions.values());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
