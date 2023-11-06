import getUuid from "../../Shared/Infra/uuidGenerator";
import { Country } from "../Domain/Country";
import { ICountry } from "../Domain/CountryInterfaces";
import { CountryRepository } from "../Domain/CountryRepository";

export class SaveCountry {
  constructor(private readonly repository: CountryRepository) {}

  async Save(
    country: string,
    abbreviation: string,
    flagImage: Buffer | null,
    createdBy: string
  ): Promise<ICountry> {
    // TODO: Agregar validacion de nombre de Pais para que no existan dos suplicados, recomendable agregar campo unique a DB

    const _Icountry: ICountry = {
      id: getUuid(),
      country,
      abbreviation,
      flag_img: flagImage,
      created_by: createdBy,
      created_at: new Date(),
      modified_at: null,
      modified_by: null,
      enabled: true,
    };

    const _country = new Country(_Icountry);

    return this.repository.save(_country);
  }
}
