INSERT INTO teams (team_name, base_country, principal) VALUES
('Scuderia Ferrari HP', 'Italy', 'Frédéric Vasseur'),
('McLaren Formula 1 Team', 'United Kingdom', 'Andrea Stella'),
('Mercedes-AMG PETRONAS Formula One Team', 'United Kingdom', 'Toto Wolff'),
('Oracle Red Bull Racing', 'United Kingdom', 'Laurent Mekies'),
('Atlassian Williams Racing', 'United Kingdom', 'James Vowles'),
-- Different data
('Racing Point', 'United Kingdom', 'Otmar Szafnauer'),
('Alfa Romeo Racing', 'Switzerland', 'Alessandro Alunni Bravi'),
('AlphaTauri', 'Italy', 'Franz Tost'),
('HRT', 'Spain', 'Luis Pérez-Sala'),
('Jaguar', 'Spain', 'Ian James');

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
('Lance', 'Stroll', 'Canada', 6),
('Valtteri', 'Bottas', 'Finland', 7),
('Zhou', 'Guanyu', 'China', 7),
('Yuki', 'Tsunoda', 'Japan', 8),
('Daniel', 'Ricciardo', 'Australia', 8),
('Pedro', 'de la Rosa', 'Spain', 9),
('Narain', 'Karthikeyan', 'India', 9),
('Mark', 'Webber', 'Australia', 10),
('Christian', 'Klein', 'Austria', 10);

INSERT INTO tracks (track_name, location, country, length_km, laps) VALUES
('Albert Park Circuit', 'Melbourne, Victoria', 'Australia', 5.278, 58),
('Silverstone Circuit', 'Silverstone, Northamptonshire', 'United Kingdom', 5.891, 52),
('Suzuka Circuit', 'Suzuka, Mie', 'Japan', 5.807, 53),
('Bahrain International Circuit (Sakhir)', 'Sakhir', 'Bahrain', 5.412, 57),
('Circuit de Spa-Francorchamps', 'Stavelot / Spa', 'Belgium', 7.004, 44),
('Miami International Autodrome', 'Miami, Florida', 'United States', 5.412, 57),
-- Different data
('Las Vegas Strip Circuit', 'Las Vegas, Nevada', 'United States', 6.201, 50),
('Lusail International Circuit', 'Lusail', 'Qatar', 5.38, 57),
('Yas Marina Circuit', 'Abu Dhabi', 'United Arab Emirates', 5.281, 58),
('Sepang International Circuit', 'Selangor / Kuala Lumpur', 'Malaysia', 5.543, 56),
('Valencia Street Circuit (European GP)', 'Valencia', 'Spain', 5.419, 57),
('Hockenheimring', 'Hockenheim', 'Germany', 4.574, 67),
('Korea International Circuit', 'Yeongam', 'South Korea', 5.615, 55),
('Buddh International Circuit', 'Greater Noida', 'India', 5.125, 60);

INSERT INTO races (track_id, date, season, winner_driver_id) VALUES
(1, '2026-03-15', 2026, 3),
(2, '2026-05-10', 2026, 4),
(3, '2026-07-05', 2026, 6),
(4, '2026-08-30', 2026, 9),
(6, '2026-10-25', 2026, 15),
-- Different data
(9, '2026-04-26', 2026, 3),
(10, '2026-06-21', 2026, 4),
(11, '2026-08-16', 2026, 1),
(12, '2026-10-11', 2026, 2),
(8, '2026-12-06', 2026, 20);

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
(6, 3, 1, 25),
(6, 2, 2, 18),
(6, 7, 3, 15),
(7, 4, 1, 25),
(7, 17, 2, 18),
(7, 15, 3, 15),
(8, 1, 1, 25),
(8, 18, 2, 18),
(8, 12, 3, 15),
(9, 2, 1, 25),
(9, 3, 2, 18),
(9, 7, 3, 15),
(10, 20, 1, 25),
(10, 10, 2, 18),
(10, 9, 3, 15);
