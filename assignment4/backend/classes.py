from pydantic import BaseModel
from typing import Optional


class TeamUpdate(BaseModel):
    team_name: Optional[str] = None
    base_country: Optional[str] = None
    principal: Optional[str] = None


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
