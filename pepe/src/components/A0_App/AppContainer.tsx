import {App} from "./App";
import {BrowserRouter} from "react-router-dom";
import {createContext} from "react";
import {RootStore, store} from "../../store/RootStore";

export const StoreContext = createContext<RootStore>({} as RootStore)

export const AppContainer = () => {
    return (
        <BrowserRouter>
            <StoreContext.Provider value={store}>
                <App/>
            </StoreContext.Provider>
        </BrowserRouter>

    )
}