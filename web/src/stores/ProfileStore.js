import {action, observable} from "mobx";

const countryCode = [
    { country: 'China', code: 'CN' },
    { country: 'Taiwan', code: 'TW' },
    { country: 'HongKong', code: 'HK' },
    { country: 'United States', code: 'US' },
];


export default class ProfileStore {
    @observable isProfileDialog = false;
    @observable teacherLessonList = [];

    @action changeProfileDialog = (value) => this.isProfileDialog = value;



}