export interface IProvince {
  id: string;
  province: string;
  id_country: string;
  created_by: string;
  created_at: Date;
  modified_by: string | null;
  modified_at: Date | null;
  enabled: boolean;
}

export interface IUpdateProvince {
  province: string;
  id_country: string;
  modified_by: string;
}

export interface IRequestDataSave {
  province: string;
  id_country: string;
  created_by: string;
}

export interface IRequestDataUpdate {
  id: string;
  province: string;
  id_country: string;
  modified_by: string;
}
