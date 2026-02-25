import {z} from 'zod'

export const languageSchema = z.object({
    name:z.string(),
    judge0Id:z.number()
})