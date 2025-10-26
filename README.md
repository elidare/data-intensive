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
