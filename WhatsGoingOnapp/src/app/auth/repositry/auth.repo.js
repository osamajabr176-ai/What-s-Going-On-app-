import { User } from "../../user/model/user.model.js";
export async function checkUserExistance(email) {
    const user = await User.findOne({email : email});
    return user;
}

export async function createUser(userData) {
    return await User.create(userData);
}
