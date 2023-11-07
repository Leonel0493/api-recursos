import { Id } from "../../Shared/Domain/Id";
import { DocumentClass } from "./Document";
import { IDocument } from "./DocumentInterfaces";
import { DocumentName } from "./DocumentName";

export interface DocumentRepository {
  getAll(): Promise<IDocument[]>;
  findById(id: Id): Promise<IDocument | null>;
  findByDocumentName(documentName: DocumentName): Promise<boolean>;
  findByCountryId(idCountry: Id): Promise<IDocument[] | null>;
  save(document: DocumentClass): Promise<IDocument>;
  update(document: DocumentClass): Promise<IDocument>;
  delete(document: DocumentClass): Promise<boolean>;
}
