import { Socket } from "socket.io";
import AdventureService from "../services/AdventureService";
import ImageGenService from "../services/ImageGenService";
import ParkService from "../services/ParkService";
import JWTParser from '../utils/JWTParser';

export class AdventureController {
  private adventureService: AdventureService;
  private imageGenService: ImageGenService;
  private parkService: ParkService;

  constructor() {
    this.adventureService = new AdventureService();
    this.imageGenService = new ImageGenService();
    this.parkService = new ParkService();
  }

  async handleInitAdventure(socket: Socket, data: { token: string }): Promise<void> {
    let { token } = data;
    try {
      token = token.split(' ')[1];
      let userId = JWTParser.parseUserIdFromJWT(token);
      if (userId === -1) {
        throw new Error('Invalid JWT token');
      }

      await this.adventureService.initAdventure(userId, socket.id);
    } catch (error) {
      console.error("Error in handleInitAdventure:", error);
      socket.emit("error", { message: "Failed to initialize adventure" });
    }
  }

  // 위치 및 걸음 수 저장 이벤트 처리
  async handleStoreGPSData(socket: Socket, data: { lat: number, lng: number, steps: number }): Promise<void> {
    const { lat, lng, steps } = data;
    try {
      let nearbyUsers = await this.adventureService.storeGPSData(socket.id, lat, lng, steps);
      // TODO: adventure_park 정보 조회 후 반환 해야함.

      socket.emit("adventure_user", { "users": nearbyUsers });
    } catch (error) {
      console.error("Error in handleStoreGPSData:", error);
      socket.emit("error", { message: "Failed to store GPS data" });
    }
  }

  async handleEndAdventure(socket: Socket): Promise<void> {
    try {
      let adventureLog = await this.adventureService.endAdventure(socket.id);

      socket.emit("adventure_result", { "data": adventureLog });

      socket.disconnect();

      this.imageGenService.generateImage(adventureLog);
    } catch (error) {
      console.error("Error in handleEndAdventure:", error);
      socket.emit("error", { message: "Failed to end adventure" });
    }
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    try {
      await this.adventureService.endAdventure(socket.id);
    } catch (error) {
      console.error("Error in handleDisconnect:", error);
    }
  }
}
