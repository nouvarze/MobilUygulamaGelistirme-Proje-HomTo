import {observable} from 'mobx';

class UserStore{
    @observable email='';
}

export default new UserStore();