package com.user.userttubeot.ttubeot.domain.model;

import com.user.userttubeot.ttubeot.domain.dto.backend.TtubeotRegistToDbDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Table(name = "ttubeot")
public class Ttubeot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ttubeotId;

    @Column(name = "ttubeot_type", nullable = false)
    private Integer ttubeotType;

    @OneToMany(mappedBy = "ttubeot", fetch = FetchType.LAZY)
    private List<UserTtuBeotOwnership> userTtuBeotOwnershipList = new ArrayList<>();

    public static Ttubeot fromDTO(TtubeotRegistToDbDTO dto) {
        return Ttubeot.builder()
            .ttubeotType(dto.getTtubeotType())
            .build();
    }

}
