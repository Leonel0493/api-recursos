export interface IDocument {
  id: string;
  document: string;
  parttern: string | null;
  id_country: string;
  created_by: string;
  created_at: Date;
  modified_by: string | null;
  modified_at: Date | null;
  enabled: boolean;
}

export interface IUpdateDocument {
  document: string;
  parttern: string | null;
  id_country: string;
  modified_by: string;
}

export interface IRequestDataSaveDocument {
  document: string;
  id_country: string;
  parttern: string | null;
  user: string;
}

export interface IRequestDataUpdateDocument {
  id: string;
  document: string;
  id_country: string;
  parttern: string | null;
  user: string;
}
