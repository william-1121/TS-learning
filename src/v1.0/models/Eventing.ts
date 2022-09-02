type CallBack = () => void

export class Eventing {
  events: { [key: string]: CallBack[] } = {}

  on(eventName: string, callback: CallBack) {
    //this.events[eventName].push(callback);  // this.events[eventName] maybe undefined
    const handlers = this.events[eventName] || [];
    handlers.push(callback)
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handler = this.events[eventName]
    if (!handler || handler.length===0)  return;

    handler.forEach(callback => {
      callback()
    })
  }
}
