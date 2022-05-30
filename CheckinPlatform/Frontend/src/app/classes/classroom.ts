import { Feature } from "./feature";

export class Classroom{
    public id: number;
    public name: string;
    public location: string;
    public capacity: number;
    public features: Feature[];

    public constructor(id: number, name: string, location: string, capacity: number, features: Feature[]){
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.features = features;
    }
}
