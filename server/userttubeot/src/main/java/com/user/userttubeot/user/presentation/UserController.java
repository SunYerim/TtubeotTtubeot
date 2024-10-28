package com.user.userttubeot.user.presentation;

import com.user.userttubeot.user.application.UserService;
import com.user.userttubeot.user.domain.dto.UserSignupRequestDto;
import com.user.userttubeot.user.domain.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserSignupRequestDto request) {
        try {
            log.info("회원가입 요청이 들어왔습니다. 요청 사용자 이름: {}", request.getUserName());

            User newUser = userService.signup(request);
            log.info("회원가입 성공. 사용자 ID: {}", newUser.getUserId());

            return ResponseEntity.ok(newUser);

        } catch (IllegalArgumentException e) {
            log.error("회원가입 실패 - 잘못된 요청 데이터: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패: 잘못된 요청 데이터입니다.");
        } catch (Exception e) {
            log.error("회원가입 실패 - 서버 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("회원가입 실패: 서버 오류가 발생했습니다.");
        }
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissueToken(@RequestBody String refreshToken,
        HttpServletResponse response) {
        try {
            log.info("토큰 재발급 요청이 들어왔습니다.");

            // 액세스 및 리프레시 토큰을 포함한 Map 반환
            Map<String, String> tokens = userService.reissueTokens(refreshToken);
            log.info("토큰 재발급 성공.");

            // Authorization 헤더에 Bearer 액세스 토큰 추가
            response.addHeader("Authorization", "Bearer " + tokens.get("accessToken"));

            // Set-Cookie 헤더에 리프레시 토큰 추가
            response.addHeader("Set-Cookie",
                "refreshToken=" + tokens.get("refreshToken") + "; HttpOnly; Path=/");

            return ResponseEntity.ok("토큰 재발급 성공");

        } catch (IllegalArgumentException e) {
            log.error("토큰 재발급 실패 - 잘못된 리프레시 토큰: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("토큰 재발급 실패: 유효하지 않은 리프레시 토큰입니다.");
        } catch (Exception e) {
            log.error("토큰 재발급 실패 - 서버 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("토큰 재발급 실패: 서버 오류가 발생했습니다.");
        }
    }


}