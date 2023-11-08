import { Id } from "../../Shared/Domain/Id";
import { Country } from "./Country";
import { ICountry } from "./CountryInterfaces";
import { CountryName } from "./CountryName";

export interface CountryRepository {
  getAll(): Promise<ICountry[]>;
  findeById(id: Id): Promise<ICountry | null>;
  findByName(countryName: CountryName): Promise<ICountry | null>;
  save(country: Country): Promise<ICountry>;
  update(country: Country): Promise<ICountry>;
  delete(id: Id): Promise<boolean>;
}
