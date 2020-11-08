import React from 'react'
import Axios from 'axios'

import { servicioPromedio, servicioExpertos, fotosPartidos } from '../../constantes/index'

import Aguja from '../../components/Aguja'

import './RuletaElectoral.scss'

const INITIAL_VALUE = 317

class RuletaElectoral extends React.Component {
  state= {
    contentDataPromedio : [],
    agujaPromedio: INITIAL_VALUE,
    selectedPartido : 0 ,
    contentDataExpertos : [],
    agujaExpertos : INITIAL_VALUE
  }

  componentDidMount(){
    this.obtenerDatosPromedio()
    this.obtenerDatosExpertos()
  }

  obtenerDatosPromedio = async () =>{
    try{
      const datosObtenidos = await Axios.get(servicioPromedio)
      this.setState({
        selectedComboBox: datosObtenidos.data.values,
        contentDataPromedio : this.convertDatosPromedio(datosObtenidos.data.values) 
      })
    }
    catch(e){
      console.error(e)
    }
  }

  convertDatosPromedio = (info) => {
    const formatData = []
    info.forEach((item, i) => {
      if (i !== 0) {
        formatData.push({
          partido: item[0],
          promedio: (item[1].replace(',', '.') / 10).toFixed(2) ,
          id: i
        })
      }
    })
    return formatData
  }

  convertDatosExpertos = (data) => {
    console.log('data', data)
    return data
  }

  inputChange = (e) => {
    this.setState({
      selectedPartido: JSON.parse(e.target.value),
      agujaPromedio : (91.5 * JSON.parse(e.target.value).promedio) + INITIAL_VALUE ,
    })
  }
  
  obtenerDatosExpertos = async () => {
    try{
      const datosExpertosObtenidos = await Axios.get(servicioExpertos)
      this.setState({
        contentDataExpertos : this.convertDatosExpertos(datosExpertosObtenidos.data.values)
      })
    }
    catch(e){
      console.error(e)
    }
  }

  obtenerFoto = () => {
    const { selectedPartido } = this.state

    if (!selectedPartido) return ''

    const partido = fotosPartidos.find(item => item.id === selectedPartido.id)

    return partido ? partido.photo : ''
  }

  render(){
    const { contentDataPromedio, selectedPartido, agujaPromedio } = this.state

    return(
      <>
      <img src="../../img/ppc.png" alt=""/>
        <div className="container-ruleta">
          <div className="container-comboBox">
            <p className="title-comboBox">Elige el partido político</p>
            <select
              className="comboBox-servicio-promedio"
              onChange={this.inputChange}
              defaultValue={selectedPartido}
              name="selectedComboBox"
            >
              {
                [{id: 0 , partido : "Seleccione un partido"}, ...contentDataPromedio].map((item, i)=> {
                  return <option key={i} value={ JSON.stringify(item) }>{item.partido}</option>
                })
              }
            </select>
          </div>
          <div className="multimetro"></div>
          <Aguja
            aguja={agujaPromedio}
          />
          <div className="foto-partido">
            <img src={this.obtenerFoto()} alt=""/>
            <h3 className="calificacion">{selectedPartido.promedio}</h3>
          </div>
        </div>
        {/* <div className="container-ruleta">
          <div className="multimetro"/>
          <select>
            <option value=""></option>
          </select>
        </div> */}
      </>
    )
  }
} 
export default RuletaElectoral