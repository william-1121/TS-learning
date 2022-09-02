export class Attributes<T> {
  constructor(private data: T) {
  }

  //get(propName: string): string | number {
  //  return this.data[propName];
  //}

  //get<K extends keyof T>(key: K) {
  //  return this.data[key]
  //}
  get = <K extends keyof T>(key: K) => {
    return this.data[key]
  }
  set(update: T): void{
    // @ts-ignore
    Object.assign(this.data, update);
  }
  getAll = (): T => {
    return this.data;
  }
}

/*const attrs = new Attributes<UserProps>({
  id: 5,
  age: 20,
  name: 'WAS'
});
const name = attrs.get('name');*/
