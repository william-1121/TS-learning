import {Model} from "./Model";
import {Attributes} from "./Attributes";
import {Eventing} from "./Eventing";
import {ApiSync} from "./ApiSync";
import {Collection} from "./Collection";
export interface UserProps {
  id?: number,
  name?: string,
  age?: number
}
const rootUrl = 'http://localhost:3000/users';

// use inheritance not composition to refactor
export class User extends Model<UserProps>{

  static buildUser(attrs: UserProps): User{
    return new User(
      new Attributes<UserProps>(attrs),
      new ApiSync(rootUrl),
      new Eventing(),
    )
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,
      (json:UserProps) => User.buildUser(json)
    )
  }

  setRandomAge() {
    const age = Math.round(Math.random() * 100);
    this.set({ age })
  }
}

/*
const user = User.buildUser({name: 'GY', age: 12});
user.get('id');
user.fetch();

*/


