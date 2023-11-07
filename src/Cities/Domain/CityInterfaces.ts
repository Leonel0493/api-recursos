export interface ICity {
  id: string;
  city: string;
  id_province: string;
  created_by: string;
  created_at: Date;
  modified_by: string | null;
  modified_at: Date | null;
  enabled: boolean;
}

export interface IUpdateCity {
  city: string;
  id_province: string;
  modified_by: string;
}

export interface IDataRquestSave {
  city: string;
  id_province: string;
  created_by: string;
}

export interface IDataRequestUpdate {
  id: string;
  city: string;
  id_province: string;
  modified_by: string;
}
