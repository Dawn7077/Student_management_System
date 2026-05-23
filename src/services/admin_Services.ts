import {IBaseRepository} from '../repositories/IBaseRepository'
import {Admin} from '../models/AppModels'

export class AdminService {
    private adminRepository : IBaseRepository<Admin>

    constructor(adminRepo:IBaseRepository<Admin>){
        this.adminRepository = adminRepo
    }

    public async createNewAdmin(admin:{name:string,email:string,access:string}):Promise<Admin>{
        if(!admin.name || !admin.email || !admin.access || !admin.email.includes('@')){
            throw new Error("Invalid admin data provided. Missing required fields or invalid email format.");
        }
        return await this.adminRepository.create(admin)
    }

    public async getAdminById(id:string):Promise<string> {
        const admin = await this.adminRepository.findById(id)
        if(!admin){
            throw new Error(`Admin with id ${id} not found.`)
        }
        return admin.getRoleDetails();
    }

    public async getAllAdmins():Promise<string[]>{
        const admins = await this.adminRepository.findAll()
        return admins.map(admin => admin.getRoleDetails())
    }

    public async getAdminByName(name:string):Promise<string>{
        const admin = await this.adminRepository.findByName(name)   
        if(!admin){
            throw new Error(`Admin with name ${name} not found.`)
        }
        return admin.getRoleDetails();
    }

}
 