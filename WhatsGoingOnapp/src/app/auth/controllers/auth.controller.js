import * as authService from '../services/auth.service.js';
import { toMs } from '../../../pkg/utils/time.js';
import {validation} from "../../../lib/validation/validation.js";
import {LoginDTO, registerDTO, resetPasswordDTO, sendOtpDTO, verifyAccountDTO} from "../dto/auth.dto.js";
import { env } from "../../../lib/config/env.js";
import { AppError } from "../../../lib/error/error.js";




export async function register(req , res , next) {
    try {
        const data = await validation(registerDTO,req.body);
        const createdUser = await authService.register(data);
        res.status(201).json({
            message : "User creates succesfully",
            success : true,
            user : createdUser
                })
    } catch (error) {
        next(error)
    }
}

export async function verifyAccount(req , res , next) {
    try {
        const data = validation(verifyAccountDTO,req.body);
        const {email,code} = data;
        const updatedUser = await authService.verifyAccount(email,code);
        res.status(200).json({
            message : "User verified succesfully",
            success : true,
            user : updatedUser
                })
    } catch (error) {
        next(error)
    }
}

export async function enable2stepVarification(req , res , next) {
    try {
        const {email,code} = req.body;
        const updatedUser = await authService.enable2stepVarification(email,code);
        res.status(200).json({
            message : "2-step verification enabled succesfully",
            success : true,
            user : updatedUser
                })
    } catch (error) {
        next(error)
    }
}

export async function login(req , res , next) {
    try {
        const data = validation(LoginDTO,req.body);
        const {email,password} = data;
        const { user, token } = await authService.login(email, password);
        res.cookie('access_token', token, { httpOnly: true, secure: true, maxAge: toMs(1, 'hours'), sameSite: 'strict' });
        res.status(200).json({
            message : "User logged in succesfully",
            success : true,
            user : user
                })
    }
        catch (error) {
        next(error);
    }
}

export async function sendOtp(req , res , next) {
    try {
        const data = validation(sendOtpDTO,req.body);
        const {email} = data;
        await authService.sendOtp(email);
        res.status(200).json({
            message : "Otp sent succesfully",
            success : true
                })
    } catch (error) {
        next(error);
    }
}

export async function resetPassword(req , res , next) {
    try {
        const data = validation(resetPasswordDTO,req.body);
        const {email,code,newPassword} = data;
        await authService.resetPassword(email,code,newPassword);
        res.sendStatus(204);
        res.json({
            success : true,
            message : "Password reset successfully"
        })
    } catch (err) {
        next(err);
    }
}

export async function loginWithGoogle(req , res , next) {
    try {

        const token =  await authService.loginWithGoogle(req.body.idToken);
        res.cookie('access_token',token,{
            httpOnly: true,
            maxAge:toMs(1,'hours'),
            sameSite: 'strict'
        })
        res.status(200).json({
            message : "User logged in succesfully",
            success : true
        })

    } catch (err){
        next(err);
    }
}

export async function refreshToken(req , res , next) {
    try {
        const refreshTokenString = req.cookies.refresh_token;
        if (!refreshTokenString) {
            return next(new AppError('Refresh token missing', 401));
        }
        const { accessToken, refreshToken } = await authService.refreshToken(refreshTokenString);
        // Set new tokens
        res.cookie('access_token', accessToken, { httpOnly: true, secure: true, maxAge: toMs(15, 'minutes'), sameSite: 'strict' });
        res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, maxAge: toMs(env.refreshToken.ttlDays, 'days'), sameSite: 'strict' });
        res.status(200).json({
            message : "Token refreshed successfully",
            success : true,
        })
    } catch (err){
        next(err);
    }
}