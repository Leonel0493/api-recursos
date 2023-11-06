import { Id } from "../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import { CountryRepository } from "../Domain/CountryRepository";
import { FindCountry } from "./FindCountry";

export class DeleteCountry {
  constructor(private readonly repository: CountryRepository) {}

  async Delete(id: string): Promise<boolean> {
    const find = new FindCountry(this.repository);
    const countryExist = await find.FindById(id);

    if (countryExist === null)
      throw new InvalidArgumentError(
        "Lo siento el pais que deseas eliminar no existe"
      );

    const countryId = new Id(id);
    return this.repository.delete(countryId);
  }
}
