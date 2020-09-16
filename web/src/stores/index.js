import React from 'react';
import { default as AuthStore } from "./AuthStore";
import ProfileStore from "./ProfileStore";
import UserStore from "./UserStore";
import {MobXProviderContext} from "mobx-react";

export const stores = {
    authStore:  new AuthStore(),
    profileStore:  new ProfileStore(),
    userStore: new UserStore(),
};

export function useStores() {
    return React.useContext(MobXProviderContext);
}