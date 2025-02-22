package com.user.userttubeot.ttubeot.domain.model;

import com.user.userttubeot.ttubeot.domain.dto.TtubeotNameRegisterRequestDTO;
import com.user.userttubeot.user.domain.entity.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_ttubeot_ownership")
public class UserTtuBeotOwnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userTtubeotOwnershipId;

    @Column(name = "ttubeot_name", nullable = false)
    private String ttubeotName;

    @Column(name = "ttubeot_status", nullable = false)
    private Integer ttubeotStatus = 0; // DEFAULT

    @Column(name = "ttubeot_score", nullable = false)
    private Integer ttubeotScore = 0; // default

    @Column(name = "ttubeot_interest", nullable = false)
    private Integer ttubeotInterest = 50;

    @Column(name = "break_up")
    private LocalDateTime breakUp;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ttubeot_id", nullable = false)
    private Ttubeot ttubeot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "userTtuBeotOwnership", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<TtubeotLog> ttubeotLogs = new ArrayList<>();

    @OneToMany(mappedBy = "userTtuBeotOwnership", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<UserTtubeotMission> userTtubeotMissions = new ArrayList<>();


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.ttubeotStatus == null) {
            this.ttubeotStatus = 0;
        }
        if (this.ttubeotScore == null) {
            this.ttubeotScore = 0;
        }
        if (this.ttubeotInterest == null) {
            this.ttubeotInterest = 70;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }


    // 이름 업데이트 메서드
    public UserTtuBeotOwnership updateTtubeotName(String newName) {
        if (newName == null || newName.isEmpty()) {
            throw new IllegalArgumentException("이름은 비어 있을 수 없습니다.");
        }
        this.ttubeotName = newName;
        return this;
    }

    // 뚜벗의 상태 갱신 메서드
    public UserTtuBeotOwnership updateBreakUpAndStatus(LocalDateTime breakUpTime,
        Integer newStatus) {
        this.breakUp = breakUpTime;
        this.ttubeotStatus = newStatus;
        return this;
    }

    // 점수 누적 메서드
    public void accumulateScore(int score) {
        if (score < 0) {
            throw new IllegalArgumentException("점수는 음수가 될 수 없습니다.");
        }
        this.ttubeotScore += score;
    }


    // DTO to Entity
    public static UserTtuBeotOwnership fromDTO(TtubeotNameRegisterRequestDTO dto, Ttubeot ttubeot,
        User user) {
        return UserTtuBeotOwnership.builder()
            .userTtubeotOwnershipId(dto.getUserTtubeotOwnershipId())
            .ttubeotName(dto.getUserTtubeotOwnershipName())
            .ttubeot(ttubeot)
            .user(user)
            .build();
    }

    // 뚜벗 interest 변화
    public Integer changeInterest(int interest) {
        this.ttubeotInterest += interest;

        // ttubeotInterest 가 0 미만이면 0으로 설정
        if (this.ttubeotInterest < 0) {
            this.ttubeotInterest = 0;
        }
        // ttubeotInterest 가 100을 초과하면 100으로 설정
        if (this.ttubeotInterest > 100) {
            this.ttubeotInterest = 100;
        }

        return this.ttubeotInterest;
    }


}
