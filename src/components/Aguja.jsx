import React from 'react'
import './style.scss'

const Aguja = ({ aguja }) => {
  return (
    <div
      className="wrapper"
      style={{
        transform: "rotate("+ aguja + "deg)"
      }}
    >
      <div className="aguja-principal">
        <div className="cabeza"></div>
        <div className="aguja"></div>
      </div>
      <div className="aguja-secundaria"></div>
    </div>
  )
}

export default Aguja
