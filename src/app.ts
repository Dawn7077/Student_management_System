import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import path from 'path'

import {StudentRepository} from './repositories/StudentRepository'
import {StudentService} from './services/student_Services'
import {AdminRepository} from './repositories/AdminRepository'
import {AdminService} from './services/admin_Services'

const app = express();
app.use(express.json());

const AdminRepo = new AdminRepository()
const adminService = new AdminService(AdminRepo)

mongoose.connect('mongodb://localhost:27020/studentManagement')
 .then(()=> console.log('Connected to MongoDB'))
 .catch(err => console.error('Failed to connect to MongoDB', err))

const StudentRepo = new StudentRepository()
const studentService  = new StudentService(StudentRepo)

app.post('/student',async (req:Request,res:Response)=>{
    try{
        const data = req.body
        const newStudent = await studentService.createNewStudent(data)
        res.status(201).json({success:true, student:newStudent})
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Failed to create student."
        res.status(400).json({success:false,message: errorMessage})
    }
     
})

app.get('/students/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const studentDetails = await studentService.getStudentByName(name)

        res.status(200).json({success:true, studentDetails})
    }catch(err){
        res.status(404).json({success:false,message: "Student not found."})
    }
})

app.get('/studentsAll',async(req,res)=>{
    try{
        const allStudents = await studentService.getAllStudents()
        res.status(200).json({success:true, students:allStudents})
    }catch(err){
        res.status(500).json({success:false,message: "An error occurred while fetching students."})
    }
})

app.get('/',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})


app.post('/admin',async(req,res)=>{
    try{
        console.log("Received admin creation request with data:", req.body);
        const data = req.body
        const newAdmin = await adminService.createNewAdmin(data)
        res.status(201).json({success:true, admin:newAdmin})
    }
    catch(err){
        const errorMessage = err instanceof Error ? err.message : "Failed to create admin."
        console.error("Error creating admin:", errorMessage);
        res.status(400).json({success:false,message: errorMessage})
    }
})

app.get('/admin/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const adminDetails = await adminService.getAdminByName(name)
        res.status(200).json({success:true, adminDetails})
    }
    catch(err){
        res.status(404).json({success:false,message: "Admin not found."})
    }
})

app.get('/adminsAll',async(req,res)=>{
    try{
        const allAdmins =await adminService.getAllAdmins()
        res.status(200).json({success:true, admins:allAdmins})
    }
    catch(err){
        res.status(500).json({success:false,message: "An error occurred while fetching admins."})
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} \n http://localhost:${PORT}`)
})
