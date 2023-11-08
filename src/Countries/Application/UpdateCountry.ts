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

      newCountry.UpdateCountryName(data.country);
      newCountry.UpdateAbbreviation(data.abbreviation);
      newCountry.UpdateFlagImage(data.flag_img);
      newCountry.UpdateModifiedBy(data.modified_by);
      newCountry.UpdateModifiedAt(new Date());

      return this.repository.update(newCountry);
    }

    throw new InvalidArgumentError(
      "Lo sentimos 😔, no podemos actualizar el pais ya que el nombre esta ocupado o este no existe"
    );
  }
}
