package com.sttapp.controller;

import com.sttapp.model.Transcription;
import com.sttapp.service.SpeechService;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileWriter;
import java.util.List;

@RestController
@RequestMapping("/api/speech")
@RequiredArgsConstructor
public class SpeechController {

    private final SpeechService speechService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadAudio(
            @RequestParam("file")
            MultipartFile file
    ) {

        try {

            return ResponseEntity.ok(
                    speechService
                            .uploadAndTranscribe(file)
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<Transcription>>
    history() {

        return ResponseEntity.ok(
                speechService.getHistory()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transcription>
    getTranscript(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                speechService.getTranscript(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteTranscript(
            @PathVariable Long id
    ) {

        speechService.deleteTranscript(id);

        return ResponseEntity.ok(
                "Transcript deleted successfully"
        );
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource>
    downloadTranscript(
            @PathVariable Long id
    ) {

        try {

            Transcription transcription =
                    speechService.getTranscript(id);

            File file =
                    File.createTempFile(
                            "transcript",
                            ".txt"
                    );

            FileWriter writer =
                    new FileWriter(file);

            writer.write(
                    transcription.getTranscript()
            );

            writer.close();

            Resource resource =
                    new FileSystemResource(file);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=transcript.txt"
                    )
                    .contentType(
                            MediaType.TEXT_PLAIN
                    )
                    .body(resource);

        } catch (Exception e) {

            throw new RuntimeException(
                    e.getMessage()
            );
        }
    }
}