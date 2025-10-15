CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  team_name VARCHAR(50),
  base_country VARCHAR(50),
  principal VARCHAR(50)
);

CREATE TABLE drivers (
  driver_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  nationality VARCHAR(50),
  team_id INT REFERENCES teams(team_id)
);

CREATE TABLE tracks (
  track_id SERIAL PRIMARY KEY,
  track_name VARCHAR(100),
  location VARCHAR(100),
  country VARCHAR(50),
  length_km NUMERIC(5,3),
  laps INT
);

CREATE TABLE races (
  race_id SERIAL PRIMARY KEY,
  track_id INT REFERENCES tracks(track_id),
  date DATE,
  season INT,
  winner_driver_id INT REFERENCES drivers(driver_id)
);

CREATE TABLE results (
  result_id SERIAL PRIMARY KEY,
  race_id INT REFERENCES races(race_id),
  driver_id INT REFERENCES drivers(driver_id),
  position INT,
  points INT
);
