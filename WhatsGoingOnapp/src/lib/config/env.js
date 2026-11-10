import { z } from "zod";
import { config } from "dotenv";

config();

const schema = z.object({
    PORT:                    z.string().default('3000'),
    MONGO_DB_URL:            z.string(),
    JWT_SECRET:              z.string().min(32),
    REFRESH_TOKEN_SECRET:   z.string().min(32),
    REFRESH_TOKEN_TTL_DAYS: z.string().default('7'),
    REDIS_PASSWORD:          z.string().default(''),
    GOOGLE_CLIENT_ID:        z.string(),
    GOOGLE_CLIENT_SECRET:    z.string(),
    MAILJET_API_KEY:         z.string(),
    MAILJET_API_SECRET_KEY:  z.string(),
    MAILJET_FROM_EMAIL:      z.string().trim().toLowerCase(),
    MAILJET_FROM_NAME:       z.string().trim(),
});

const parsed = schema.parse(process.env);

export const env = {
    port: Number(parsed.PORT),
    db: {
        url: parsed.MONGO_DB_URL,
    },
    redis: {
        host:     parsed.REDIS_HOST,
        port:     Number(parsed.REDIS_PORT),
        password: parsed.REDIS_PASSWORD,
    },
    mailjet: {
        apiKey:    parsed.MAILJET_API_KEY,
        apiSecret: parsed.MAILJET_API_SECRET_KEY,
        fromEmail: parsed.MAILJET_FROM_EMAIL,
        fromName:  parsed.MAILJET_FROM_NAME,
    },
    jwt: {
        secret: parsed.JWT_SECRET,
    },
    refreshToken: {
        secret: parsed.REFRESH_TOKEN_SECRET,
        ttlDays: Number(parsed.REFRESH_TOKEN_TTL_DAYS),
    },
    google: {
        clientID:     parsed.GOOGLE_CLIENT_ID,
        clientSecret: parsed.GOOGLE_CLIENT_SECRET,
    },
};