import express from 'express'
import userRouter from './routes/userRoute.js'
import dsaRouter from './routes/dsaRoute.js'
import addProblemRouter from './routes/problemRoutes.js'
import addLanguageRouter from './routes/languageRoutes.js'
import addTestcaseRouter from './routes/testcaseRoute.js'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use('/api/auth',userRouter)
app.use('/api/language',addLanguageRouter)
app.use('/api/problem',addProblemRouter)
app.use('/api/testcase',addTestcaseRouter)
app.use('/api/dsa',dsaRouter)


app.listen(3000,()=>{
    console.log(`App is listening on http://localhost:3000`)
})