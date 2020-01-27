class EventBus{
    constructor(){
        const _ = this;
        _.events = {};
    }
    add(event,fn){
        const _ = this;
        if(!_.events[event]) _.events[event] = [];
        _.events[event].push(fn);
    }
    trigger(event,data=null){
        const _ = this;
        console.warn("Сработало событие: " + event);
        if(!_.events[event]) return;
        for(let i = 0; i < _.events[event].length;i++){
            console.log(_.events[event][i]);
            _.events[event][i](data);
        }
    }
    remove(event,fn){
        const _ = this;
        if(_.events[event]){
            for(let i = 0; i < _.events[event].length; i++){
                if(_.events[event][i] === fn){
                    _.events[event].splice(index(_.events[event][i]));
                }
            }
        }
    }
}
const Bus = new EventBus();
class User{
    constructor(){
        const _ = this;
        _.type = ['guest','user'];
    }
    loginAsGuest(type){
        const _ = this;
        console.log(_.type);
        if(type === _.type[0]){

        } else {
            _.loginAsUser(type);
        }
    }
    loginAsUser(type){
        const _ = this;
        if(type === _.type[1]){

        } else return;
    }
}
let a = new User;
let eventBus = new EventBus();
eventBus.add('click',a.loginAsGuest);
eventBus.trigger('click');