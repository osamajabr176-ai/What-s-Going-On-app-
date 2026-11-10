import {logger} from "../../pkg/logger/logger.js";
import {cacheProvider} from "./init.js";

export function CacheRateLimit(ttl = 180) {
    return async (req, res, next) => {
        const key = `${req.originalUrl}:${req.user?.id || req.ip}`;

        try {
            const cached = await cacheProvider.get(key);
            if (cached) {
                res.setHeader("X-Cache", "HIT");
                return res.json(JSON.parse(cached));
            }
        } catch (err) {
            logger.error(`cache read failed: ${err.message}`);
        }

        const originalJson = res.json.bind(res);

        res.json = (body) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {


                res.setHeader("X-Cache", "MISS");
                try {
                    Promise.resolve(cacheProvider.set(key, JSON.stringify(body), ttl))
                        .catch((err) => logger.error(`cache write failed: ${err.message}`));
                } catch (err) {
                    logger.error(`cache serialize failed: ${err.message}`);
                }
            }
            return originalJson(body);
        };


        next();
    };
}