interface IRole{
    getRoleDetails():string;
}

export abstract class SystemUser implements IRole{
    private email: string;
    public name:string;
    public readonly id:string

    constructor(id:string,name:string, email:string){
        this.id = id;
        this.name =name;
        this.email = email;
    }

    public getEmail():string{
        return this.email;
    }
    abstract getRoleDetails(): string;
}
export class Student extends SystemUser {
    public course:string;

    constructor(id:string,name:string,email:string,course:string){
        super(id,name,email);
        this.course = course;
    }
    public getRoleDetails(): string {
        return `Student Name: ${this.name}, Course: ${this.course}`;
    }
}

export class Admin extends SystemUser{
    public access:string;
    constructor(id:string,name:string,email:string,access:string){
        super(id,name,email)
        this.access = access;
    }

    getRoleDetails(): string {
        return `Admin Name: ${this.name}, Access: ${this.access}`;
    }
}