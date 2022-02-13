import { Redis } from "ioredis";
interface UserInfo {
  token: string;
  userId: string;
}
export class RedisAuth {
  private readonly redis: Redis;
  constructor(redisInstance: Redis) {
    this.redis = redisInstance;
  }

  async addToken(userInfo: UserInfo) {
    await this.redis.set(
      userInfo.token,
      userInfo.userId,
      "ex",
      60 * 60 * 24 * 3,
    );
  }
  async authToken(token: string) {
    const userId = await this.redis.get(token);
    return userId;
  }
  async delToken(token: string) {
    await this.redis.del(token);
  }
}
