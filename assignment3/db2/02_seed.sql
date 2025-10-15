INSERT INTO teams (team_name, base_country, principal) VALUES
('Scuderia Ferrari HP', 'Italy', 'Frédéric Vasseur'),
('McLaren Formula 1 Team', 'United Kingdom', 'Andrea Stella'),
('Mercedes-AMG PETRONAS Formula One Team', 'United Kingdom', 'Toto Wolff'),
('Oracle Red Bull Racing', 'United Kingdom', 'Laurent Mekies'),
('Atlassian Williams Racing', 'United Kingdom', 'James Vowles'),
-- Different data
('Force India', 'United Kingdom', 'Vijay Mallya'),
('Toro Rosso', 'Italy', 'Franz Tost'),
('Lotus', 'United Kingdom', 'Gérard Lopez'),
('Marussia', 'United Kingdom', 'John Booth'),
('Caterham', 'United Kingdom', 'Cyril Abiteboul');

INSERT INTO drivers (first_name, last_name, nationality, team_id) VALUES
('Charles', 'Leclerc', 'Monaco', 1),
('Lewis', 'Hamilton', 'Great Britain', 1),
('Lando', 'Norris', 'Great Britain', 2),
('Oscar', 'Piastri', 'Australia', 2),
('George', 'Russell', 'Great Britain', 3),
('Andrea Kimi', 'Antonelli', 'Italy', 3),
('Max', 'Verstappen', 'Netherlands', 4),
('Yuki', 'Tsunoda', 'Japan', 4),
('Alex', 'Albon', 'Thailand', 5),
('Carlos', 'Sainz', 'Spain', 5),
-- Different data
('Sergio', 'Perez', 'Mexico', 6),
('Esteban', 'Ocon', 'France', 6),
('Brendon', 'Hartley', 'New Zealand', 7),
('Pierre', 'Gasly', 'France', 7),
('Romain', 'Grosjean', 'France', 8),
('Pastor', 'Maldonado', 'Venezuela', 8),
('Jules', 'Bianchi', 'France', 9),
('Max', 'Chilton', 'Great Britain', 9),
('Kamui', 'Kobayashi', 'Japan', 10),
('Marcus', 'Ericsson', 'Sweden', 10);

INSERT INTO tracks (track_name, location, country, length_km, laps) VALUES
('Albert Park Circuit', 'Melbourne, Victoria', 'Australia', 5.278, 58),
('Silverstone Circuit', 'Silverstone, Northamptonshire', 'United Kingdom', 5.891, 52),
('Suzuka Circuit', 'Suzuka, Mie', 'Japan', 5.807, 53),
('Bahrain International Circuit (Sakhir)', 'Sakhir', 'Bahrain', 5.412, 57),
('Circuit de Spa-Francorchamps', 'Stavelot / Spa', 'Belgium', 7.004, 44),
('Miami International Autodrome', 'Miami, Florida', 'United States', 5.412, 57),
-- Different data
('Hungaroring', 'Mogyoród, Budapest', 'Hungary', 4.381, 70),
('Circuit Zandvoort', 'Zandvoort', 'Netherlands', 4.259, 72),
('Autodromo Nazionale Monza', 'Monza, Lombardy', 'Italy', 5.793, 53),
('Baku City Circuit', 'Baku', 'Azerbaijan', 6.003, 51),
('Marina Bay Street Circuit', 'Singapore', 'Singapore', 5.063, 61),
('Circuit of The Americas (COTA)', 'Austin, Texas', 'United States', 5.513, 56),
('Autódromo Hermanos Rodríguez', 'Mexico City', 'Mexico', 4.304, 71),
('Autódromo José Carlos Pace (Interlagos)', 'São Paulo', 'Brazil', 4.309, 71);

INSERT INTO races (track_id, date, season, winner_driver_id) VALUES
(1, '2026-03-15', 2026, 3),
(2, '2026-05-10', 2026, 4),
(3, '2026-07-05', 2026, 6),
(4, '2026-08-30', 2026, 9),
(6, '2026-10-25', 2026, 15),
-- Different data
(7, '2026-04-12', 2026, 16),
(8, '2026-06-07', 2026, 1),
(9, '2026-08-02', 2026, 3),
(10, '2026-09-27', 2026, 2),
(1, '2026-11-22', 2026, 4);

INSERT INTO results (race_id, driver_id, position, points) VALUES
(1, 3, 1, 25),
(1, 4, 2, 18),
(1, 1, 3, 15),
(2, 4, 1, 25),
(2, 1, 2, 18),
(2, 13, 3, 15),
(3, 6, 1, 25),
(3, 3, 2, 18),
(3, 11, 3, 15),
(4, 9, 1, 25),
(4, 10, 2, 18),
(4, 4, 3, 15),
(5, 15, 1, 25),
(5, 13, 2, 18),
(5, 5, 3, 15),
-- Different data
(6, 16, 1, 25),
(6, 1, 2, 18),
(6, 3, 3, 15),
(7, 1, 1, 25),
(7, 9, 2, 18),
(7, 11, 3, 15),
(8, 3, 1, 25),
(8, 18, 2, 18),
(8, 12, 3, 15),
(9, 2, 1, 25),
(9, 3, 2, 18),
(9, 7, 3, 15),
(10, 4, 1, 25),
(10, 8, 2, 18),
(10, 9, 3, 15);
