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
    });

    const [err, setErr] = useState({
        nameErr: "",
        emailErr: "",
        userErr: "",
        passErr: ""
    });

    const myContextFunc = useOutletContext();

    let [param, setParam] = useSearchParams();

    let navTo = param.get("navTo");

    let navigate = useNavigate();

    let nameRegex = /[a-zA-Z]{1,}\s*[a-zA-Z]*\s*[a-zA-Z]*$/gi;
    let emailRegex = /^[a-zA-Z]+[0-9]*@{1}[a-z]{2,}\.{1}[a-zA-Z]{2,5}$/gi;
    let usernameRegex = /^[a-zA-Z]{3,}[0-9]*[$#]*[^-\/\\.%*()!><?&+=]$/gi;
    let passwordRegex = /[a-zA-Z0-9@#&$!]{6,10}$/gi;

    const testInpput = (obj) => {
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
        }else{
            localStorage.setItem("signedUser", JSON.stringify(inputState));
            let returnLogged = {
                isLogged: true,
                timeDate: new Date().toString()
            }
            myContextFunc();
            localStorage.setItem("isLogged", JSON.stringify(returnLogged));
            navigate(`${navTo != undefined ? `/${navTo}` : '/'}`);
        }

    }

    console.log(err);

  return (
    <div className="loginForm">
        <form replace="true" onSubmit={(e) => e.preventDefault()} action="post" className="userForm">

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

            <button disabled={inputState.password != inputState.confirm} onClick={() => {
                setErr(() => {
                    return { nameErr: "",
                    emailErr: "",
                    userErr: "",
                    passErr: ""}
                })
                testInpput(inputState)
            }}>Test</button>

        </form>
    </div>
  )
}

export default SignUp