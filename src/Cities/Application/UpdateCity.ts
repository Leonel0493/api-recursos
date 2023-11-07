import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import { City } from "../Domain/City";
import { ICity, IUpdateCity } from "../Domain/CityInterfaces";
import { CityRepository } from "../Domain/CityRepository";
import { FindCities } from "./FindCities";

export class UpdateCity {
  constructor(private readonly repository: CityRepository) {}

  async Update(id: string, data: IUpdateCity): Promise<ICity> {
    const find = new FindCities(this.repository);
    const foundCity = await find.FindCityById(id);

    if (foundCity !== null) {
      const newCity = new City(foundCity);

      newCity.UpdateCityName(data.city);
      newCity.UpdateProvinceId(data.id_province);
      newCity.UpdateModifiedBy(data.modified_by);
      newCity.UpdateModifiedAt(new Date());

      return this.repository.update(newCity);
    }

    throw new InvalidArgumentError(
      "La ciudad que deseas actualizar no esta disponible"
    );
  }
}
