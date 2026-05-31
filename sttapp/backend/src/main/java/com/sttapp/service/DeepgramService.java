package com.sttapp.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.nio.file.Files;

@Service
public class DeepgramService {

    @Value("${deepgram.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper =
            new ObjectMapper();

    public String transcribe(File audioFile) {

        try {

            byte[] audioBytes =
                    Files.readAllBytes(
                            audioFile.toPath()
                    );

            WebClient client =
                    WebClient.builder()
                            .baseUrl(
                                    "https://api.deepgram.com"
                            )
                            .defaultHeader(
                                    HttpHeaders.AUTHORIZATION,
                                    "Token " + apiKey
                            )
                            .build();

            String response =
                    client.post()
                            .uri("/v1/listen")
                            .contentType(
                                    MediaType.APPLICATION_OCTET_STREAM
                            )
                            .bodyValue(audioBytes)
                            .retrieve()
                            .bodyToMono(String.class)
                            .block();

            JsonNode root =
                    objectMapper.readTree(response);

            return root
                    .path("results")
                    .path("channels")
                    .get(0)
                    .path("alternatives")
                    .get(0)
                    .path("transcript")
                    .asText();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Deepgram Error: "
                            + e.getMessage()
            );
        }
    }
}