import { useState, useEffect } from 'react'
import "./App.css";
import TeamsTable from "./components/TeamsTable";
import DriversTable from "./components/DriversTable";
import TracksTable from "./components/TracksTable";
import RacesTable from "./components/RacesTable";
import ResultsTable from "./components/ResultsTable";

function App() {
  const [database, setDatabase] = useState('database1')

  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="switcher-container">
        <label htmlFor="database-select" className="switcher-label">
          Select Database:
        </label>
        <select
          id="database-select"
          value={database}
          onChange={handleDatabaseChange}
          className="switcher-select"
        >
          <option value="database1">Database 1</option>
          <option value="database2">Database 2</option>
          <option value="database3">Database 3</option>
        </select>
      </div>
      <TeamsTable database={database} />
      <DriversTable database={database} />
      <TracksTable database={database} />
      <RacesTable database={database} />
      <ResultsTable database={database} />
    </div>
  )
}

export default App
