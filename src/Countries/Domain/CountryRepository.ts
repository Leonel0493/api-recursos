import { Id } from "../../Shared/Domain/Id";
import { Country } from "./Country";
import { ICountry } from "./CountryInterfaces";

export interface CountryRepository {
  getAll(): Promise<ICountry[]>;
  save(country: Country): Promise<ICountry>;
  search(id: Id): Promise<ICountry | null>;
  update(country: Country): Promise<ICountry>;
  delete(id: Id): Promise<boolean>;
}
