import React from 'react'
import Axios from 'axios'

import { servicioPromedio, servicioExpertos } from '../../constantes/index'

import Aguja from '../../components/Aguja'

import './RuletaElectoral.scss'


class RuletaElectoral extends React.Component {
  state= {
    contentDataPromedio : [],
    agujaPromedio: '320',
    selectedComboBox : 0 ,

    contentDataExpertos : [],
    agujaExpertos : '320'
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
          promedio: (item[1].replace(',', '.') / 10) ,
          id: i
        })
      }
    })
    return formatData
  }

  inputChange = (e) => {
    this.setState({
      agujaPromedio : (80 * JSON.parse(e.target.value).promedio) + 320 ,
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

  // convertDatosExpertos = (val) => {
  //   const formatDataExpertos = []
  //   val.forEach((item,i) => {
  //     item.forEach((obj, n)=> {
  //       if(n === 0){
  //         formatDataExpertos.push({
            
  //         })
  //       }
  //     }
  //   })
  // }

  render(){
    const { contentDataPromedio, selectedComboBox, agujaPromedio, contentDataExpertos, agujaExpertos } = this.state
    console.log('contentDataExpertos', contentDataExpertos)
    return(
      <>
        <div className="container-ruleta">
          <select
            className="comboBox-servicio-promedio"
            onChange={this.inputChange}
            defaultValue={selectedComboBox}
            name="selectedComboBox"
          >
            {
              contentDataPromedio.map((item, i)=> {
                return <option key={i} value={ JSON.stringify(item) }>{item.partido}</option>
              })
            }
          </select>
          <div className="multimetro"></div>
          <Aguja
            aguja={agujaPromedio}
          />
        </div>

        <div className="container-ruleta">
          <div className="multimetro"/>
          <select>
            <option value=""></option>
          </select>
          <Aguja
            aguja={agujaExpertos}
          />
        </div>
      </>
    )
  }
} 
export default RuletaElectoral