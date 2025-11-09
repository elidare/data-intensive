import { useState, useEffect } from 'react'
import "./App.css";
import TeamsTable from "./components/TeamsTable";
import TeamStatsTable from "./components/TeamStatsTable";
import DriversTable from "./components/DriversTable";
import DriverStatsTable from "./components/DriverStatsTable";
import TracksTable from "./components/TracksTable";
import RacesTable from "./components/RacesTable";
import ResultsTable from "./components/ResultsTable";

function App() {
  return (
    <div className="container mx-auto p-6">
      <TeamsTable />
      <TeamStatsTable />
      <DriversTable />
      <DriverStatsTable />
      <TracksTable />
      <RacesTable />
      <ResultsTable />
    </div>
  )
}

export default App
