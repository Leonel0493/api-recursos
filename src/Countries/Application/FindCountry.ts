import { Id } from "../../Shared/Domain/Id";
import { ICountry } from "../Domain/CountryInterfaces";
import { CountryName } from "../Domain/CountryName";
import { CountryRepository } from "../Domain/CountryRepository";

export class FindCountry {
  constructor(private readonly repository: CountryRepository) {}

  async FindById(id: string): Promise<ICountry | null> {
    const countryId = new Id(id);
    return this.repository.findeById(countryId);
  }

  async FindByCountryName(name: string): Promise<ICountry | null> {
    const countryName = new CountryName(name);
    return this.repository.findByName(countryName);
  }

  async GetAll(): Promise<ICountry[]> {
    return this.repository.getAll();
  }
}
