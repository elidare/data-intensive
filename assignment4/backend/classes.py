from pydantic import BaseModel
from typing import Optional, get_type_hints


class TeamPostgres(BaseModel):
    team_name: Optional[str] = None
    base_country: Optional[str] = None
    principal: Optional[str] = None


class TeamMongo(BaseModel):
    staff_number: Optional[int] = None
    championship_position: Optional[int] = None
    team_name: Optional[str] = None


class TeamUpdate(TeamPostgres, TeamMongo):
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


class TrackMongo(BaseModel):
    track_name: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    record_lap_driver: Optional[str] = None


class TrackUpdate(TrackPostgres, TrackMongo):
    pass


def split_update_data(data: dict, mongo_fields: set, postgres_fields: set):
    mongo_data = {k: v for k, v in data.items() if k in mongo_fields}
    postgres_data = {k: v for k, v in data.items() if k in postgres_fields}
    return mongo_data, postgres_data


def split_update_teams_data(data: dict):
    mongo_fields = set(get_type_hints(TeamMongo).keys())
    postgres_fields = set(get_type_hints(TeamPostgres).keys())
    mongo_data, postgres_data = split_update_data(data, mongo_fields, postgres_fields)
    return mongo_data, postgres_data


def split_update_drivers_data(data: dict):
    mongo_fields = set(get_type_hints(DriverMongo).keys())
    postgres_fields = set(get_type_hints(DriverPostgres).keys())
    mongo_data, postgres_data = split_update_data(data, mongo_fields, postgres_fields)
    return mongo_data, postgres_data


def split_update_tracks_data(data: dict):
    mongo_fields = set(get_type_hints(TrackMongo).keys())
    postgres_fields = set(get_type_hints(TrackPostgres).keys())
    mongo_data, postgres_data = split_update_data(data, mongo_fields, postgres_fields)
    return mongo_data, postgres_data
