import { OTP } from "../model/otp.model.js";

export async function createOtp(otpData) {
    return await OTP.create(otpData);
}
export async function getOtp(email) {
    return await OTP.findOne({email:email});
}
export async function deleteOtp(email) {
    return await OTP.deleteMany({email:email});
}