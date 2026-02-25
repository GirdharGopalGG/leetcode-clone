import {z} from 'zod'

export const problemSchema = z.object({
    title:z.string(),
    description:z.string(),
    hidden:z.boolean().optional(),
    slug:z.string(),
    difficulty:z.enum(['Easy','Medium','Hard']).default('Easy').optional()

}).strict()