import { Id } from "../../Shared/Domain/Id";
import { Province } from "./Province";
import { IProvince } from "./ProvinceInterfaces";
import { ProvinceName } from "./ProvinceName";

export interface ProvinceRepository {
  getAll(): Promise<IProvince[]>;
  findById(id: Id): Promise<IProvince | null>;
  findByCountryId(idCountry: Id): Promise<IProvince[] | null>;
  save(province: Province): Promise<IProvince>;
  update(province: Province): Promise<IProvince>;
  delete(province: Province): Promise<boolean>;
}
