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


class DriverUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    nationality: Optional[str] = None
    team_id: Optional[int] = None


class TrackUpdate(BaseModel):
    track_name: Optional[str] = None
    location: Optional[str] = None
    country: Optional[str] = None
    length_km: Optional[float] = None
    laps: Optional[int] = None


def split_update_data(data: dict, mongo_fields: set, postgres_fields: set):
    mongo_data = {k: v for k, v in data.items() if k in mongo_fields}
    postgres_data = {k: v for k, v in data.items() if k in postgres_fields}
    return mongo_data, postgres_data


def split_update_teams_data(data: dict):
    mongo_fields = set(get_type_hints(TeamMongo).keys())
    postgres_fields = set(get_type_hints(TeamPostgres).keys())
    mongo_data, postgres_data = split_update_data(data, mongo_fields, postgres_fields)
    return mongo_data, postgres_data
