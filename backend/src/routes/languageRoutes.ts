import express, { Request, Response } from 'express'
import { languageSchema } from '../zodSchema/languageSchema.js'
import { prisma } from '../lib/prisma.js'

const router = express.Router()
router.post('/',async(req:Request,res:Response)=>{
    const validatedData = languageSchema.safeParse(req.body)
    if(!validatedData.success){
        return res.status(400).json({
            message:'invalid inputs'
        })
    }
    const {name, judge0Id} = validatedData.data
    const language = await prisma.language.create({
        data:{
            name,
            judge0Id,
        }
    })
    res.status(201).json({
        
        language
    })
})

export default router