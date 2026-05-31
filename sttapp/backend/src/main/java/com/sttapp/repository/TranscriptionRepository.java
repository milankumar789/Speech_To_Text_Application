package com.sttapp.repository;

import com.sttapp.model.Transcription;
import com.sttapp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TranscriptionRepository
        extends JpaRepository<Transcription, Long> {

    List<Transcription> findByUser(User user);

    Optional<Transcription> findByIdAndUser(
            Long id,
            User user
    );
}