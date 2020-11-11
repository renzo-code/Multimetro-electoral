import React from 'react'
import Axios from 'axios'

import { servicioPromedio, servicioExpertos, fotosPartidos } from '../../constantes/index'

import Aguja from '../../components/Aguja'

import './RuletaElectoral.scss'

const INITIAL_VALUE = 317
const INITIAL_VALUE_SECUNDARIO = 317

class RuletaElectoral extends React.Component {
  state= {
    contentDataPromedio : [],
    agujaPromedio: INITIAL_VALUE,
    selectedPartido : 0 ,
    contentDataExpertos : [],

    agujaPromedioSecundario : INITIAL_VALUE_SECUNDARIO,
    contentDataSegundoPromedio : [],
    selectedSegundoPartido : 0,
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
        contentDataPromedio : this.convertDatosPromedio(datosObtenidos.data.values),
        contentDataSegundoPromedio : this.convertDatosPromedio(datosObtenidos.data.values)
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
          promedio: (item[1].replace(',', '.') / 10).toFixed(2),
          calificacion : (item[1].replace('.', ',')),
          id: i
        })
      }
    })
    return formatData
  }

  convertDatosExpertos = (data) => {
    return data
  }

  inputChange = (e) => {
    this.setState({
      selectedPartido: JSON.parse(e.target.value),
      agujaPromedio : (91.5 * JSON.parse(e.target.value).promedio) + INITIAL_VALUE,
    })
  }
  
  comboBoxChange = (e) => {
    this.setState({
      selectedSegundoPartido : JSON.parse(e.target.value),
      agujaPromedioSecundario : (91.5 * JSON.parse(e.target.value).promedio) + INITIAL_VALUE_SECUNDARIO,
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

  obtenerFoto = (dataComboBox) => {
    if (!dataComboBox ) return ''
    
    const partido = fotosPartidos.find(item => item.id === dataComboBox.id)

    return partido ? partido.photo : ''
  }

  render(){
    const { contentDataPromedio, selectedPartido, agujaPromedio,agujaPromedioSecundario, contentDataSegundoPromedio, selectedSegundoPartido } = this.state

    const transformDataPromedio = contentDataPromedio.filter((item => item.id !== selectedSegundoPartido.id))

    const transformDataSegundoPromedio = contentDataSegundoPromedio.filter((item => item.id !== selectedPartido.id))

    return(
      <>
          <div className="cont-master-comboBoxs">
            <div className="container-comboBox">
              <p className="title-comboBox">Elige el partido político</p>
              <select
                className="comboBox-servicio-promedio"
                onChange={this.inputChange}
                defaultValue={selectedPartido}
                name="selectedComboBox"
              >
                {
                  [{id: 0 , partido : "Seleccione un partido"}, ...transformDataPromedio].map((item, i)=> {
                    return <option hidden={i === 0} key={i} value={ JSON.stringify(item) }>{item.partido}</option>
                  })
                }
              </select>
            </div>

            <div className="container-segundo-comboBox">
              <p className="title-comboBox">y compara</p>
              <select
                className="comboBox-segundo-servicio-promedio"
                onChange={this.comboBoxChange}
                defaultValue={selectedSegundoPartido}
                name="selectedSegundoPartido"
              >
                {
                  [{id: 0 , partido : "Otro partido"}, ...transformDataSegundoPromedio].map((item, i) => {
                    return <option hidden={i === 0} key={i} value={JSON.stringify(item)}>{item.partido}</option> 
                  })
                }
              </select>
            </div>
          </div>

        <div className="container-ruleta">
          <div className="multimetro"></div>
          <Aguja
            aguja={agujaPromedio}
          />
          <Aguja
            bgColor="blue"
            aguja={agujaPromedioSecundario}
          />
          <div className="foto-partido2">
            <img src={this.obtenerFoto(selectedPartido)} alt=""/>
            {selectedPartido !== 0 && <h3 className="calificacion">{selectedPartido.calificacion}</h3>}
          </div>
          <div className="foto-partido">
            <img src={this.obtenerFoto(selectedSegundoPartido)} alt=""/>
            {selectedSegundoPartido !== 0 && <h3 className="calificacion2">{selectedSegundoPartido.calificacion}</h3>}
          </div>
        </div>
        
      </>
    )
  }
} 
export default RuletaElectoral