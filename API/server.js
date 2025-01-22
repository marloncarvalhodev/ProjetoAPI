import express, { request, response } from 'express'

import cors from 'cors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios',async(request,response)=>{
   await prisma.user.create({
        data:{
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })
    
    response.status(201).json(request.body)
})

app.put('/usuarios/:id',async(request,response)=>{
    await prisma.user.update({
        where:{
            id:
            request.params.id
        },
         data:{
             email: request.body.email,
             name: request.body.name,
             age: request.body.age
         }
     })
     
     response.status(200).json(request.body)
 })
 
app.get('/usuarios',async(request,response)=>{

    let users=[]
    if(request.query){
        users=await prisma.user.findMany({
            where:{
                name:request.query.name,
                email:request.query.email,
                age:request.query.age
            }
        })
        
    }else{ users=await prisma.user.findMany()
    }
    response.status(200).json(users)
})

app.delete('/usuarios/:id',async (request,response)=>{
    await prisma.user.delete({
        where:{
            id: request.params.id,
        },
    })
    response.status(200).json({message:'Usuário deletado com sucesso!'})
})

app.listen(3000)