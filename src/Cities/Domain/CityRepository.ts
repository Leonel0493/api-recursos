import { Id } from "../../Shared/Domain/Id";
import { City } from "./City";
import { ICity } from "./CityInterfaces";
import { CityName } from "./CityName";

export interface CityRepository {
  getAll(): Promise<ICity[]>;
  findById(id: Id): Promise<ICity | null>;
  findeByProvinceId(idProvince: Id): Promise<ICity[] | null>;
  findByCityName(cityName: CityName): Promise<ICity | null>;
  save(city: City): Promise<ICity>;
  update(city: City): Promise<ICity>;
  delete(city: City): Promise<boolean>;
}
