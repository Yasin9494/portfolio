import {AppStore} from "./AppStore";
import {useContext} from "react";
import {StoreContext} from "../components/A0_App/AppContainer";


export class RootStore {
    appStore: AppStore;


    constructor() {
        this.appStore = new AppStore();
    }
}

export const store = new RootStore()

export const useStore = (): RootStore => useContext(StoreContext)
