import React from 'react'

const Kist = ({data, func, pageNo}) => {
  return (
    <li style={pageNo == data ? {color: "green", borderColor: "green"} : {}} onClick={() => func("page",data)}>{data}</li>
  )
}

export default Kist