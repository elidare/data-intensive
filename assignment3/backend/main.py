from fastapi import FastAPI, HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor  # to get dict results
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="Racing Results API")

username = os.getenv('DB_USER')
pswd = os.getenv('DB_PASSWORD')
dbname_1 = os.getenv('DB_NAME_1')
dbname_2 = os.getenv('DB_NAME_2')
dbname_3 = os.getenv('DB_NAME_3')
# dbport_1 = os.getenv('DB_PORT_1')
# dbport_2 = os.getenv('DB_PORT_2')
# dbport_3 = os.getenv('DB_PORT_3')
# hostname = "localhost"  # service_name
hostname_1 = os.getenv('HOSTNAME_1')
hostname_2 = os.getenv('HOSTNAME_2')
hostname_3 = os.getenv('HOSTNAME_3')

databases = {}

while True:
    try:
        database_1 = psycopg2.connect(database=dbname_1, user=username, password=pswd, host=hostname_1, port=5432)
        database_2 = psycopg2.connect(database=dbname_2, user=username, password=pswd, host=hostname_2, port=5432)
        database_3 = psycopg2.connect(database=dbname_3, user=username, password=pswd, host=hostname_3, port=5432)
        if database_1 and database_2 and database_3:
            print("=== Successfully connected to all the databases! ===")
            databases = {
                'database1': database_1,
                'database2': database_2,
                'database3': database_3,
            }
            break
    except Exception as e:
        print(f"Error in connecting to database: {str(e)}")

# Select database function - frontend ?
# print all results from tables
# make a nice print of joins of results
# update each table
# reset data


# Database methods
def get_teams_data(database):
    cursor = database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM teams;")
    record = cursor.fetchall()
    return record


def get_drivers_data(database):
    cursor = database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM drivers;")
    record = cursor.fetchall()
    return record


def get_tracks_data(database):
    cursor = database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM tracks;")
    record = cursor.fetchall()
    return record


def get_races_data(database):
    cursor = database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT r.race_id, r.date, t.track_name, d.first_name, d.last_name FROM races r\n"
                   "JOIN tracks t ON t.track_id = r.track_id\n"
                   "JOIN drivers d ON d.driver_id = r.winner_driver_id;")
    record = cursor.fetchall()
    return record


def get_results_data(database):
    cursor = database.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT rt.result_id, r.date, t.track_name, t.country,"
                   "rt.position, d.first_name, d.last_name, rt.points\n"
                   "FROM results rt\n"
                   "JOIN races r ON r.race_id = rt.race_id\n"
                   "JOIN tracks t ON r.track_id = t.track_id\n"
                   "JOIN drivers d ON d.driver_id = rt.driver_id;")
    record = cursor.fetchall()
    return record


def get_database(database):
    db = databases.get(database)
    if not db:
        raise HTTPException(status_code=400, detail="Specify a database: database1, database2, or database3")
    return db


@app.get("/api/teams")
def get_teams(database):
    db = get_database(database)
    return get_teams_data(db)


@app.get("/api/drivers")
def get_drivers(database):
    db = get_database(database)
    return get_drivers_data(db)


@app.get("/api/tracks")
def get_tracks(database):
    db = get_database(database)
    return get_tracks_data(db)


@app.get("/api/races")
def get_races(database):
    db = get_database(database)
    return get_races_data(db)


@app.get("/api/results")
def get_results(database):
    db = get_database(database)
    return get_results_data(db)
