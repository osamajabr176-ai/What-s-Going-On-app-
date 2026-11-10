import {z} from 'zod'

export const registerDTO = z.object({
    email: z.email({message : 'invalid formate for email'}).toLowerCase().trim(),
    name: z.string().min(3).max(20).trim(),
    password: z.string().min(8).max(20).trim(),
    dob:z.date().optional(),
    gender:z.enum(['male','female']).optional()


})//.strict()
export const verifyAccountDTO = z.object({
    email: z.email().toLowerCase().trim(),
    code: z.string().length(6).trim(),
})

export const LoginDTO = z.object({
    email: z.email().toLowerCase().trim(),
    password: z.string().min(6).max(20).trim()

})

export const resetPasswordDTO = z.object({
    email: z.email().toLowerCase().trim(),
    code: z.string().length(8).trim(),
    newPassword: z.string().min(6).max(20).trim(),
})

export const sendOtpDTO = z.object({
    email: z.email().toLowerCase().trim(),
})