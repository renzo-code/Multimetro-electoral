import React from 'react'

import RuletaElectoral from '../RuletaElectoral/RuletaElectoral'

import './style.scss'

class Multimetro extends React.Component{
  state = {
    
  }

  render(){
    return(
      <div className="cont">
        <div className="container-header">
        </div>
        <h1 className="title-multimetro">Multímetro electoral</h1>
        <p className="parrafo-multimetro">
          En base a la calificación de 10 especialistas, ubicamos a los 24 partidos
          en un multimetro, siendo 0 izquierda, 5 centro y 10 derecha
        </p>
        <div className="cont-rulet">
          <RuletaElectoral/>
        </div>
        <p className="parrafo-multimetro">
          Puedes ver la calificación de cada uno de nuestros especialistas a los
          24 partidos políticos
        </p>
      </div>
    )
  }
}

export default Multimetro