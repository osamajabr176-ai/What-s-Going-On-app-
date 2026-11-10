import * as userService from '../services/user.service.js';

export async function uploadUserPic(req, res,next) {
    try {
        const id = req.user.id;
        await userService.uploadUserPic(id,req.file);

        res.status(200).json({message:"Successfully updated profilePic",success:true});
    } catch (e) {
        next(e);
    }
}

export async function requestUserIdentity(req, res,next) {
    try {
        const { msgId } = req.body;
        await userService.requestUserIdentity(msgId);
        res.status(200).json({message:"Identity request submitted successfully",success:true});
    } catch (e) {
        next(e);
    }
}

export async function getUserRequests(req, res, next) {
    try {
        const userId = req.body.userId || req.user.id;

        const requests = await userService.getUserRequests(userId);

        res.status(200).json({
            requests,
            success: true
        });

    } catch (e) {
        next(e);
    }
}

export async function sendIdentityRequestNotification(req, res, next) {
    try {
        const response = req.body;
        const request = await userService.sendIdentityRequestNotification(response);
        res.status(200).json({message:"Identity request notification sent successfully",success:true, request: request});
    } catch (e) {
        next(e);
    }
}