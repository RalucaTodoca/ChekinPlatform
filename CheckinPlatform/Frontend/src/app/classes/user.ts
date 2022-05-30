export class User{
    id: number;
    firstName: string;
    lastName: string;
    year: number;
    department: string;
    section: string;
    role: string;

    constructor(id: number, firstName: string, lastName: string, year: number, 
        department: string, section: string, role: string){
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.year = year;
            this.department = department;
            this.section = section;
            this.role = role;
        }

}