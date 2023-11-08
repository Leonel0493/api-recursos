import { CityName } from "../Domain/CityName";
import { CityRepository } from "../Domain/CityRepository";

export class CityValidations {
  constructor(private readonly repository: CityRepository) {}

  async CityNameExists(cityName: string, provinceId: string) {
    const _cityName = new CityName(cityName);
    const _city = await this.repository.findByCityName(_cityName);

    if (_city === null) return false;

    return true;
  }
}
