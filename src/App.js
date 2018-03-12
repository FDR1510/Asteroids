import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  PageHeader,
  Table
} from 'react-bootstrap'
import neoData from './sample-neo'
import asteroid from './sample-asteroid'

class App extends Component {
  constructor(props){
      super(props)
      let today = new Date()
      this.state = {
        apiKey: "w4Wu84HScSeEA7rVGgXNrCcN9wPjcE4LcmkRZ1zI",
     startDate:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
     apiUrl: "https://api.nasa.gov/neo/rest/v1/feed",
      rawData: neoData,
      asteroids: []
      }
    }
    componentWilMount(){
        fetch(`${this.state.apiUrl}?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`).then((rawResponse)=>{ return rawResponse.json()
  }).then((parsedResponse) => {

      let neoData = this.state.rawData.near_earth_objects
      let newAsteroids =[]
      Object.keys(neoData).forEach((date) =>{
        neoData[date].forEach((asteroids) =>{
          newAsteroids.push({
            id: asteroid.neo_reference_id,
            name:  asteroid.name,
            date: asteroid.close_approach_data[0].close_approach_data,
            diameterMin: asteroid.esrimated_diameter.feet.estimated_diameter_min.toFixed(0),
            diameterMax: asteroid.esrimated_diameter.feet.estimated_diameter_max.toFixed(0),
            closetApproach: asteroid.close_approach_data[0].miss_distance.miles,
            velocity: parseFloat(asteroid.close_approach_date[0].relative_velocity.miles_per_hour).toFixed(0),
            distance: asteroid.close_approach_data[0].miss_distance.miles,
          })
        })
      })
      this.setState({asteroids: newAsteroids})
      debugger
    }
    render () {
    return (
      <div className="App">
      <div class='container'>
        <div class='row'>
          <div class='col-xs-4'>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Estimated Diameter (feet)</th>
                <th>Date of Closest Approach</th>
                <th>Distance (miles)</th>
                <th>Velocity (miles/hour)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.asteroids.map((asteroid)=>{
                return(
                  <tr key={asteroid.id}>
                    <td>{asteroid.name}</td>
                    <td>{asteroid.diameterMin} - {asteroid.diameterMax}</td>
                    <td>{asteroid.date}</td>
                    <td>{asteroid.distance}</td>
                    <td>{asteroid.velocity}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          </div>
          <div class='col-xs-8'>
            <h3>DUPER</h3>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
