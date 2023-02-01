import { Dispatch } from "redux";


export interface UserModel {
    message:string,
    token:string,
    status:boolean
}


export interface LoginAction {
    readonly type : 'ON_LOGIN';
    payload:UserModel
}
export interface ErrorAction {
    readonly type : 'ON_ERROR';
    payload:any
}

export type userAction = LoginAction | ErrorAction;

export const onLoginReducer = (message:string,token:string,status:boolean) => {
    return (dispatch:Dispatch<userAction>) => {
        
        if(token){
            dispatch({
                type:'ON_LOGIN',
                payload:{
                    message:message,
                    token:token,
                    status:status
                }
            })
        }else{
            dispatch({
                type:'ON_ERROR',
                payload:"token not found"
            })
        }
        
        
    
    }

}