import axios from "axios";
import {Eventing} from "../Eventing";

interface UserProps {
  id?: number,
  name?: string,
  age?: number
}

// option #3
// Only accept properties into constructor
// Hard code dependencies as class properties

export class User {
  events: Eventing = new Eventing();

  constructor(private data: UserProps) { }

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void{
    // @ts-ignore
    Object.assign(this.data, update);
  }



  fetch():void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response) => {
        this.set(response.data)
      })
  }

  save(): void {
    const id = this.get('id');

    if (id) {
      // put
      axios.put(`http://localhost:3000/users/${id}`, this.data)

    } else {
      // post
      axios.post('http://localhost:3000/users', this.data)

    }
  }





}
