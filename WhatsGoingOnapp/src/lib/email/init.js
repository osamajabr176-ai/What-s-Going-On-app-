import {Mailjet1} from "../../pkg/email/mailjet.js";
import {env} from "../config/env.js";

export const mailjetProvider = new Mailjet1({
    apiKey: env.mailjet.apiKey,
    apiSecret: env.mailjet.apiSecret,
    fromEmail: env.mailjet.fromEmail,
    fromName: env.mailjet.fromName,
})