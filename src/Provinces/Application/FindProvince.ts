import { Id } from "../../Shared/Domain/Id";
import { IProvince } from "../Domain/ProvinceInterfaces";
import { ProvinceName } from "../Domain/ProvinceName";
import { ProvinceRepository } from "../Domain/ProvinceRepository";

export class FindProvince {
  constructor(private readonly repository: ProvinceRepository) {}

  async GetAll(): Promise<IProvince[]> {
    return this.repository.getAll();
  }

  async FindById(id: string): Promise<IProvince | null> {
    const _idProvince = new Id(id);
    return this.repository.findById(_idProvince);
  }

  async FindByCountryId(idCountry: string): Promise<IProvince[] | null> {
    const _idCountry = new Id(idCountry);
    return this.repository.findByCountryId(_idCountry);
  }

  async FindByProvinceName(provinceName: string): Promise<boolean> {
    const _provinceName = new ProvinceName(provinceName);
    return this.repository.findByProvinceName(_provinceName);
  }
}
