import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = ({errorData, rf}) => {
   let {status: statsuErr, message: messageErr, type: typeErr, error: err} = (errorData.response.data);

   let navigate = useNavigate();

   console.log(errorData.response.data);

  return (
    <section className="errPageSec">
        <div className="EachErr">
            <div className="errLabel">Status Code:</div>
            <div className="labelErrData">{statsuErr || errorData.response.data.status_code}</div>
        </div>
        <div className="EachErr">
            <div className="errLabel">Reason:</div>
            <div className="labelErrData">{messageErr || errorData.response.data.status_message}</div>
        </div>
        <div className="EachErr">
            <div className="errLabel">Type:</div>
            <div className="labelErrData">{typeErr || "unknown"}</div>
        </div>
        <div className="EachErr">
            <div className="errLabel">Error:</div>
            <div className="labelErrData">{err != null ? err : "unknown"}</div>
        </div>

        <div className="reset_refreshBtn">
            <button className='btn_home' onClick={() => navigate("/")} >Back to home</button>
            <button className='btn_refresh' onClick={() => navigate(`${rf}`)} >Refresh</button>
        </div>
    </section>
  )
}

export default Error