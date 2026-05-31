package com.sttapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TranscriptResponse {

    private Long id;
    private String transcript;
}