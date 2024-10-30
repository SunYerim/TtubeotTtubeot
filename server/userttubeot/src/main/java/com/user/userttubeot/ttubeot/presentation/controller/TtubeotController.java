package com.user.userttubeot.ttubeot.presentation.controller;

import com.user.userttubeot.ttubeot.application.service.TtubeotService;
import com.user.userttubeot.ttubeot.application.service.TtubeotServiceImpl;
import com.user.userttubeot.ttubeot.domain.dto.TtubeotDrawRequestDTO;
import com.user.userttubeot.ttubeot.domain.dto.TtubeotDrawResponseDTO;
import com.user.userttubeot.ttubeot.domain.dto.TtubeotLogRequestDTO;
import com.user.userttubeot.ttubeot.domain.dto.TtubeotNameRegisterRequestDTO;
import com.user.userttubeot.ttubeot.domain.dto.UserTtubeotGraduationInfoListDTO;
import com.user.userttubeot.ttubeot.domain.dto.UserTtubeotIdResponseDTO;
import com.user.userttubeot.ttubeot.domain.dto.UserTtubeotInfoResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class TtubeotController {

    private final TtubeotServiceImpl ttubeotService;

    // 뚜벗 로그 추가
    @PostMapping("/ttubeot/logs")
    public ResponseEntity<?> addTtubeotLog(@RequestBody TtubeotLogRequestDTO ttubeotLogRequestDTO) {
        Long userTtubeotId = ttubeotLogRequestDTO.getUserTtubeotOwnershipId();
        ttubeotService.addTtubeotLog(userTtubeotId, ttubeotLogRequestDTO);

        return ResponseEntity.ok("로그가 성공적으로 추가되었습니다.");
    }

    // 유저의 뚜벗 상세 정보 조회 -> 정상인 것만. (모험 사용)
    @GetMapping("/ttubeot/adventure/{userId}/details")
    public ResponseEntity<?> getDdubeotInfo(@PathVariable int userId) {
        UserTtubeotInfoResponseDTO ttubeotInfo = ttubeotService.getDdubeotInfo(userId);
        return ResponseEntity.ok(ttubeotInfo);
    }

    // 회원의 뚜벗 아이디 조회 (모험 사용)
    @GetMapping("/ttubeot/adventure/{userId}/id")
    public ResponseEntity<?> getDdubeotId(@PathVariable int userId) {
        Long ttubeotId = ttubeotService.getTtubeotOwnershipId(userId);
        UserTtubeotIdResponseDTO responseDTO = new UserTtubeotIdResponseDTO(ttubeotId);
        return ResponseEntity.ok(responseDTO);
    }

    // 뚜벗의 이름 등록
    @PostMapping("/ttubeot/name")
    public ResponseEntity<?> addTtubeotName(
        @RequestBody TtubeotNameRegisterRequestDTO ttubeotNameRegister) {
        try {
            ttubeotService.registerTtubeotName(ttubeotNameRegister);
            return ResponseEntity.ok("뚜벗의 이름이 성공적으로 등록되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 ID에 해당하는 뚜벗 소유 정보가 없습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("뚜벗 이름 등록 중 오류가 발생했습니다.");
        }
    }

    // 졸업사진 정보 조회
    @GetMapping("/auth/ttubeot/album")
    public ResponseEntity<?> getTtubeotAlbum(@RequestAttribute("userId") Integer userId) {
        UserTtubeotGraduationInfoListDTO graduationInfoList = ttubeotService.getUserTtubeotGraduationInfoList(
            userId);

        return ResponseEntity.ok(graduationInfoList);
    }

    // 뚜벗 뽑기
    @PostMapping("/auth/ttubeot/draw")
    public ResponseEntity<?> drawTtubeot(@RequestAttribute("userId") Integer userId,
        @RequestBody TtubeotDrawRequestDTO TtubeotDrawRequest) {
        TtubeotDrawResponseDTO ttubeotDrawResponse = ttubeotService.drawTtubeot(userId,
            TtubeotDrawRequest);
        return ResponseEntity.ok(ttubeotDrawResponse);
    }


}
