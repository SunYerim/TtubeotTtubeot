package com.user.userttubeot.ttubeot.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponseDTO {

    private String errorCode;
    private String message;

}
