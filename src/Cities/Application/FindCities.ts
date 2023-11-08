import { Id } from "../../Shared/Domain/Id";
import { ICity } from "../Domain/CityInterfaces";
import { CityName } from "../Domain/CityName";
import { CityRepository } from "../Domain/CityRepository";

export class FindCities {
  constructor(private readonly repository: CityRepository) {}

  async GetAll(): Promise<ICity[]> {
    return this.repository.getAll();
  }

  async FindCityById(id: string): Promise<ICity | null> {
    const _idCity = new Id(id);
    return this.repository.findById(_idCity);
  }

  async FindByCityName(cityName: string): Promise<ICity | null> {
    const _cityName = new CityName(cityName);
    return this.repository.findByCityName(_cityName);
  }

  async FindCityByProvinceId(idProvince: string): Promise<ICity[] | null> {
    const _idCity = new Id(idProvince);
    return this.repository.findeByProvinceId(_idCity);
  }
}
