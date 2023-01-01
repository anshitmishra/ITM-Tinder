import React from "react";
import Con from "./connection";


// eg connection(method , link , checklogin (true/false), data)

const list = () => {
  


    const Login = async (data: any) => {
        const result = await Con("POST", "http://10.0.2.2/test/login.php", null, data);
        return result;
    }
    const Signup = async (data: any) => {
        const result = await Con("POST", "http://10.0.2.2/test/signup.php", null, data);
        return result;
    }
    const ShowProfile = async (data: any) => {
        const result = await Con("POST", "http://10.0.2.2/test/showProfile.php", null, data);
        return result;
    }
    const SaveProfile = async (data: any) => {
        const result = await Con("POST", "http://10.0.2.2/test/editProfile.php", null, data);
        return result;
    }
    const MainProfile = async (data: any) => {
        const result = await Con("POST", "http://10.0.2.2/test/mainProfile.php", null, data);
        return result;
    }
    const ImageUpload = async (data: any) => {
        const result = await Con("POST", "http://10.0.2.2/test/imagesUpload.php", null, data);
        return result;
    }
    return {
        Login,
        Signup,
        ShowProfile,
        SaveProfile,
        MainProfile,
        ImageUpload,
    }
}

export default list;