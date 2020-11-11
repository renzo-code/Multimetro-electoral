import React from 'react'
import './style.scss'

const Aguja = ({ aguja, bgColor }) => {
  return (
    <>
      <div
        className="wrapper"
        style={{
          transform: "rotate("+ aguja + "deg)"
        }}
      >
        <div className="aguja-principal">
          <div 
            style={{
              borderBottom: `8px solid ${bgColor}`
            }} 
            className="cabeza"
          ></div>
          <div 
          style={{
            backgroundColor : `${bgColor}`
          }}
          className="aguja"
          ></div>
        </div>
        <div className="aguja-secundaria"></div>
      </div>
    </>
  )
}

export default Aguja
