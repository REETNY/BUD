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
    })

    let myContextFunc = useOutletContext();

    let navigate = useNavigate();
    let [param, setParam] = useSearchParams();
    let errMsg = param.get("message");
    let navTo = param.get("navTo");

    let checkUserDets = (obj) => {
        let dets = JSON.parse(localStorage.getItem("signedUser")) || {};
        if(dets.username == obj.username && dets.password == obj.password){
            let returnLogged = {
                isLogged: true,
                timeDate: new Date().toString()
            }
            myContextFunc()
            localStorage.setItem("isLogged", JSON.stringify(returnLogged));
            navigate(navTo != undefined ? `/${navTo}` : `/`)
        }else{
            setErr(() => {
                return {loginErr: "No user with such combination found!"}
            })
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

            <button onClick={() => checkUserDets(inpState)}>Sigin</button>
        </form>

        <div className="haveAcc">
            don't have an account <Link to={navTo != undefined ? `/signup?navTo=${navTo}` : `/signup`} >SignUp</Link>
        </div>
    </div>
  )
}

export default Login