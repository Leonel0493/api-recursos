import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import getUuid from "../../Shared/Infra/uuidGenerator";
import { Country } from "../Domain/Country";
import { ICountry } from "../Domain/CountryInterfaces";
import { CountryRepository } from "../Domain/CountryRepository";
import { CountryValidations } from "./CountryValidations";

export class SaveCountry {
  constructor(private readonly repository: CountryRepository) {}

  async Save(
    country: string,
    abbreviation: string,
    flagImage: Buffer | null,
    createdBy: string
  ): Promise<ICountry> {
    // * Validate if country name allready exist
    const validations = new CountryValidations(this.repository);
    const exists = await validations.ValidateIfCountryNameExists(country);

    if (exists)
      throw new InvalidArgumentError(
        "Lo sentimos 😔, el nombre del pais que deseas guardar ya esta ocupado por favor intenta con otro"
      );

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
