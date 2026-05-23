import {IBaseRepository} from './IBaseRepository'
import {AdminModel} from '../models/MongoSchema'
import {Admin} from '../models/AppModels'

export class AdminRepository implements IBaseRepository<Admin>{
    private mapTranslate(doc:any):Admin{
        return new Admin(
            doc._id.toString(),
            doc.name,
            doc.email,
            doc.access
        )
    }

    public async create(item:any):Promise<Admin>{
        const saveDoc = new AdminModel(item)
        return this.mapTranslate(await saveDoc.save())
    }

    public async findById(id:string):Promise<Admin | null>{
        const doc = await AdminModel.findById(id)
        if(!doc) return null
        return this.mapTranslate(doc)
    }

    public async findAll():Promise<Admin[]>{
        const  docs = await AdminModel.find()
        return docs.map((doc:any)=> this.mapTranslate(doc))
    }

    public async getAdminByName(name:string):Promise<Admin | null>{
        const doc = await AdminModel.findOne({
            name:name
    })
        if(!doc) return null
        return this.mapTranslate(doc)
    }

    public async findByName(name:string):Promise<Admin | null>{
        const doc  = await AdminModel.findOne({
            name:name
        })
        if(!doc) return null
        return this.mapTranslate(doc)
    }
         
}