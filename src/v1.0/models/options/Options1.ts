import axios from "axios";
import { Eventing } from "../Eventing";

interface UserProps {
  id?: number,
  name?: string,
  age?: number
}

type CallBack = () => void

// option #1: Accept dependencies as second constructor argument
export class User {
  events: { [key: string]: CallBack[] } = {}

  constructor(private data: UserProps, private event: Eventing) { }

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

//const user =  new User({name: 'zy'}, new Eventing())
