import Redis from "ioredis";
import { REDIS_URL } from "../config/constants";
import { RedisAuth } from "./services/redisAuth";
import { RedisRoom } from "./services/redisRoom";

const redis = new Redis(REDIS_URL);
export const redisAuthService = new RedisAuth(redis);
export const redisRoomService = new RedisRoom(redis);
