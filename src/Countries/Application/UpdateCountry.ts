import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import { Country } from "../Domain/Country";
import { IUpdateCountryData } from "../Domain/CountryInterfaces";
import { CountryRepository } from "../Domain/CountryRepository";
import { FindCountry } from "./FindCountry";

export class UpdateCountry {
  constructor(private readonly repository: CountryRepository) {}

  async Update(id: string, data: IUpdateCountryData) {
    const find = new FindCountry(this.repository);
    const countryToUpdate = await find.FindById(id);

    if (countryToUpdate !== null) {
      const newCountry = new Country(countryToUpdate);

      // TODO: Agregar validacion de nombre de pais antes de actualizar los datos

      newCountry.UpdateCountryName(data.country);
      newCountry.UpdateAbbreviation(data.abbreviation);
      newCountry.UpdateFlagImage(data.flag_img);
      newCountry.UpdateModifiedBy(data.modified_by);
      newCountry.UpdateModifiedAt(new Date());

      return this.repository.update(newCountry);
    }

    throw new InvalidArgumentError(
      "Lo sentimos el pais que desea actualizar no existe, por favor ingrese uno nuevo"
    );
  }
}
