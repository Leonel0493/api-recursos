import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import { DocumentClass } from "../Domain/Document";
import { IDocument, IUpdateDocument } from "../Domain/DocumentInterfaces";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { FindDocument } from "./FindDocument";

export class UpdateDocument {
  constructor(private readonly repository: DocumentRepository) {}

  async Update(id: string, data: IUpdateDocument): Promise<IDocument> {
    const find = new FindDocument(this.repository);
    const foundDocument = await find.FindById(id);

    if (foundDocument !== null) {
      const currentDocument = new DocumentClass(foundDocument);

      currentDocument.UpdateDocumentName(data.document);
      currentDocument.UpdateIdCountry(data.id_country);
      currentDocument.UpdateParttern(data.parttern);
      currentDocument.UpdateModifiedBy(data.modified_by);
      currentDocument.UpdateModifiedAt(new Date());

      return this.repository.update(currentDocument);
    }

    throw new InvalidArgumentError(
      "El documento que deseas actualizar no esta disponible"
    );
  }
}
