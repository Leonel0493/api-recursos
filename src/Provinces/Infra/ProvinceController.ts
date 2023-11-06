import { Request, Response } from "express";
import { DeleteProvince } from "../Application/DeleteProvince";
import { FindProvince } from "../Application/FindProvince";
import { SaveProvince } from "../Application/SaveProvince";
import { UpdateProvince } from "../Application/UpdateProvince";
import {
  IRequestDataSave,
  IRequestDataUpdate,
  IUpdateProvince,
} from "../Domain/ProvinceInterfaces";
import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";

export class ProvinceController {
  constructor(
    private Save: SaveProvince,
    private Update: UpdateProvince,
    private Delete: DeleteProvince,
    private Find: FindProvince
  ) {}

  public save = async (
    req: Request<{}, {}, IRequestDataSave>,
    res: Response
  ) => {
    try {
      const { province, id_country, created_by } = req.body;
      const provinceSaved = await this.Save.Save(
        province,
        id_country,
        created_by
      );

      return res.status(201).json(provinceSaved);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public update = async (
    req: Request<{}, {}, IRequestDataUpdate>,
    res: Response
  ) => {
    try {
      const { id, province, id_country, modified_by } = req.body;
      const newData: IUpdateProvince = {
        province,
        id_country,
        modified_by,
      };
      const updatedProvince = await this.Update.Update(id, newData);

      return res.status(200).json(updatedProvince);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public deleted = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const isDisabled = await this.Delete.Delete(id);

      return isDisabled
        ? res.status(200).json({ message: "La provincia fue eliminada" })
        : res.status(400).json({
            message:
              "Lo sentimos no se pudo eliminar la provincia intente mas tarde.",
          });
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    try {
      const all = await this.Find.GetAll();

      return res.status(200).json(all);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json(error);
    }
  };

  public findeById = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const province = await this.Find.FindById(id);

      return res.status(200).json(province);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public findByCountryId = async (
    req: Request<{ idCountry: string }>,
    res: Response
  ) => {
    try {
      const { idCountry } = req.params;

      const provices = await this.Find.FindByCountryId(idCountry);

      return res.status(200).json(provices);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };
}
