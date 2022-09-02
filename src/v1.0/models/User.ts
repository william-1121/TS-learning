import {Eventing} from "./Eventing";
import {Sync} from "./Sync";
import {Attributes} from "./Attributes";

export interface UserProps {
  id?: number,
  name?: string,
  age?: number
}

const rootUrl = 'http://localhost:3000/users';


// v1.0模块化，通过中间商
// const user({id: 2, name: 'GSD', age: 45})
// user.attributes.get('name')
// user.events.on('change', () => { console.log(123) })
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(private attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

}
