import {Eventing} from "./Eventing";
import {Sync} from "./Sync";
import {Attributes} from "./Attributes";
export interface UserProps {
  id?: number,
  name?: string,
  age?: number
}
const rootUrl = 'http://localhost:3000/users';

// v2.0
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(private attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  // just return a reference to the events on method,
  // not to call a function(
  //  whenever we use getter, we no longer make use of those parentheses[括弧]
  // )
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }

  set(update: UserProps) {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch() {
    const id = this.attributes.get('id')
    if (typeof id !== "number") {
      throw new Error('Can not fetch without an id')
    }
    this.sync.fetch(id).then((res): void => {
      this.attributes.set(res.data);
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then(()=>{
        this.trigger('save');
      });
  }

}

/*const user =  new User({name: 'William', age: 13})
user.on('change', () => {
  console.log('Changed!')
})
user.get('name')*/
