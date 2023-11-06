import { Request, Response } from "express";
import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import {
  ISaveRequestData,
  IUpdateCountryData,
  IUpdateRequestData,
} from "../Domain/CountryInterfaces";
import { SaveCountry } from "../Application/SaveCountry";
import { UpdateCountry } from "../Application/UpdateCountry";
import { DeleteCountry } from "../Application/DeleteCountry";
import { FindCountry } from "../Application/FindCountry";

export class CountryController {
  constructor(
    private Save: SaveCountry,
    private Update: UpdateCountry,
    private Delete: DeleteCountry,
    private Find: FindCountry
  ) {}

  public findById = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const data = await this.Find.FindById(id);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public getAllCountries = async (_req: Request, res: Response) => {
    try {
      const data = await this.Find.GetAll();

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public save = async (
    req: Request<{}, {}, ISaveRequestData>,
    res: Response
  ) => {
    try {
      const { country, abbreviation, flagImage, createdBy } = req.body;

      const countrySaved = await this.Save.Save(
        country,
        abbreviation,
        flagImage,
        createdBy
      );

      return res.status(201).json(countrySaved);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json(error);
    }
  };

  public update = async (
    req: Request<{}, {}, IUpdateRequestData>,
    res: Response
  ) => {
    try {
      const { id, country, abbreviation, flagImage, modifiedBy } = req.body;

      const _data: IUpdateCountryData = {
        abbreviation,
        country,
        flag_img: flagImage,
        modified_by: modifiedBy,
      };

      const newCountry = await this.Update.Update(id, _data);

      return res.status(200).json({ newCountry });
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public delete = async (
    req: Request<{}, {}, { id: string }>,
    res: Response
  ) => {
    try {
      const { id } = req.body;

      const isDisabled = await this.Delete.Delete(id);

      return isDisabled
        ? res.status(200).json({ message: "El pais fue eliminado" })
        : res.status(400).json({
            message:
              "Lo sentimos no se pudo eliminar el pais intente mas tarde.",
          });
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };
}
