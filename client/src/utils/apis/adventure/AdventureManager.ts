import { Socket } from 'socket.io-client';

interface PositionData {
  lat: number;
  lng: number;
  steps: number;
}

interface UserProps {
  user_id: number;
  username: string;
  ttubeot_id: number;
  distance: number;
}

class AdventureManager {
  public static instance: AdventureManager;
  public socket: Socket;

  public constructor(socket: Socket) {
    this.socket = socket;
  }

  static initialize(socket: Socket) {
    if (!AdventureManager.instance) {
      AdventureManager.instance = new AdventureManager(socket);
    }
    return AdventureManager.instance;
  }

  static getInstance(): AdventureManager {
    if (!AdventureManager.instance) {
      throw new Error('AdventureManager is not initialized.');
    }
    return AdventureManager.instance;
  }

  static destory() {
    if (AdventureManager.instance) {
      AdventureManager.instance = null;
    }
  }

  public addAdventureResultListener(callback: (data) => void) {
    this.socket.on('adventure_result', callback);
    // console.log('adventure_result event를 수신합니다.');
  }

  public addAdventureUserListener(callback: (data: UserProps[]) => void) {
    this.socket.on('adventure_user', callback);
    // console.log('adventure_user event를 수신합니다.');
  }

  public addAdventureParkListener(callback: (data) => void) {
    this.socket.on('adventure_park', callback);
    // console.log('adventure_park event를 수신합니다.');
  }

  public addAdventureRequestListener(callback: (data) => void) {
    this.socket.on('adventure_request', callback);
    // console.log('adventure_request event를 수신합니다.');
  }

  public addAdventureConfirmListener(callback: (data) => void) {
    this.socket.on('adventure_confirm', callback);
    // console.log('adventure_confirm event를 수신합니다.');
  }

  public addAdventureRewardListener(callback: (data) => void) {
    this.socket.on('adventure_reward', callback);
    // console.log('adventure_reward event를 수신합니다.');
  }

  // 근처 사용자에게 친구 요청 전송 메서드
  public sendFriendRequest(user_id: number) {
    const data = {
      user_id: user_id,
    };
    this.socket.emit('adventure_request', data);
    // console.log('친구 요청을 전송합니다.', data);
  }

  public sendFriendRequestAccept(user_id: number) {
    const data = {
      user_id: user_id,
      answer: true,
    };
    this.socket.emit('adventure_confirm', data);
    // console.log('친구 요청을 수락합니다.', data);
  }

  // 위치 정보 전송 메서드
  public sendPosition(data: PositionData) {
    this.socket.emit('adventure_info', data);
    // console.log('adventure_info event를 전송합니다. ', data);
  }

  // 모험 종료 알림 전송 메서드
  public endAdventure() {
    this.socket.emit('adventure_end');
    // console.log('adventure_end event 전송');
  }

  public removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
      // console.log('모든 소켓 이벤트 리스너를 제거했습니다.');
    }
  }
}

export default AdventureManager;
