export class CourseDTO{
    public id: number;
    public name: string;
    public year: number;
    public section: string;

    public constructor(id: number, name: string, year: number, section: string){
        this.id = id;
        this.name = name;
        this.year = year;
        this.section = section;
    }
}