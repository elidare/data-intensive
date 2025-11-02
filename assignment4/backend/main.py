from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
import pymongo
import psycopg2
from psycopg2.extras import RealDictCursor  # to get dict results
import os
from dotenv import load_dotenv
from classes import TeamUpdate, DriverUpdate, TrackUpdate


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
        postgres_database = psycopg2.connect(database=dbname_postgres, user=username, password=pswd, host=hostname_postgres, port=5432)
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


# For similar tables/collections: teams, drivers, tracks
def get_postgres_data(table, similar_id):
    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    cursor.execute(f"SELECT * FROM {table} ORDER BY {similar_id};")
    records = cursor.fetchall()
    cursor.close()
    return [dict(row) for row in records]


def get_mongo_data(collection, similar_id):
    mongo_data = list(mongo_database[collection].find({}, {"_id": 0, "full_name": 0, "track": 0}))
    return {team[similar_id]: team for team in mongo_data}


def get_combined_data(entity_list, entity_id):
    postgres_data = get_postgres_data(entity_list, entity_id)
    mongo_dict = get_mongo_data(entity_list, entity_id)
    merged_list = [
        {**pg, **mongo_dict.get(pg[entity_id], {})}
        for pg in postgres_data
    ]
    return merged_list

#
#
# def update_teams_data(database, team_id, update_dict):
#     columns_update = []
#     for k, v in update_dict.items():
#         columns_update.append(f"{k} = '{v}'")
#     if not len(columns_update):
#         raise HTTPException(status_code=400, detail="Specify data to update")
#
#     cursor = database.cursor(cursor_factory=RealDictCursor)
#     cursor.execute(f"UPDATE teams SET {','.join(columns_update)} WHERE team_id = {team_id};")
#     database.commit()
#     cursor.execute(f"SELECT * FROM teams WHERE team_id = {team_id}")
#     updated_record = cursor.fetchone()
#     cursor.close()
#     return updated_record

#
# def update_drivers_data(database, driver_id, update_dict):
#     columns_update = []
#     for k, v in update_dict.items():
#         columns_update.append(f"{k} = '{v}'")
#     if not len(columns_update):
#         raise HTTPException(status_code=400, detail="Specify data to update")
#
#     cursor = database.cursor(cursor_factory=RealDictCursor)
#     cursor.execute(f"UPDATE drivers SET {','.join(columns_update)} WHERE driver_id = {driver_id};")
#     database.commit()
#     cursor.execute(f"SELECT * FROM drivers WHERE driver_id = {driver_id}")
#     updated_record = cursor.fetchone()
#     cursor.close()
#     return updated_record
#
#
# def update_tracks_data(database, track_id, update_dict):
#     columns_update = []
#     for k, v in update_dict.items():
#         columns_update.append(f"{k} = '{v}'")
#     if not len(columns_update):
#         raise HTTPException(status_code=400, detail="Specify data to update")
#
#     cursor = database.cursor(cursor_factory=RealDictCursor)
#     cursor.execute(f"UPDATE tracks SET {','.join(columns_update)} WHERE track_id = {track_id};")
#     database.commit()
#     cursor.execute(f"SELECT * FROM tracks WHERE track_id = {track_id}")
#     updated_record = cursor.fetchone()
#     cursor.close()
#     return updated_record


# Get only postgres data
def get_races_data():
    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT r.race_id, r.date, t.track_name, d.first_name, d.last_name FROM races r\n"
                   "JOIN tracks t ON t.track_id = r.track_id\n"
                   "JOIN drivers d ON d.driver_id = r.winner_driver_id\n"
                   "ORDER BY r.race_id;")
    records = cursor.fetchall()
    cursor.close()
    return records


def get_results_data():
    cursor = postgres_database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT r.date, t.track_name, rt.position,"
                   "d.first_name, d.last_name, tm.team_name, rt.points\n"
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


@app.get("/api/teams")
def get_teams():
    return get_combined_data("teams", "team_id")
#
#
# @app.patch("/api/teams/{team_id}")
# def update_teams(team_id: int, database: str, updates: TeamUpdate):
#     update_dict = updates.model_dump(exclude_unset=True)
#     db = get_database(database)
#     return update_teams_data(db, team_id, update_dict)


@app.get("/api/drivers")
def get_drivers():
    return get_combined_data("drivers", "driver_id")
#
#
# @app.patch("/api/drivers/{driver_id}")
# def update_drivers(driver_id: int, database: str, updates: DriverUpdate):
#     update_dict = updates.model_dump(exclude_unset=True)
#     db = get_database(database)
#     return update_drivers_data(db, driver_id, update_dict)


@app.get("/api/tracks")
def get_tracks():
    return get_combined_data("tracks", "track_id")
#
#
# @app.patch("/api/tracks/{track_id}")
# def update_tracks(track_id: int, database: str, updates: TrackUpdate):
#     update_dict = updates.model_dump(exclude_unset=True)
#     db = get_database(database)
#     return update_tracks_data(db, track_id, update_dict)


@app.get("/api/races")
def get_races():
    return get_races_data()


@app.get("/api/results")
def get_results():
    return get_results_data()


# # Frontend
# app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")
