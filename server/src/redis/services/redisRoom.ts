import { Redis } from "ioredis";

interface AddUserProps {
  roomId: string;
  userId: string;
}

const APPROVED_TO_SPEAK = "userApprovedToSpeak";
const ROOM = "userInRoom";

export class RedisRoom {
  private readonly redis: Redis;
  constructor(redisInstance: Redis) {
    this.redis = redisInstance;
  }

  async addUserToRoom(props: AddUserProps) {
    await this.redis.set(
      ROOM + props.userId,
      props.roomId,
      "ex",
      60 * 60 * 24 * 3,
    );
  }
  async isUserInRoom(userId: string) {
    return await this.redis.get(ROOM + userId);
  }
  async delUserInRoom(userId: string) {
    await this.redis.del(ROOM + userId);
  }
  async addApprovedToSpeak(props: AddUserProps) {
    await this.redis.set(
      APPROVED_TO_SPEAK + props.userId,
      props.roomId,
      "ex",
      60 * 5,
    );
  }
  async isApprovedToSpeak(userId: string) {
    return await this.redis.get(APPROVED_TO_SPEAK + userId);
  }
  async delApprovedToSpeak(userId: string) {
    await this.redis.del(APPROVED_TO_SPEAK + userId);
  }
}
