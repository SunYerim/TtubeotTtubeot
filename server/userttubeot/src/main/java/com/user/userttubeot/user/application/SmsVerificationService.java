package com.user.userttubeot.user.application;

import java.time.Duration;
import java.time.Instant;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SmsVerificationService {

    private static final Duration VERIFICATION_CODE_EXPIRE_DURATION = Duration.ofMinutes(5);
    private final RedisService redisService;

    /**
     * 인증 코드 생성 및 Redis에 저장
     */
    public String generateAndSaveVerificationCode(String phoneNumber) {
        String verificationCode = generateVerificationCode();

        // 인증 코드 저장
        redisService.setValues(generateCodeKey(phoneNumber), verificationCode,
            VERIFICATION_CODE_EXPIRE_DURATION);

        // 타임스탬프 저장
        redisService.setValues(generateTimestampKey(phoneNumber),
            String.valueOf(Instant.now().getEpochSecond()), VERIFICATION_CODE_EXPIRE_DURATION);

        log.info("인증 번호 생성 및 저장 완료. 전화번호: {}, 코드: {}", phoneNumber, verificationCode);
        return verificationCode;
    }

    /**
     * 인증 코드 검증
     */
    public boolean verifyCode(String phoneNumber, String verificationCode) {
        String storedCode = redisService.getValue(generateCodeKey(phoneNumber));
        String storedTimestamp = redisService.getValue(generateTimestampKey(phoneNumber));

        if (storedCode == null || storedTimestamp == null) {
            log.warn("인증 시간이 만료되었습니다. 전화번호: {}", phoneNumber);
            return false;
        }

        long currentTimestamp = Instant.now().getEpochSecond();
        long savedTimestamp = Long.parseLong(storedTimestamp);

        if (currentTimestamp - savedTimestamp > VERIFICATION_CODE_EXPIRE_DURATION.getSeconds()) {
            log.warn("인증 시간이 초과되었습니다. 전화번호: {}", phoneNumber);
            deleteVerificationCode(phoneNumber); // 만료된 데이터 삭제
            return false;
        }

        boolean isMatch = storedCode.equals(verificationCode);
        if (isMatch) {
            log.info("인증 성공. 전화번호: {}", phoneNumber);
        } else {
            log.warn("인증 번호가 일치하지 않습니다. 입력된 코드: {}, 저장된 코드: {}", verificationCode, storedCode);
        }
        return isMatch;
    }

    /**
     * 전화번호 인증 여부 확인
     */
    public boolean isPhoneVerified(String phoneNumber) {
        String storedCode = redisService.getValue(generateCodeKey(phoneNumber));
        boolean isVerified = storedCode != null;
        log.info("전화번호 인증 상태 확인. 전화번호: {}, 인증 상태: {}", phoneNumber, isVerified ? "인증됨" : "인증되지 않음");
        return isVerified;
    }

    /**
     * 인증 데이터 삭제
     */
    public void deleteVerificationCode(String phoneNumber) {
        redisService.deleteValue(generateCodeKey(phoneNumber));
        redisService.deleteValue(generateTimestampKey(phoneNumber));
        log.info("인증 데이터 삭제 완료. 전화번호: {}", phoneNumber);
    }

    /**
     * 6자리 인증 번호 생성
     */
    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        log.debug("랜덤 인증 번호 생성: {}", code);
        return String.valueOf(code);
    }

    /**
     * 인증 코드에 대한 Redis 키 생성
     */
    private String generateCodeKey(String phoneNumber) {
        return "SMS_CODE_" + phoneNumber;
    }

    /**
     * 타임스탬프에 대한 Redis 키 생성
     */
    private String generateTimestampKey(String phoneNumber) {
        return "SMS_TIMESTAMP_" + phoneNumber;
    }
}