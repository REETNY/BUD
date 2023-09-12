import React from 'react';
import { useState } from 'react';
import { useSearchParams, Link, useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {

    let [inpState, setInput] = useState({
        username: "",
        password: ""
    });

    let [err, setErr] = useState({
        loginErr: ""
    });

    const [login, setLogin] = useState(false);

    let {logInFunc} = useOutletContext();

    let navigate = useNavigate();
    let [param, setParam] = useSearchParams();
    let errMsg = param.get("message");
    let navTo = param.get("navTo");

    const delay = (val) => {
        return new Promise((resolve) => setTimeout(resolve, val));
    }


    let checkUserDets = async(obj) => {
        await delay(800)
        let dets = JSON.parse(localStorage.getItem("signedUser")) || {};
        if(dets.username == obj.username && dets.password == obj.password){
            let returnLogged = {
                isLogged: true,
                timeDate: new Date().toString()
            }
            await delay(3000);
            logInFunc();
            localStorage.setItem("isLogged", JSON.stringify(returnLogged));
            navigate(navTo != undefined ? `/${navTo}` : `/`)
        }else{
            setErr(() => {
                return {loginErr: "No user with such combination found!"}
            })
            setLogin(false);
        }
    }

  return (
    <div className="loginForm">
        <form replace="true" action="post" className="userForm" onSubmit={(e) => e.preventDefault()}>

            {errMsg != undefined && <div className="errMsg" style={{color: "red", fontWeight: "800", fontSize: "17px"}}>{errMsg}</div>}

            <span className="formInps">
                <label htmlFor="username">Username</label>
                <input onChange={(e) => setInput((oldVal) => {
                    return {...oldVal, [e.target.name]: e.target.value}
                })} type="username" name='username' id='username' />
                {err.loginErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.loginErr}</span> }
            </span>

            <span className="formInps">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setInput((oldVal) => {
                    return {...oldVal, [e.target.name]: e.target.value}
                })} type="password" name='password' id='password' />
                {err.loginErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.loginErr}</span> }
            </span>

            <button onClick={() => {
                setLogin(true);
                checkUserDets(inpState)
            }} style={{height: "40px", borderRadius: "10px", background: "#dd00f3", fontSize: "17px", fontWeight: "700", letterSpacing: ".7px", color: "white", border: "none", cursor: "pointer"}}>{login ? "Signin in ..." : "Sign In"}</button>
        </form>

        <div className="haveAcc">
            don't have an account <Link to={navTo != undefined ? `/signup?navTo=${navTo}` : `/signup`} >SignUp</Link>
        </div>
    </div>
  )
}

export default Login