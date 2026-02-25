import {z} from 'zod'

export const signupSchema = z.object({
    email:z.email(),
    name:z.string().optional(),
    password:z.string(),
    role:z.enum(['User','Admin']).default('User').optional(),
})
.strict()



export const loginSchema = z.object({
    email:z.email(),
    password:z.string(),
})
.strict()