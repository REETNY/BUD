import React from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams, useOutletContext } from 'react-router-dom';

const SignUp = () => {

    const [inputState, setInput] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirm: "",
        avatar: ''
    });

    const [err, setErr] = useState({
        nameErr: "",
        emailErr: "",
        userErr: "",
        passErr: ""
    });

    const [login, setLogin] = useState(false)

    let {logInFunc} = useOutletContext();

    let [param, setParam] = useSearchParams();

    let navTo = param.get("navTo");

    let navigate = useNavigate();

    let nameRegex = /[a-zA-Z]{1,}\s*[a-zA-Z]*\s*[a-zA-Z]*$/gi;
    let emailRegex = /^[a-zA-Z]+[0-9]*@{1}[a-z]{2,}\.{1}[a-zA-Z]{2,5}$/gi;
    let usernameRegex = /^[a-zA-Z]{3,}[0-9]*[$#]*[^-\/\\.%*()!><?&+=]$/gi;
    let passwordRegex = /[a-zA-Z0-9@#&$!]{6,10}$/gi;

    const delay = (val) => {
        return new Promise((resolve) => setTimeout(resolve, val));
    }

    const testInpput = async (obj) => {
         await delay(1000);
        let nameTest = nameRegex.test(obj.name);
        let emailTest = emailRegex.test(obj.email);
        let passTest = passwordRegex.test(obj.password);
        let usernameTest = usernameRegex.test(obj.username);

        if(!nameTest || !emailTest || !passTest || !usernameTest){
           setErr(() => {
            return {
                nameErr: !nameTest ? "Only Alphabetical Character allowed" : "",
                emailErr: !emailTest ? "kindly re-enter your email" : "",
                userErr: !usernameTest ? "must start with 3 [a-zA-Z] and special character allowed [$#]" : "",
                passErr: !passTest ? "allowed characters include [a-zA-Z0-9@#$&!]" : "",
            }
           })
           setLogin(false);
        }else{
            delay(3000);
            localStorage.setItem("signedUser", JSON.stringify(inputState));
            let returnLogged = {
                isLogged: true,
                timeDate: new Date().toString()
            }
            logInFunc();
            localStorage.setItem("isLogged", JSON.stringify(returnLogged));
            navigate(`${navTo != undefined ? `/${navTo}` : '/'}`);
        }

    }

    function encodeImageFileAsURL(element) {
        let file = element.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = async() => {
            setInput((oldVal) => {
                return {...oldVal, avatar: reader.result}
            })
        }
    }

  return (
    <div className="loginForm">
        <form replace="true" onSubmit={(e) => e.preventDefault()} action="post" className="userForm">

            <span className="avatarInp" style={{marginBottom: "5px", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'}}>

                <div className="chooseAvatar" style={{fontSize: "18px", fontWeight: "700", color: "white", marginBottom: "10px"}}>Choose Avatar</div>

                <label htmlFor="file" style={{width: "80px", height: "80px", border: "2px solid white", display: "block", margin: "0px auto", borderRadius: "50%"}}>
                    <div className="avatarCont" style={{width: "100%", height: "100%", position: "relative"}}>
                        <div className="avatarImgCont" style={{width: "90%", height: "90%", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", background: "#dd00f3", borderRadius: "50%"}}>
                            <img src={inputState.avatar} style={{width: "100%", height: "100%", borderRadius: "50%", objectFit: "100%"}} alt="" />
                        </div>
                    </div>
                </label>
                
                <input style={{visibility: "hidden"}} type="file" id='file' onChange={(e) => encodeImageFileAsURL(e.target)} />
                
            </span>

            <span className="formInps">
                <label htmlFor="name">Name</label>
                <input onChange={(e) => {
                    setInput((obj) => {
                        return {...obj, [e.target.name]: e.target.value}
                    })
                }} value={inputState.name} type="text" name='name' id='name' />
                {err.nameErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.nameErr}</span> }
            </span>

            <span className="formInps">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => {
                    setInput((obj) => {
                        return {...obj, [e.target.name]: e.target.value}
                    })
                }} value={inputState.email} type="email" name='email' id='email' />
                {err.emailErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.emailErr}</span> }
            </span>

            <span className="formInps">
                <label htmlFor="username">Username</label>
                <input onChange={(e) => {
                    setInput((obj) => {
                        return {...obj, [e.target.name]: e.target.value}
                    })
                }} value={inputState.username} type="text" name='username' id='username' />
                {err.userErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.userErr}</span> }
            </span>

            <span className="formInps">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => {
                    setInput((obj) => {
                        return {...obj, [e.target.name]: e.target.value}
                    })
                }} value={inputState.password} type="password" name='password' id='password' />
                {err.passErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.passErr}</span> }
            </span>

            <span className="formInps">
                <label htmlFor="confirm">Confirm Password</label>
                <input style={inputState.password != inputState.confirm ? {borderColor: "red"} : {borderColor: "green"}} onChange={(e) => {
                    setInput((obj) => {
                        return {...obj, [e.target.name]: e.target.value}
                    })
                }} value={inputState.confirm} type="text" name='confirm' id='confirm' />
                {err.passErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.passErr}</span> }
            </span>

            <button disabled={inputState.password != inputState.confirm} onClick={(e) => {
                setErr(() => {
                    return { nameErr: "",
                    emailErr: "",
                    userErr: "",
                    passErr: ""}
                })
                testInpput(inputState);
                setLogin(true);
            }} style={{height: "45px", borderRadius: "20px", border: "none", background: "#90EE90", fontSize: "17px", fontWeight: "700", color: "white", cursor: "pointer"}}>{login ? "Please Wait ..." : "Sign Up"}</button>

        </form>
    </div>
  )
}

export default SignUp