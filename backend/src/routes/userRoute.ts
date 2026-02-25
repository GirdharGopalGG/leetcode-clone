import express,{  Request,  Response }  from 'express'
import { loginSchema, signupSchema } from '../zodSchema/userSchema.js'
import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/signup',async(req:Request,res:Response)=>{
    const validatedData = signupSchema.safeParse(req.body)
    if(!validatedData.success){
        return res.status(400).json({
            message:'invalid inputs'
        })
    }
    const {email,password,role,name} = validatedData.data

    const emailExists = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(emailExists){
        return res.status(400).json({
            message:'email already exists'
        })
    }
    const hashedPassword = await bcrypt.hash(password, 8)
    
   await prisma.user.create({
    data:{
        email,
        password:hashedPassword,
        name,
        role
        
    }
   })
    res.status(201).json({
        message:'user created'
    })
})

router.post('/login',async(req:Request, res:Response)=>{
    const validatedData = loginSchema.safeParse(req.body)
    if(!validatedData.success){
        return res.status(400).json({
            message:'invalid inputs'
        })
    }
    const {email,password} = validatedData.data

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return res.status(400).json({
            message:'Invalid credentials'
        })
    }
    const passwordMatch = await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        return res.status(400).json({
            message:'Invalid credentials'
        })
    }

    const token = jwt.sign({
        email,
        password
    },process.env.JWT_SECRET as string)

    res.status(200).json({
        token
    })
})


export default router