import { Id } from "../../Shared/Domain/Id";
import { IDocument } from "../Domain/DocumentInterfaces";
import { DocumentName } from "../Domain/DocumentName";
import { DocumentRepository } from "../Domain/DocumentRepository";

export class FindDocument {
  constructor(private readonly repository: DocumentRepository) {}

  async GetAll(): Promise<IDocument[]> {
    return this.repository.getAll();
  }

  async FindById(id: string): Promise<IDocument | null> {
    const _idDocument = new Id(id);
    return this.repository.findById(_idDocument);
  }

  async FindByDocumentName(documentName: string): Promise<boolean> {
    const _documentName = new DocumentName(documentName);
    return this.repository.findByDocumentName(_documentName);
  }

  async FindByCountryId(id: string): Promise<IDocument[] | null> {
    const _idCountry = new Id(id);
    return this.repository.findByCountryId(_idCountry);
  }
}
