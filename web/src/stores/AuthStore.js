import {action, flow, observable} from "mobx";
import axios from "axios";

export const State = {
    Authenticated: 'Authenticated',
    NotAuthenticated: 'NotAuthenticated',
    Pending: 'Pending',
    Failed: 'Failed',
    SignupPending: 'SignupPending',
    SignupFailed: 'SignupFailed'
};

export const LocalStorageTokenKey = '_BASKITOP_AUTHENTICATION_TOKEN_';


const EmptySignup = {
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


const EmptyLogin = {
    id: '',
    password: '',
};

const EmptyUser = {
    id: '',
    name: '',
    type: '',
    createdDatetime: '',
    updatedDatetime: '',
};

export default class AuthStore {
    @observable login = Object.assign({}, EmptyLogin);
    @observable loginState = State.NotAuthenticated;
    @observable loginToken = '';
    @observable loginUser = Object.assign({}, EmptyUser);

    @action changeLoginId = (id) => {
        this.login.id = id;
    };

    @action changeLoginPassword = (password) => {
        this.login.password = password;
    };

    @action invalidateLogin = () => {
        this.login = Object.assign({}, EmptyLogin);
        this.loginState = State.NotAuthenticated;
        this.loginToken = '';
        this.loginUser = Object.assign({}, EmptyUser);
    };



    doSignup = flow(function* doSignup(callback, callback_failed) {
        this.loginState = State.SignupPending;

        try {
            const response = yield axios.post('/api/v1/authentications/signup', EmptySignup);
            if (response.status === 200) {
                this.loginState = State.NotAuthenticated;
                callback();
            }
        } catch (e) {
            this.loginState = State.SignupFailed;
            this.loginToken = '';
            callback_failed();
        }
    });


    doLogin = flow(function* doLogin() {
        this.loginState = State.Pending;

        try {
            const param = this.login;
            const response = yield axios.post('/api/v1/authentications/signin', param);
            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem(LocalStorageTokenKey, token);

            console.log('doLogin');
            console.log(this);

            this.loginState = State.Authenticated;
            this.loginToken = token;
            this.loginUser = user;
        } catch (e) {
            this.loginState = State.Failed;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        }
    });

    checkLogin = flow(function* checkLogin() {
        const token = localStorage.getItem(LocalStorageTokenKey);

        if(token) {
            try {
                const response = yield axios.get('/api/v1/authentications/signcheck');
                const token = response.data.token;
                const user = response.data.user;

                this.loginState = State.Authenticated;
                this.loginToken = token;
                this.loginUser = user;
            } catch(e) {
                this.loginState = State.NotAuthenticated;
                this.loginToken = '';
                this.loginUser = Object.assign({}, EmptyUser);
            }
        }
    });

    doLogout = flow(function* doLogout() {
        localStorage.removeItem(LocalStorageTokenKey);

        try {
            yield axios.post('/api/v1/authentications/signout');

            console.log(this);
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        } catch(e) {
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        }
    });
}