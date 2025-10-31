var dbName = _getEnv("MONGO_INITDB_DATABASE");

db = db.getSiblingDB(dbName);

db.drivers.insertMany([
  { "driver_id": 1, "full_name": "Charles Leclerc", "social_media": "@charles_leclerc", "championship_position": 5 },
  { "driver_id": 2, "full_name": "Lewis Hamilton", "social_media": "@lewishamilton", "championship_position": 6 },
  { "driver_id": 3, "full_name": "Lando Norris", "social_media": "@lando", "championship_position": 1 },
  { "driver_id": 4, "full_name": "Oscar Piastri", "social_media": "@oscar_piastri", "championship_position": 2 },
  { "driver_id": 5, "full_name": "George Russell", "social_media": "@georgerussell63", "championship_position": 4 },
  { "driver_id": 6, "full_name": "Andrea Kimi Antonelli", "social_media": "@kimi_antonelli", "championship_position": 7 },
  { "driver_id": 7, "full_name": "Max Verstappen", "social_media": "@maxverstappen1", "championship_position": 3 },
  { "driver_id": 8, "full_name": "Yuki Tsunoda", "social_media": "@yukitsunoda", "championship_position": 17 },
  { "driver_id": 9, "full_name": "Alex Albon", "social_media": "@alex_albon", "championship_position": 8 },
  { "driver_id": 10, "full_name": "Carlos Sainz", "social_media": "@carlossainz55", "championship_position": 11 },
  { "driver_id": 11, "full_name": "Liam Lawson", "social_media": "@liamlawson", "championship_position": 15 },
  { "driver_id": 12, "full_name": "Isack Hadjar", "social_media": "@isackhadjar", "championship_position": 10 },
  { "driver_id": 13, "full_name": "Fernando Alonso", "social_media": "@fernandoalo_oficial", "championship_position": 12 },
  { "driver_id": 14, "full_name": "Lance Stroll", "social_media": "@lance.stroll", "championship_position": 14 },
  { "driver_id": 15, "full_name": "Nico Hülkenberg", "social_media": "@nicohulkenberg", "championship_position": 9 },
  { "driver_id": 16, "full_name": "Gabriel Bortoleto", "social_media": "@gabrielbortoleto", "championship_position": 19 },
  { "driver_id": 17, "full_name": "Oliver Bearman", "social_media": "@olliebearman", "championship_position": 13 },
  { "driver_id": 18, "full_name": "Esteban Ocon", "social_media": "@estebanocon", "championship_position": 16 },
  { "driver_id": 19, "full_name": "Pierre Gasly", "social_media": "@pierregasly", "championship_position": 18 },
  { "driver_id": 20, "full_name": "Jack Doohan", "social_media": "@jackdoohan", "championship_position": 21 }
]);

db.drivers.createIndex({ driver_id: 1 });

db.teams.insertMany([
  { "team_id": 1, "full_name": "Scuderia Ferrari HP", "staff_number": 1050, "championship_position": 2 },
  { "team_id": 2, "full_name": "McLaren Formula 1 Team", "staff_number": 1000, "championship_position": 1 },
  { "team_id": 3, "full_name": "Mercedes-AMG PETRONAS Formula One Team", "staff_number": 1200, "championship_position": 3 },
  { "team_id": 4, "full_name": "Oracle Red Bull Racing", "staff_number": 1000, "championship_position": 4 },
  { "team_id": 5, "full_name": "Atlassian Williams Racing", "staff_number": 1200, "championship_position": 5 },
  { "team_id": 6, "full_name": "Visa Cash App Racing Bulls Formula One Team", "staff_number": 800, "championship_position": 6 },
  { "team_id": 7, "full_name": "Aston Martin Aramco Formula One Team", "staff_number": 1000, "championship_position": 7 },
  { "team_id": 8, "full_name": "Stake F1 Team Kick Sauber", "staff_number": 750, "championship_position": 8 },
  { "team_id": 9, "full_name": "MoneyGram Haas F1 Team", "staff_number": 350, "championship_position": 9 },
  { "team_id": 10, "full_name": "BWT Alpine Formula One Team", "staff_number": 1000, "championship_position": 10 }
]);

db.teams.createIndex({ team_id: 1 });

db.tracks.insertMany[];

db.tracks.createIndex({ team_id: 1 });

db.driver_stats.insertMany[];

db.team_stats.insertMany[];
