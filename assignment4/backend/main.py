from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
import pymongo
from pymongo import ReturnDocument
import psycopg2
from psycopg2 import sql
from psycopg2.extras import RealDictCursor  # to get dict results
import os
from dotenv import load_dotenv
from classes import (TeamUpdate, DriverUpdate, TrackUpdate, TeamInsert, TrackInsert,
                     split_update_teams_data, split_update_drivers_data, split_update_tracks_data,
                     split_insert_teams_data, split_insert_tracks_data)

load_dotenv()
app = FastAPI(title="Racing Results API")

username = os.getenv("DB_USER")
pswd = os.getenv("DB_PASSWORD")
dbname_postgres = os.getenv("DB_NAME_POSTGRES")
dbname_mongo = os.getenv("DB_NAME_MONGO")
hostname_postgres = os.getenv("HOSTNAME_POSTGRES")
hostname_mongo = os.getenv("HOSTNAME_MONGO")

databases = {}

while True:
    try:
        postgres_database = psycopg2.connect(database=dbname_postgres, user=username, password=pswd,
                                             host=hostname_postgres, port=5432)
        mongo_connection = pymongo.MongoClient(f"mongodb://{username}:{pswd}@{hostname_mongo}:27017")
        mongo_database = mongo_connection[dbname_mongo]
        if postgres_database and mongo_database is not None:
            print("=== Successfully connected to all the databases! ===")
            databases = {
                "postgres_database": postgres_database,
                "mongo_database": mongo_database,
            }
            break
    except Exception as e:
        print(f"Error in connecting to database: {str(e)}")


# Get data from similar tables/collections: teams, drivers, tracks
def get_postgres_data(table, entity_id_name):
    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    cursor.execute(f"SELECT * FROM {table} ORDER BY {entity_id_name};")
    records = cursor.fetchall()
    cursor.close()
    return [dict(row) for row in records]


def get_mongo_data(collection, entity_id_name):
    mongo_data = list(mongo_database[collection].find({}, {"_id": 0, "full_name": 0, "track_name": 0}))
    return {d[entity_id_name]: d for d in mongo_data}


# Get combined data from similar tables/collections: teams, drivers, tracks
def get_combined_data(collection, entity_id_name):
    postgres_data = get_postgres_data(collection, entity_id_name)
    mongo_dict = get_mongo_data(collection, entity_id_name)
    merged_list = [
        {**pg, **mongo_dict.get(pg[entity_id_name], {})}
        for pg in postgres_data
    ]
    return merged_list


# Update data in similar tables/collections: teams, drivers, tracks
def update_postgres_data(table, entity_id_name, entity_id, update_dict):
    columns_update = []
    for k, v in update_dict.items():
        columns_update.append(f"{k} = '{v}'")

    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    if len(columns_update):
        cursor.execute(f"UPDATE {table} SET {','.join(columns_update)} WHERE {entity_id_name} = {entity_id};")
        postgres_database.commit()
    cursor.execute(f"SELECT * FROM {table} WHERE {entity_id_name} = {entity_id}")
    updated_record = cursor.fetchone()
    cursor.close()
    return updated_record


def update_mongo_data(collection, entity_id_name, entity_id, update_dict):
    if not (len(update_dict.keys())):
        return mongo_database[collection].find_one(
            {entity_id_name: entity_id},
            {"_id": 0, "full_name": 0, "track_name": 0}
        )
    result = mongo_database[collection].find_one_and_update(
        {entity_id_name: entity_id},
        {"$set": update_dict},
        return_document=ReturnDocument.AFTER,
        projection={"_id": 0}
    )
    return result


def update_teams_data(team_id, update_dict):
    mongo_data, postgres_data = split_update_teams_data(update_dict)
    updated_postgres = update_postgres_data("teams", "team_id", team_id, postgres_data)
    updated_mongo = update_mongo_data("teams", "team_id", team_id, mongo_data)
    merged = {**updated_postgres, **updated_mongo}
    return merged


def update_drivers_data(driver_id, update_dict):
    mongo_data, postgres_data = split_update_drivers_data(update_dict)
    updated_postgres = update_postgres_data("drivers", "driver_id", driver_id, postgres_data)
    updated_mongo = update_mongo_data("drivers", "driver_id", driver_id, mongo_data)
    merged = {**updated_postgres, **updated_mongo}
    return merged


def update_tracks_data(track_id, update_dict):
    mongo_data, postgres_data = split_update_tracks_data(update_dict)
    updated_postgres = update_postgres_data("tracks", "track_id", track_id, postgres_data)
    updated_mongo = update_mongo_data("tracks", "track_id", track_id, mongo_data)
    merged = {**updated_postgres, **updated_mongo}
    return merged


# Get only postgres data
def get_races_data():
    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT r.race_id, r.date, t.track_name, d.full_name FROM races r\n"
                   "JOIN tracks t ON t.track_id = r.track_id\n"
                   "JOIN drivers d ON d.driver_id = r.winner_driver_id\n"
                   "ORDER BY r.race_id;")
    records = cursor.fetchall()
    cursor.close()
    return records


def get_results_data():
    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT r.date, t.track_name, rt.position,"
                   "d.full_name, tm.team_name, rt.points\n"
                   "FROM results rt\n"
                   "JOIN races r ON r.race_id = rt.race_id\n"
                   "JOIN tracks t ON r.track_id = t.track_id\n"
                   "JOIN drivers d ON d.driver_id = rt.driver_id\n"
                   "JOIN teams tm ON d.team_id = tm.team_id\n"
                   "ORDER BY rt.result_id;")
    records = cursor.fetchall()
    cursor.close()
    return records


# Get only mongo db data
def get_driver_stats_data():
    drivers = list(mongo_database.drivers.find({}, {"_id": 0}))
    driver_stats = list(mongo_database.driver_stats.find({}, {"_id": 0}))
    driver_lookup = {d["driver_id"]: d for d in drivers}
    merged = []
    for stat in driver_stats:
        driver = driver_lookup.get(stat["driver_id"], {})
        merged.append({**stat, "full_name": driver["full_name"]})
    return merged


def get_team_stats_data():
    teams = list(mongo_database.teams.find({}, {"_id": 0}))
    team_stats = list(mongo_database.team_stats.find({}, {"_id": 0}))
    team_lookup = {d["team_id"]: d for d in teams}
    merged = []
    for stat in team_stats:
        team = team_lookup.get(stat["team_id"], {})
        merged.append({**stat, "team_name": team["team_name"]})
    return merged


# Insert into postgres data
def insert_postgres_data(table, create_dict):
    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    cursor.execute(f"INSERT INTO {table}"
                   f"({','.join(create_dict.keys())})"
                   f"VALUES ({', '.join(['%s'] * len(create_dict))}) "
                   f"RETURNING *;",
                   tuple(create_dict.values())
                   )
    postgres_database.commit()
    new_record = cursor.fetchone()
    cursor.close()
    return new_record


# Insert into mongo data
def insert_mongo_data(collection, create_dict):
    mongo_database[collection].insert_one(
        dict(create_dict)
    )
    return create_dict


# Insert into similar tables/collections: teams, tracks
def insert_teams_data(create_dict):
    mongo_data, postgres_data = split_insert_teams_data(create_dict)
    inserted_postgres = insert_postgres_data("teams", postgres_data)
    mongo_data["team_id"] = inserted_postgres["team_id"]
    inserted_mongo = insert_mongo_data("teams", mongo_data)
    merged = {**inserted_postgres, **inserted_mongo}
    return merged


def insert_tracks_data(create_dict):
    mongo_data, postgres_data = split_insert_tracks_data(create_dict)
    inserted_postgres = insert_postgres_data("tracks", postgres_data)
    mongo_data["track_id"] = inserted_postgres["track_id"]
    inserted_mongo = insert_mongo_data("tracks", mongo_data)
    merged = {**inserted_postgres, **inserted_mongo}
    return merged


# Delete from postgres data
def delete_postgres_data(table, entity_id_name, entity_id):
    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    cursor.execute(
        sql.SQL("DELETE FROM {} WHERE {} = %s;").format(
            sql.Identifier(table), sql.Identifier(entity_id_name)
        ),
        (entity_id,)
    )
    postgres_database.commit()
    cursor.close()


# Delete from mongo data
def delete_mongo_data(collection, entity_id_name, entity_id):
    mongo_database[collection].delete_one({entity_id_name: entity_id})


# Delete combined data from postgres/mongo cascading
def delete_drivers_data(driver_id):
    delete_mongo_data("drivers", "driver_id", driver_id)
    delete_mongo_data("driver_stats", "driver_id", driver_id)
    delete_postgres_data("drivers", "driver_id", driver_id)  # On cascade set null


# Teams
@app.get("/api/teams")
def get_teams():
    return get_combined_data("teams", "team_id")


@app.patch("/api/teams/{team_id}")
def update_teams(team_id: int, updates: TeamUpdate):
    update_dict = updates.model_dump(exclude_unset=True)
    return update_teams_data(team_id, update_dict)


@app.post("/api/teams")
def create_team(body: TeamInsert):
    body = body.model_dump()
    return insert_teams_data(body)


# Drivers
@app.get("/api/drivers")
def get_drivers():
    return get_combined_data("drivers", "driver_id")


@app.patch("/api/drivers/{driver_id}")
def update_drivers(driver_id: int, updates: DriverUpdate):
    update_dict = updates.model_dump(exclude_unset=True)
    return update_drivers_data(driver_id, update_dict)


@app.delete("/api/drivers/{driver_id}")
def delete_driver(driver_id: int):
    delete_drivers_data(driver_id)
    return


# Tracks
@app.get("/api/tracks")
def get_tracks():
    return get_combined_data("tracks", "track_id")


@app.patch("/api/tracks/{track_id}")
def update_tracks(track_id: int, updates: TrackUpdate):
    update_dict = updates.model_dump(exclude_unset=True)
    return update_tracks_data(track_id, update_dict)


@app.post("/api/tracks")
def create_track(body: TrackInsert):
    body = body.model_dump()
    return insert_tracks_data(body)


# Races
@app.get("/api/races")
def get_races():
    return get_races_data()


# Results
@app.get("/api/results")
def get_results():
    return get_results_data()


# Driver stats
@app.get("/api/driver-stats")
def get_driver_stats():
    return get_driver_stats_data()


# Team stats
@app.get("/api/team-stats")
def get_team_stats():
    return get_team_stats_data()

# # Frontend
# app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
