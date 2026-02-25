import express, { Request,  Response } from 'express'
import { problemSchema } from '../zodSchema/problemSchema.js'
import { prisma } from '../lib/prisma.js'

const router = express.Router()

router.post('/',async(req:Request,res:Response)=>{
    const validatedData = problemSchema.safeParse(req.body)
    if(!validatedData.success){
        return res.status(400).json({
            message:'invalid inputs'
        })
    }
    const {description,slug,title,difficulty,hidden} = validatedData.data
    const problem = await prisma.problem.create({
        data:{
            description,
            slug,
            title,
            hidden,
            difficulty
        }
    })
    res.status(201).json({
        problem
    })
})

export default router