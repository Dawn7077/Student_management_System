export interface IBaseRepository<T> {
    create(item:any):Promise<T>;
    findById(id:string):Promise<T | null>;
    findAll():Promise<T[]>;
    findByName(name:string):Promise<T | null>; 
}