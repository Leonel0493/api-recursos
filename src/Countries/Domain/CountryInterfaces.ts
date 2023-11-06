export interface ICountry {
  id: string;
  country: string;
  abbreviation: string;
  flag_img: Buffer | null;
  created_by: string;
  created_at: Date;
  modified_by: string | null;
  modified_at: Date | null;
  enabled: boolean;
}

export interface IUpdateCountryData {
  country: string;
  abbreviation: string;
  flag_img: Buffer | null;
  modified_by: string;
}

export interface ISaveRequestData {
  country: string;
  abbreviation: string;
  flagImage: Buffer | null;
  createdBy: string;
}

export interface IUpdateRequestData {
  id: string;
  country: string;
  abbreviation: string;
  flagImage: Buffer | null;
  modifiedBy: string;
}
