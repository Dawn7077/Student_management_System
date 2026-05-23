import {Schema,model } from 'mongoose';

const StudentSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    course:{type:String,required:true}
})

const AdminSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    access:{type:String,required:true}
})

export const StudentModel = model('Student',StudentSchema)
export const AdminModel = model('Admin',AdminSchema)