import { CountryName } from "../Domain/CountryName";
import { CountryRepository } from "../Domain/CountryRepository";

export class CountryValidations {
  constructor(private readonly repository: CountryRepository) {}

  async ValidateIfCountryNameExists(countyName: string): Promise<boolean> {
    const _countryName = new CountryName(countyName);
    const _country = await this.repository.findByName(_countryName);

    if (_country === null) return false;

    return true;
  }
}
