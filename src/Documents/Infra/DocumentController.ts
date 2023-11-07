import { Request, Response } from "express";
import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import { SaveDocument } from "../Application/SaveDocument";
import { UpdateDocument } from "../Application/UpdateDocument";
import { FindDocument } from "../Application/FindDocument";
import { DeleteDocument } from "../Application/DeleteDocument";
import {
  IRequestDataSaveDocument,
  IRequestDataUpdateDocument,
  IUpdateDocument,
} from "../Domain/DocumentInterfaces";

export class DocumentController {
  constructor(
    private Save: SaveDocument,
    private Update: UpdateDocument,
    private Find: FindDocument,
    private Delete: DeleteDocument
  ) {}

  public save = async (
    req: Request<{}, {}, IRequestDataSaveDocument>,
    res: Response
  ) => {
    try {
      const { document, id_country, parttern, user } = req.body;
      const savedDocument = await this.Save.Save(
        document,
        parttern,
        id_country,
        user
      );

      return res.status(201).json(savedDocument);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ messge: error.message });

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public update = async (
    req: Request<{}, {}, IRequestDataUpdateDocument>,
    res: Response
  ) => {
    try {
      const { id, document, id_country, parttern, user } = req.body;
      const newData: IUpdateDocument = {
        document,
        id_country,
        parttern,
        modified_by: user,
      };

      const updatedDocument = await this.Update.Update(id, newData);

      return res.status(200).json(updatedDocument);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ messge: error.message });

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public delete = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const isDisabled = await this.Delete.Delete(id);

      return isDisabled
        ? res.status(200).json({ message: "El documento fue eliminado 😁." })
        : res.status(400).json({
            message:
              "Lo sentimos no hemos podido eliminar el documento, intente mas tarde 😔.",
          });
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    try {
      const allDocuemnts = await this.Find.GetAll();

      return res.status(200).json(allDocuemnts);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json(error);
    }
  };

  public findById = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const document = await this.Find.FindById(id);

      return res.status(200).json(document);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public findByCountryId = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const documents = await this.Find.FindByCountryId(id);

      return res.status(200).json(documents);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };
}
