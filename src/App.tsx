import React, { useState, useEffect } from 'react'
import './App.css'
import Autocomplete from './components/Autocomplete'
import { ISuggestion } from './interface/ISuggestion'
import { API_URL } from './API/api'

function App() {
  const [countries, setCountries] = useState<ISuggestion[]>([])
  const fetchCountries = async () => {
    const response = await fetch(API_URL, { method: 'GET' })
    const responseInJson = await response.json()
    return responseInJson
  }

  useEffect(() => {
    fetchCountries()
      .then((response) => {
        let jsonArr: ISuggestion[] = []
        response.data.map((item: any) => {
          jsonArr.push({
            option: item.name,
            highlighted: item.name,
          })
          return item.name
        })
        setCountries(jsonArr)
      })
      .catch((err) => console.log('ERROR : ', err))
  }, [])
  return (
    <div className="App-header">
      <div className="container">
        <h1 className="header">REACT AUTOCOMPLETE</h1>
        <p style={{ color: 'black' }}>Type 'a' for display list</p>
        <Autocomplete countries={countries} />
      </div>
    </div>
  )
}

export default App
