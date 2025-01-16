# 🎮 뚜벗뚜벗

<div align="center">
  
  <h3>아이들 야외 활동 장려 서비스 ‘뚜벗뚜벗’</h3>
  
  <div>
    ✨ <a href="https://pinto-bakery-023.notion.site/0-SSAFY-1173b8f9991f80638044dc13e1c387b9?pvs=4">0ㅣ띠 팀 노션</a>
  </div>
  
  <br />
  
  <img src="images/TtubeotMain.jpg" width="50%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" alt="Team Image"/>
  
  <br />
  <br />
  
  <h3>🏆 수상 내역</h3>
  <div align="center">
    <p>🥈 SSAFY 11기 자율 프로젝트 우수상 - 삼성전자 주식회사</p>
  </div>
  
  <br />
  
</div>

### 📜 목차

---

1. [**프로젝트 일정**](#1)
2. [**프로젝트 개요**](#2)
3. [**서비스 소개**](#3)
4. [**주요 기능**](#4)
5. [**기술 스택**](#5)
6. [**산출물**](#6)
7. [**팀원 소개**](#7)
   <br><br>

<div id="1"></div>

### 🗓️ 프로젝트 일정

---

- 일정: 2024년 10월 14일 - 2024년 11월 19일 (6주)
  <br><br>

<div id="2"></div>

### 🔎 프로젝트 개요

---

요즘 아이들의 일상은 점점 더 실내로, 그리고 디지털 화면 속으로 머물고 있습니다. 뛰어놀던 놀이터는 텅 비었고, 아이들은 자연 속에서 상상력을 펼칠 기회를 잃어가고 있습니다.

육아정책연구소에서 조사한 결과에 따르면 초등학생들의 주평균 실외 활동량이 지속적으로 감소하고 있습니다.

야외활동이 감소하면서 또래와의 교류 기회가 줄어들어 협력과 소통의 기회가 부족해졌으며 다양한 환경에서의 새로운 경험을 접할 기회가 부족해지며 상상력과 창의적 사고를 발달시킬 기회가 줄어들고 있습니다.

저희는 아이들이 자연스럽게 야외활동에 참여하며, 그 과정에서 재미와 성취감을 느낄 수 있는 근본적인 해결책을 고민했습니다. 그래서 **아이들의 야외활동을 자연스럽게 촉진하면서도 재미를 더해주는 서비스, 뚜벗뚜벗**을 만들었습니다.

<br>

<div id="3"></div>

### 🔎 서비스 소개

---

뚜벗뚜벗은 아이들의 야외활동을 자연스럽게 촉진하면서도 재미를 더해주는 서비스입니다.

<br>

<div id="4"></div>

### 🔎 주요 기능

---

- **모험**: 아이들이 야외활동에 자연스럽게 참여할 수 있도록 ‘모험’이라는 컨셉을 선택했습니다.모험을 함께할 특별한 친구가 바로 ‘뚜벗’입니다. 뚜벗은 단순히 귀여운 캐릭터가 아니라, 아이들이 모험을 시작하도록 동기를 부여하는 중요한 역할을 합니다.

- **보물 찾기**: AR 카메라를 활용한 보물 찾기는 모험의 흥미를 극대화합니다. 아이들은 실제 환경에서 보물을 찾으며, 성취감과 재미를 느낄 수 있습니다.

- **걸음수 측정**: 기존의 라이브러리들은 뚜벗 프로젝트에서 사용하는 환경과 호환이 되지 않는 문제가 생겨 안드로이드 내장 센서를 활용하여 걸음수를 측정하는 네이티브 모듈을 직접 만들었습니다. 센서 이벤트 호출 간 최소 간격을 500ms 로 설정하여 전력 효율성을 높였고, 이를 통해 아이는 더 오랜 시간 동안 자신의 뚜벗과 모험을 할 수 있습니다.

- **친구 만나기**: 소통 능력을 키우고자 하는 뚜벗 서비스의 기획 의도에 맞춰 BLE를 활용하여 근접 거리 친구 만나기 기능을 구현했습니다. 먼저 GPS 기준으로 30m 이내 사용자를 감지하면 거리 오차가 적은 BLE 모드로 전환합니다. 그 다음 BLE 신호 세기를 기준으로 3m 이내 친구에게만 친구추가를 보낼 수 있습니다.

- **모험 발자국**: 모험이 끝난 후, 아이들의 여정을 특별한 '모험 발자국'으로 기록합니다. 모험 발자국은 단순한 기록이 아니라, 아이들의 발걸음을 따라 상상 속의 장면을 만들어주는 특별한 디지털 일기입니다. 이를 통해 아이들은 자신의 여정을 창의적으로 기록하고, 성취감을 느낄 수 있습니다. 이 발자국은 아이들의 모험 경로, 획득한 보물, 걸음 수 같은 모험에 대한 정보를 제공합니다.

<br>

<div id="5"></div>

### ⚒️ 기술 스택

---

- **Frontend**

  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![Zustand](https://img.shields.io/badge/zustand-7C3AED?style=for-the-badge&logo=zustand&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
  ![Styled Components](https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
  ![Howler.js](https://img.shields.io/badge/howler.js-4FC08D?style=for-the-badge&logo=howler.js&logoColor=white)
  ![Web Socket](https://img.shields.io/badge/Web%20Socket-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

- **Backend**

  ![Java](https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white)
  ![Spring](https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
  ![Spring Security](https://img.shields.io/badge/spring_security-6DB33F?style=for-the-badge&logo=spring_security&logoColor=white)
  ![Django](https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white)
  ![Web Socket](https://img.shields.io/badge/Web%20Socket-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

- **Infra**

  ![Kafka](https://img.shields.io/badge/kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
  ![Nginx](https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
  ![Jenkins](https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
  ![Amazon EC2](https://img.shields.io/badge/amazon_ec2-FF9900?style=for-the-badge&logo=Amazon-ec2&logoColor=white)

- **Database**

  ![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
  ![Redis](https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white)

- **Tool**

  ![GitLab](https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
  ![Jira](https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
  ![Notion](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white)

<br>
<div id="6"></div>

### 📜 산출물

---

**🖋️아키텍처 구조도**

<img src="images/architecture.png" width="950"> <br>

**🖋️ERD**

<img src="images/erd.png" width="950"> <br>

### 🖋️ 주요 기능 화면

---

#### **메인 화면**

<table>
  <tr>
    <td align="center">
      <img src="images/main.jpg" alt="메인 화면" width="300">
      <br>
      -
    </td>
  </tr>
</table>

---

#### **모험**

<table>
  <tr>
    <td align="center">
      <img src="images/adventure1.jpg" alt="모험 화면 1" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/adventure2.jpg" alt="모험 화면 2" width="300">
      <br>
      -
    </td>
  </tr>
</table>

---

#### **보물 찾기**

<table>
  <tr>
    <td align="center">
      <img src="images/ar1.jpg" alt="보물 찾기 화면 1" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/ar2.jpg" alt="보물 찾기 화면 2" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/ar3.jpg" alt="보물 찾기 화면 3" width="300">
      <br>
      -
    </td>
  </tr>
</table>

---

#### **모험 발자취**

<table>
  <tr>
    <td align="center">
      <img src="images/foot1.jpg" alt="걸음수 측정 화면 1" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/foot2.jpg" alt="걸음수 측정 화면 2" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/foot3.jpg" alt="걸음수 측정 화면 3" width="300">
      <br>
      -
    </td>
  </tr>
</table>

---

#### **친구 만나기**

<table>
  <tr>
    <td align="center">
      <img src="images/friend1.jpg" alt="친구 만나기 화면 1" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/friend2.jpg" alt="친구 만나기 화면 2" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/friend3.jpg" alt="친구 만나기 화면 3" width="300">
      <br>
      -
    </td>
  </tr>
</table>

---

#### **뚜벗 도감**

<table>
  <tr>
    <td align="center">
      <img src="images/dogam1.jpg" alt="모험 발자국 화면 1" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/dogam2.jpg" alt="모험 발자국 화면 2" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/dogam3.jpg" alt="모험 발자국 화면 3" width="300">
      <br>
      -
    </td>
  </tr>
</table>

---

#### **상점**

<table>
  <tr>
    <td align="center">
      <img src="images/market1.jpg" alt="상점 화면 1" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/market2.jpg" alt="상점 화면 2" width="300">
      <br>
      -
    </td>
    <td align="center">
      <img src="images/market3.jpg" alt="상점 화면 3" width="300">
      <br>
      -
    </td>
  </tr>
</table>


<div id="7"></div>


### 👥 팀원 소개

<table>
  <tr>
    <td align="center">
      <img src="./images/yeonhoo.jpg" width="200px" height="200px" alt="박연후"/><br />
      <b>박연후</b><br />
      <i>Backend</i>
    </td>
    <td align="center">
      <img src="./images/yerim.JPG" width="200px" height="200px" alt="선예림"/><br />
      <b>선예림</b><br />
      <i>Backend, Frontend</i>
    </td>
    <td align="center">
      <img src="./images/sangbeom.jpg" width="200px" height="200px" alt="김상범"/><br />
      <b>김상범</b><br />
      <i>Infra, Backend</i>
    </td>
    <td align="center">
      <img src="./images/jiwoo.jpg" width="200px" height="200px" alt="최지우"/><br />
      <b>최지우</b><br />
      <i>Frontend</i>
    </td>
    <td align="center">
      <img src="./images/minju.jpg" width="200px" height="200px" alt="차민주"/><br />
      <b>차민주</b><br />
      <i>Frontend</i>
    </td>
    <td align="center">
      <img src="./images/sanghyeon.JPG" width="200px" height="200px" alt="이상현"/><br />
      <b>이상현</b><br />
      <i>Frontend</i>
    </td>
  </tr>
</table>
