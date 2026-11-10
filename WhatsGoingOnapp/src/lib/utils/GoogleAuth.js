import {OAuth2Client} from "google-auth-library";

import {AppError} from "../error/error.js";
import {configDotenv} from "dotenv";
import {env} from "../config/env.js";
configDotenv();

const client = new OAuth2Client(
   env.google.clientID,
    env.google.clientSecret,
    'postmessage'
);
export async function verifyGoogleToken(idToken) {
    try {


        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: env.google.clientID
        });
        return ticket.getPayload();

    }catch (err){
        throw new AppError("Invalid google token",403);
    }
}