import jwt from "jsonwebtoken";
import {env} from "../../lib/config/env.js";

export async function generatToken(payload){
    return jwt.sign(payload,env.jwt.secret,{expiresIn: '1h'});
}