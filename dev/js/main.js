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
    async checkLogin(){
        const _ = this;
        let req = await _.xhr.fetch('JSON',{
            path : '/front/components/user/assets/checkLogin.php',
            data : null
        });
        _.role = req['role'];
        if(req['role'] === 'guest'){
            MainEventBus.trigger('User','enteredAsGuest',req);
        } else {
            MainEventBus.trigger('User','enteredAsUser',req)
        }
    }

}
let a = new User;
let eventBus = new EventBus();
eventBus.add('click',a.loginAsGuest);
eventBus.trigger('click');