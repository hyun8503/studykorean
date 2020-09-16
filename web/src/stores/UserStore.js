import {action, flow, observable} from "mobx";
import axios from "axios";


const newUser = {
    id: '',
    password: '',
    name: '',
    email: '',
    country: '',
    city:'',
    userLanguage:'',
    selectedLanguage:'',
    type: '',
    createdDatetime: '',
    updatedDatetime: '',
};


export default class UserStore {

    @observable addUser = Object.assign({}, newUser)

    @action changeId = (id) => {this.addUser.id = id}
    @action changePassword = (password) => {this.addUser.password = password}
    @action changeName = (name) => {this.addUser.name = name}

    signUp = flow(function* signUp(){
        const param = this.addUser;
        const response = yield axios.post('/api/v1/authentications/signup', param);


    })
}