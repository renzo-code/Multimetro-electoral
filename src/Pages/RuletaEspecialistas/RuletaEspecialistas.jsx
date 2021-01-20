import React from 'react'

import { medidorEspecialista } from '../../constantes/index'

import './RuletaEspecialistas.scss'

class RuletaEspecialistas extends React.Component{
  state = {
    selectedEspecialista : 0,
    
  }

  comboBoxChange = (e) => {
    this.setState({
      [e.target.name] : JSON.parse(e.target.value)
    })
  }

  obtenerFoto = (dataIdCombo) => {
    if (!dataIdCombo) return ''
    const especialista = medidorEspecialista.find(item => item.id === dataIdCombo.id)
    return especialista ? especialista.url : '' 
  }

  render(){
    const { selectedEspecialista } = this.state
    return(
      <div className="cont-comboBox-especialista">
        <div className="select-ComboEspecialista">
          <select
            className="comboBox-segundo-servicio-promedio comboEspecialista"
            onChange={this.comboBoxChange}
            defaultValue={selectedEspecialista}
            name="selectedEspecialista"
          >
            {
              [{id: 0, date:"Seleccione un especialista"}, ...medidorEspecialista].map((item, i) => {
                return <option key={i} hidden={i === 0} value={JSON.stringify(item)}>{item.date}</option>
              })
            }
          </select>
        </div>
        {
          selectedEspecialista !== 0 &&
          (
            <div className="ruleta-especialista">
              <img className="img-ruleta-especialista" src={this.obtenerFoto(selectedEspecialista)} alt=""/>
            </div>
          )
        }
      </div>
    )
  }
}

export default RuletaEspecialistas