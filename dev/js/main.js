class user {
    constructor() {
        const _ = this;
        _.type = [guest, user, superUser];
    }
    loginAsGuest(type){
        const _ = this;
        if(type === _.type[0]){

        } else {
            _.loginAsUser(type);
        }
    }
    loginAsUser(type){
        const _ = this;
        if(type === _.type[1]){

        } else {
            _.loginAsSuperUser(type);
        }
    }
    loginAsSuperUser(type){
        const _ = this;
        if(type === _.type[2]){

        }
    }
}

let list = {

};