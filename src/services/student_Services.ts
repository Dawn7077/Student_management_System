import {IBaseRepository} from "../repositories/IBaseRepository" 
import {Student} from "../models/AppModels"

export class StudentService {
    //contsructor(private studentRepository:IBaseRepository<Student>){}   //short cut for this.studentRepository = studentRepository
    private studentRepository : IBaseRepository<Student>

    constructor(studentRepo:IBaseRepository<Student>){
        this.studentRepository = studentRepo
    }



    public async createNewStudent(student:{name:string,email:string,course:string}):Promise<Student>{ 
        if(!student.name || !student.email || !student.course || !student.email.includes('@')){
            throw new Error("Invalid student data provided. Missing required fields or invalid email format.");
        }
        return await this.studentRepository.create(student) 
    }

    public async getStudentById(id:string):Promise<string> {
        const student = await this.studentRepository.findById(id)
        if(!student){
            throw new Error(`Student with id ${id} not found.`)
        }
        return student.getRoleDetails();
    }

    public async getAllStudents():Promise<string[]>{
        // return await this.studentRepository.findAll()
        const students = await this.studentRepository.findAll()
        return students.map(student => student.getRoleDetails())
    }

    public async getStudentByName(name:string):Promise<string>{
        const student = await this.studentRepository.findByName(name)
        if(!student){
            throw new Error(`Student with name ${name} not found.`)
        }
        return student.getRoleDetails();
    }
}