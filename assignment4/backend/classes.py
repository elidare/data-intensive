from pydantic import BaseModel
from typing import Optional, get_type_hints


class TeamPostgres(BaseModel):
    team_name: Optional[str] = None
    base_country: Optional[str] = None
    principal: Optional[str] = None


class TeamPostgresRequired(BaseModel):
    team_name: str
    base_country: str
    principal: str


class TeamMongo(BaseModel):
    staff_number: Optional[int] = None
    championship_position: Optional[int] = None
    team_name: Optional[str] = None


class TeamMongoRequired(BaseModel):
    staff_number: int
    championship_position: int
    team_name: int


class TeamUpdate(TeamPostgres, TeamMongo):
    pass


class TeamInsert(TeamPostgresRequired, TeamMongoRequired):
    pass


class DriverPostgres(BaseModel):
    full_name: Optional[str] = None
    nationality: Optional[str] = None
    team_id: Optional[int] = None


class DriverMongo(BaseModel):
    full_name: Optional[str] = None
    social_media: Optional[str] = None
    championship_position: Optional[int] = None


class DriverUpdate(DriverPostgres, DriverMongo):
    pass


class TrackPostgres(BaseModel):
    track_name: Optional[str] = None
    location: Optional[str] = None
    country: Optional[str] = None
    length_km: Optional[float] = None
    laps: Optional[int] = None


class TrackPostgresRequired(BaseModel):
    track_name: str
    location: str
    country: str
    length_km: float
    laps: int


class TrackMongo(BaseModel):
    track_name: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    record_lap_driver: Optional[str] = None


class TrackMongoRequired(BaseModel):
    track_name: str
    lat: float
    lng: float
    record_lap_driver: str


class TrackUpdate(TrackPostgres, TrackMongo):
    pass


class TrackInsert(TrackPostgresRequired, TrackMongoRequired):
    pass


def split_data(data: dict, *models):
    mongo_fields = set(get_type_hints(models[0]).keys())
    postgres_fields = set(get_type_hints(models[1]).keys())
    mongo_data = {k: v for k, v in data.items() if k in mongo_fields}
    postgres_data = {k: v for k, v in data.items() if k in postgres_fields}
    return mongo_data, postgres_data


def split_update_teams_data(data: dict):
    mongo_data, postgres_data = split_data(data, TeamMongo, TeamPostgres)
    return mongo_data, postgres_data


def split_insert_teams_data(data: dict):
    mongo_data, postgres_data = split_data(data, TeamMongoRequired, TeamPostgresRequired)
    return mongo_data, postgres_data


def split_update_drivers_data(data: dict):
    mongo_data, postgres_data = split_data(data, DriverMongo, DriverPostgres)
    return mongo_data, postgres_data


def split_update_tracks_data(data: dict):
    mongo_data, postgres_data = split_data(data, TrackMongo, TrackPostgres)
    return mongo_data, postgres_data


def split_insert_tracks_data(data: dict):
    mongo_data, postgres_data = split_data(data, TrackMongoRequired, TrackPostgresRequired)
    return mongo_data, postgres_data

