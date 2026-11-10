import Mailjet from 'node-mailjet';

export class Mailjet1 {
    constructor(config) {
        this.client = new Mailjet({ apiKey: config.apiKey, apiSecret: config.apiSecret });
        this.fromEmail = config.fromEmail;
        this.fromName = config.fromName;
    }
    async sendMail(email, subject, html) {
        return this.client.post('send', { version: 'v3.1' }).request({
            Messages: [{
                From: { Email: this.fromEmail, Name: this.fromName },
                To: [{ Email: email }],
                Subject: subject,
                HTMLPart: html,
            }],
        });
    }
}