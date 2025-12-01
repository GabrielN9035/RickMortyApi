import { useState, useEffect } from 'react'
import s from './App.module.css'
import {api} from './api/api'
import {Card} from './components/card'

function App(){
  const [data, setData] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchPage, setSearchPage] = useState("")

  useEffect(() => {
    api.get(`/character/?name=${searchName}&page=${searchPage}`).then((response) => {
      setData(response.data.results)
    }).catch((error) => {
      console.error("NÃO FOI POSSIVEL ACESSAR A API", error)
    })
  }, [searchPage, searchName])

  return(
    <>
      <h1 className={s.title}>Ricky and Morty Characters</h1>
      <main>
        <div style={{display:"flex", flexWrap:"wrap",alignItems:"center", justifyContent:"center"}}>
        <input type="text" value={searchPage} onChange={(e) => setSearchPage(e.target.value)} placeholder='1/42'/>
        <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder='Procure um personagem'/>
        </div>

        <div className={s.wrapCards}>
          {data.map((item, index) => {
            return(
              <div key={index}>
                <Card image={item.image} name={item.name} species={item.species}/>
              </div>
            )
          })}

        </div>
      </main>
    </>
  )
}

export default App