import React from "react";
import Con from "./connection";


// eg connection(method , link , checklogin (true/false), data)

const list = () => {
  
    const BASE_URL = "https://itm.comradehub.com/api"

    const Login = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/login", null, data);
        return result;
    }
    const Signup = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/signup", null, data);
        return result;
    }
    const ShowProfile = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/showProfileEdit", null, data);
        return result;
    }
    const SaveProfile = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/editProfile", null, data);
        return result;
    }
    const MainProfile = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/mainProfile", null, data);
        return result;
    }
    const ImageUpload = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/imagesUpload", null, data);
        return result;
    }
    const HomeProfile = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/home", null, data);
        return result;
    }
    const sent = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/sentReq", null, data);
        return result;
    }
    const deleteReq = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/deleteReq", null, data);
        return result;
    }
    const MessageList = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/getMessageList", null, data);
        return result;
    }
    const ChatList = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/chatFetch", null, data);
        return result;
    }
    const FriendsList = async (data: any) => {
        const result = await Con("POST", ""+BASE_URL+"/friendList", null, data);
        return result;
    }
    return {
        Login,
        Signup,
        ShowProfile,
        SaveProfile,
        MainProfile,
        ImageUpload,
        HomeProfile,
        sent,
        deleteReq,
        MessageList,
        ChatList,
        FriendsList
    }
}

export default list;