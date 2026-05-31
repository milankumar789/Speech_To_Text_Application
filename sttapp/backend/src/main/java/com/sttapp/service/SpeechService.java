package com.sttapp.service;

import com.sttapp.model.Transcription;
import com.sttapp.model.User;

import com.sttapp.repository.TranscriptionRepository;
import com.sttapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpeechService {

    @Value("${upload.dir}")
    private String uploadDir;

    private final DeepgramService deepgramService;

    private final TranscriptionRepository transcriptionRepository;

    private final UserRepository userRepository;

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );
    }

    public Transcription uploadAndTranscribe(
            MultipartFile file
    ) throws IOException {

        User currentUser = getCurrentUser();

        Path uploadPath =
                Paths.get(uploadDir)
                        .toAbsolutePath();

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName =
                System.currentTimeMillis()
                        + "_"
                        + file.getOriginalFilename();

        Path filePath =
                uploadPath.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                filePath
        );

        File savedFile =
                filePath.toFile();

        String transcript =
                deepgramService.transcribe(
                        savedFile
                );

        Transcription transcription =
                Transcription.builder()
                        .audioFile(fileName)
                        .transcript(transcript)
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .user(currentUser)
                        .build();

        return transcriptionRepository.save(
                transcription
        );
    }

    public List<Transcription> getHistory() {

        User currentUser =
                getCurrentUser();

        return transcriptionRepository
                .findByUser(currentUser);
    }

    public Transcription getTranscript(
            Long id
    ) {

        User currentUser =
                getCurrentUser();

        return transcriptionRepository
                .findByIdAndUser(
                        id,
                        currentUser
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Transcript not found"
                        )
                );
    }

    public void deleteTranscript(
            Long id
    ) {

        User currentUser =
                getCurrentUser();

        Transcription transcription =
                transcriptionRepository
                        .findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Transcript not found"
                                )
                        );

        transcriptionRepository.delete(
                transcription
        );
    }
}