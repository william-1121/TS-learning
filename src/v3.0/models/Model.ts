import {AxiosPromise} from "axios";

interface HasId {
  id?: number
}

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface ApiSync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}


export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: ApiSync<T>,
    private events: Events
  ) { }

  /*注意写法，和构造函数的执行顺序*/
  //get on() {return this.events.on;}
  on = this.events.on;
  //get trigger() {return this.events.trigger;}
  trigger = this.events.trigger;
  //get get() {return this.attributes.get;}
  get = this.attributes.get;

  set(update: T) {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch() {
    const id = this.attributes.get('id')
    if (typeof id !== 'number') {
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


// 了解一下，执行顺序
class Engine {
  start() {
    console.log('Started');
  }
}
class Car {
  //engine: Engine;
  //constructor() {
  //  this.engine = new Engine(); // ②
  //}
  //start = this.engine.start; //① 会在②之前被执行

  constructor(private engine: Engine) { }
  start = this.engine.start;
}
