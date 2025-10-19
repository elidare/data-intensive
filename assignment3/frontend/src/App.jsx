import { useState, useEffect } from 'react'
import TeamsTable from "./components/TeamsTable";


function App() {
  const [database, setDatabase] = useState('database1')

  return (
    <div className="container mx-auto p-6">
      <TeamsTable database={database}/>
{/*       <DriversTable /> */}
    </div>
  )
}

export default App
