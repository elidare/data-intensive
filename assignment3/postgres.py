import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

hostname = "localhost"
username = os.getenv('DB_USER')
pswd = os.getenv('DB_PASSWORD')
dbname_1 = os.getenv('DB_NAME_1')
dbname_2 = os.getenv('DB_NAME_2')
dbname_3 = os.getenv('DB_NAME_3')
dbport_1 = os.getenv('DB_PORT_1')
dbport_2 = os.getenv('DB_PORT_2')
dbport_3 = os.getenv('DB_PORT_3')


database_1 = psycopg2.connect(database=dbname_1, user=username, password=pswd, host=hostname, port=dbport_1)

cursor = database_1.cursor()

cursor.execute("SELECT * FROM teams;")

record = cursor.fetchall()
print("Data from Database: ", record)
