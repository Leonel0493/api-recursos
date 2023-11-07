import getUuid from "../../Shared/Infra/uuidGenerator";
import { DocumentClass } from "../Domain/Document";
import { IDocument } from "../Domain/DocumentInterfaces";
import { DocumentRepository } from "../Domain/DocumentRepository";

export class SaveDocument {
  constructor(private readonly repository: DocumentRepository) {}

  async Save(
    document: string,
    parttern: string | null,
    id_country: string,
    created_by: string
  ): Promise<IDocument> {
    // TODO: Agregar validacion de nombre de documento en el mismo pais
    const _IDocument: IDocument = {
      id: getUuid(),
      document,
      parttern,
      id_country,
      created_by,
      created_at: new Date(),
      modified_by: null,
      modified_at: null,
      enabled: true,
    };

    const _document = new DocumentClass(_IDocument);

    return this.repository.save(_document);
  }
}
