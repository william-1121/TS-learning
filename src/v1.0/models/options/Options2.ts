import axios from "axios";
import { Eventing } from "../Eventing";

interface UserProps {
  id?: number,
  name?: string,
  age?: number
}

type CallBack = () => void

// option #2: Only accept dependencies into constructor
//    Define a static class method to preconfigure
//    User and assign properties afterwards

export class User {
  events: { [key: string]: CallBack[] } = {}

  static fromData(data: UserProps): User {
    const user =  new User(new Eventing());
    user.set(data);
    return user
  }


  constructor(private event: Eventing) { }
  private data: UserProps

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
