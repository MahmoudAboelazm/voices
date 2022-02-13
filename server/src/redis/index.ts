import Redis from "ioredis";
import { REDIS_URL } from "../config/constants";
import { RedisAuth } from "./services/redisAuth";

const redis = new Redis(REDIS_URL);
export const redisAuthService = new RedisAuth(redis);
