export interface CountryModel {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
  latitude: string;
  longitude: string;
  region: string;
  region_id: number;
  subregion: string;
  subregion_id: number;
  timezones: string;
}

export interface StateModel {
  id: number;
  name: string;
  iso2: string;
  country_id: number;
  country_code: string;
  latitude: string;
  longitude: string;
  timezone: string;
}
