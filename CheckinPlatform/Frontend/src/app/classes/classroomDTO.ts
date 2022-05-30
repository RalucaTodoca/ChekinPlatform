export class ClassroomDTO{
    public id: number;
    public name: string;
    public location: string;
    public capacity: number;

    public constructor(id: number, name: string, location: string, capacity: number){
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
    }
}