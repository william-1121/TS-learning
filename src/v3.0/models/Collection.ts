import {User, UserProps} from "./User";
import {Eventing} from "./Eventing";
import axios from "axios";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    public deserialize: (json: K) => T
    ) {
  }

  // 注意这里不可使用缩短语句
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    axios.get(this.rootUrl).then((res)=>{
      res.data.forEach((value: K)=>{
        //const user = User.buildUser(value)
        this.models.push(this.deserialize(value))
      })
      this.events.trigger('change')
    })
  }

}
