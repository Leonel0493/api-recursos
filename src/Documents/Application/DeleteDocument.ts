import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import { DocumentClass } from "../Domain/Document";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { FindDocument } from "./FindDocument";

export class DeleteDocument {
  constructor(private readonly repository: DocumentRepository) {}

  async Delete(id: string): Promise<boolean> {
    const find = new FindDocument(this.repository);

    const foundDocument = await find.FindById(id);

    if (foundDocument !== null) {
      const currentDocument = new DocumentClass(foundDocument);
      currentDocument.DisabledDocument();

      return this.repository.delete(currentDocument);
    }

    throw new InvalidArgumentError(
      "Lo sentimos el documento que intentas eliminar no esta disponible"
    );
  }
}
