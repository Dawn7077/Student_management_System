import {IBaseRepository} from './IBaseRepository'
import {Student} from '../models/AppModels'
import {StudentModel} from '../models/MongoSchema'

export class StudentRepository implements IBaseRepository<Student>{
    private mapTranslate(doc:any):Student{
        return new Student(
            doc._id.toString(),
            doc.name,
            doc.email,
            doc.course
        )
    }
    //   Property 'create' in type 'StudentRepository' is not assignable to the same property in base type 'IBaseRepository<Student>'.
    //   Type '(item: { name: string; email: string; course: string; }) => Promise<Student>' is not assignable to type '(item: Student) => Promise<Student>'.
    //   Types of parameters 'item' and 'item' are incompatible.
    //   Type 'Student' is not assignable to type '{ name: string; email: string; course: string; }'.
    //   Property 'email' is private in type 'Student' but not in type '{ name: string; email: string; course: string; }'.
    // public async create (item:{name:string,email:string,course:string}):Promise<Student>{ //please tell me why Promise<Student> is used here




    public async create (item:any):Promise<Student>{ //any is used here because the Student class has private properties and the create method in the repository should accept a plain object with the necessary fields to create a Student document in the database. The repository will then handle the mapping from this plain object to the Student instance that is returned. This allows for more flexibility in how the create method is called, without exposing the internal structure of the Student class.
        const saveDoc = new StudentModel(item)

        return this.mapTranslate(await saveDoc.save())
    }
    
    public async findById(id:string):Promise<Student | null>{
        const doc = await StudentModel.findById(id)
        if(!doc) return null
        return this.mapTranslate(doc)
    }

    public async findAll():Promise<Student[]>{
        const  docs = await StudentModel.find()
        return docs.map((doc:any)=> this.mapTranslate(doc))
    }

    public async getStudentByName(name:string):Promise<Student | null>{
        const doc = await StudentModel.findOne({
            name:name
        })

        if(!doc) return null
        return this.mapTranslate(doc)
    }

    public async findByName(name:string):Promise<Student | null>{
        const doc = await StudentModel.findOne({
            name:name
        })
        if(!doc) return null
        return this.mapTranslate(doc)
    }
}