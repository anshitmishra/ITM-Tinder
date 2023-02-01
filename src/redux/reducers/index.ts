import { combineReducers } from "@reduxjs/toolkit";
import { UserReducer } from "./userReducer";

const rootReducer = combineReducers({
    userReducer:UserReducer
})

export type ApplicationState= ReturnType<typeof rootReducer>;
export {rootReducer};
