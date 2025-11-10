# Intro
This is a homework for the Data-Intensive Systems, LUT, 2025.

## Assignment 3
Creates 3 similar databases with partly same data, 5 tables each.
Uses docker, PostgreSQL, Fastapi (python), and React (Javascript).

Data used is Formula-1 drivers and teams performing and tracks used through the last decade.
The races and results data is imaginary because the databases shall be different to some extent,
and that was a quick way to make different data.

### Running
Clone the repo and run docker-compose building the images
```
git clone git@github.com:elidare/data-intensive.git
cd data-intensive/assignment3/
docker-compose -f docker-compose.yaml up -d --build
```

The app will be available at http://localhost:8000/.

To shut down, run `docker-compose down`.

To reset the databases to the initial state, run `./reset.sh`.

To access the databases through docker, you can use
```
docker exec -it postgres_db1 psql -U postgres -d database1
docker exec -it postgres_db2 psql -U postgres -d database2
docker exec -it postgres_db3 psql -U postgres -d database3
```

### Resources
I acknowledge the use of OpenAI. (2025). ChatGPT (v4) [Large language model]. https://openai.com
to generate materials for the code of this assessment.

AI assistance was used in the following tasks:
- Data generation https://chatgpt.com/share/68ef8821-d804-8003-b2d1-effd510d8fa4
- Dockerizing the databases https://chatgpt.com/share/68ee707e-b258-8003-87f0-1cb002554cba
- Frontend https://chatgpt.com/share/68f535bc-eb20-8003-a8ca-b742fb13fe03 (used with modifications)
- Fastapi https://chatgpt.com/share/68efad7b-bebc-8003-9a49-d336c52a6491


## Assignment 4
Creates 2 database with partly same data: 5 tables/collections in each Postgres and MongoDB.
<table>
    <thead>
        <tr>
            <th>Table/Collection</th>
            <th>Database</th>
            <th>Data model</th>
            <th>Operations</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">teams</td>
            <td>Postgres</td>
            <td><b>team_id</b>, <b>team_name</b>, base_country, principal</td>
            <td rowspan="2">Select, Update, Insert</td>
        </tr>
        <tr>
            <td>Mongo</td>
            <td><b>team_id</b>, <b>team_name</b>, staff_number, championship_position</td>
        </tr>
        <tr>
            <td rowspan="2">drivers</td>
            <td>Postgres</td>
            <td><b>driver_id</b>, <b>full_name</b>, nationality, team_id</td>
            <td rowspan="2">Select, Update, Delete</td>
        </tr>
        <tr>
            <td>Mongo</td>
            <td><b>driver_id</b>, <b>full_name</b>, social_media, championship_position</td>
        </tr>
        <tr>
            <td rowspan="2">tracks</td>
            <td>Postgres</td>
            <td><b>track_id</b>, <b>track_name</b>, location, country, length_km, laps</td>
            <td rowspan="2">Select, Update, Insert</td>
        </tr>
        <tr>
            <td>Mongo</td>
            <td><b>track_id</b>, <b>track_name</b>, lat, lng, record_lap_driver</td>
        </tr>
        <tr>
            <td>races</td>
            <td>Postgres</td>
            <td>race_id, track_id, date, season, winner_driver_id</td>
            <td>Select</td>
        </tr>
        <tr>
            <td>results</td>
            <td>Postgres</td>
            <td>result_id, race_id, driver_id, position, points</td>
            <td>Select</td>
        </tr>
        <tr>
            <td>driver_stats</td>
            <td>Mongo</td>
            <td>driver_id, season, avg_finish, podiums, wins, dnfs</td>
            <td>Select</td>
        </tr>
        <tr>
            <td>team_stats</td>
            <td>Mongo</td>
            <td>team_id, season, avg_finish, wins</td>
            <td>Select</td>
        </tr>
    </tbody>
</table>
Uses docker, PostgreSQL, MongoDB, Fastapi (python), and React (Javascript).

Data used is Formula-1 drivers and teams performing and tracks used through 2025.
The races, results, driver stats, and team stats data is imaginary.

Updates, inserts, and deletions are not made within one transaction so some unsynchronized data could appear.

No error handling is done.
I omitted this part because it is a study assignment.

### Running
Clone the repo and run docker-compose building the images
```
git clone git@github.com:elidare/data-intensive.git
cd data-intensive/assignment4/
docker-compose -f docker-compose.yaml up -d --build
```

The app will be available at http://localhost:8000/.

To shut down, run `docker-compose down`.

To access the databases through docker, you can use
```
docker exec -it postgres_db psql -U user -d database_postgres
docker exec -it mongo_db mongosh -u user -p password
```

### Resources
I acknowledge the use of OpenAI. (2025). ChatGPT (v4) [Large language model]. https://openai.com
to generate materials for the code of this assessment.

Assignment 4 code is based on Assignment 3, so every AI mentioned there applies in this part as well.

Additionally, AI assistance was used in the following tasks:
- Data generation for MongoDB https://chatgpt.com/share/69078d84-8d28-8003-9046-93628af34b91 
- Dockerizing MongDB https://chatgpt.com/share/6907bb05-39c8-8003-962b-7c988c2be348 
- Retrieving combined data on the backend https://chatgpt.com/share/6908e57a-1968-8003-9402-8d99614b0daf 
- Inserting and deleting https://chatgpt.com/share/6912105a-0598-8003-9593-2e3b85b54934 
- Frontend updates https://chatgpt.com/share/6911dee4-647c-8003-91c0-c21ad4a67848
