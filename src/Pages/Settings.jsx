import React, { useState} from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Settings = () => {

  let [inpState, setInp] = useState({
    name: "",
    username: "", 
    email: "", 
    password: "",
    confirm: "",
    avatar: ""
  });

  const [err, setErr] = useState({
    nameErr: "",
    emailErr: "",
    userErr: "",
    passErr: ""
  });


  let navigate = useNavigate();
  let { logOutFunc, hamCloseFunc, refz } = useOutletContext();

  let userData = JSON.parse(localStorage.getItem("signedUser")) || [];

  function encodeImgFile(e){
    let file = e.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInp((oldVal) => {
        return {...oldVal, avatar: reader.result}
      })
    }
  }

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
      localStorage.setItem("signedUser", JSON.stringify(inpState));
      refz()
    }

  }

  return (
   <section className="userSettings">

      <div className="update_head">Update User Details</div>

      <div className="midSett">

        <div className="avatar">
          <label htmlFor="avatarFile">
            <div className="avatarBox">
            <div className="avatarCont">
              <img src={inpState.avatar == "" ? userData.avatar : inpState.avatar} alt="" />
            </div>
          </div>
          </label>
          
          <input name='avatar' id='avatarFile' type="file" onChange={(e) => encodeImgFile(e.target)} />
        </div>

        <div className="change_dets">
          <label htmlFor="name">Name</label>
          <input name='name' type="text" id='name' value={inpState.name == "" ? userData.name : inpState.name} onChange={(e) => setInp((oldVal) => {
            return {...oldVal, [e.target.name]: e.target.value}
          })} />
          {err.nameErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.nameErr}</span> }
        </div>

        <div className="change_dets">
          <label htmlFor="email">Email</label>
          <input name='email' type="email" id='email' value={inpState.email == "" ? userData.email : inpState.email} onChange={(e) => setInp((oldVal) => {
            return {...oldVal, [e.target.name]: e.target.value}
          })} />
          {err.emailErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.emailErr}</span> }
        </div>

        <div className="change_dets">
          <label htmlFor="user">Username</label>
          <input name='username' type="text" id='user' value={inpState.username == "" ? userData.username : inpState.username} onChange={(e) => setInp((oldVal) => {
            return {...oldVal, [e.target.name]: e.target.value}
          })} />
          {err.userErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.userErr}</span> }
        </div>

        <div className="change_dets">
          <label htmlFor="pass">Password</label>
          <input name='password' type="password" id='pass' value={inpState.password == "" ? userData.password : inpState.password} onChange={(e) => setInp((oldVal) => {
            return {...oldVal, [e.target.name]: e.target.value}
          })} />
          {err.passErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.passErr}</span> }
        </div>

        <div className="change_dets">
          <label htmlFor="confirm">Confirm Password</label>
          <input name='confirm' type="text" id='confirm' value={inpState.confirm == "" ? userData.confirm : inpState.confirm} onChange={(e) => setInp((oldVal) => {
            return {...oldVal, [e.target.name]: e.target.value}
          })} />
          {err.passErr != "" && <span className="errTag" style={{color: "red", fontSize: "13px", fontWeight: "700"}} >{err.passErr}</span> }
        </div>

        <button id='subMidSetz' disabled={inpState.password != inpState.confirm} onClick={() => {
          setErr(() => {
            return {
              nameErr: "",
              emailErr: "",
              userErr: "",
              passErr: ""
            }
          })

          testInpput(inpState)
        }}>Save Changes</button>

      </div>

      <div className="logOutBtn">
        <div className="logOut_Head">Log Out</div>
        <div className="z_btn">
          <button
            onClick={() => {
              logOutFunc();
              hamCloseFunc();
              localStorage.removeItem("isLogged");
              navigate("/");
            }}
          >Log Out</button>
        </div>
      </div>
   </section>
  )
}

export default Settings