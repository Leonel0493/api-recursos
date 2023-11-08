import { Id } from "../../Shared/Domain/Id";
import { ProvinceName } from "../Domain/ProvinceName";
import { ProvinceRepository } from "../Domain/ProvinceRepository";

export class ProvinceValidations {
  constructor(private readonly repository: ProvinceRepository) {}

  async ProvinceNameExists(provinceName: string, idCountry: string) {
    const _idCountry = new Id(idCountry);
    const _provinceName = new ProvinceName(provinceName);

    const findProvinces = await this.repository.findByCountryId(_idCountry);

    if (findProvinces === null) return false;

    const foundProvince = findProvinces.some((province) => {
      const _foundProvinceName = new ProvinceName(province.province);

      return _provinceName.provinceName === _foundProvinceName.provinceName;
    });
    console.log(foundProvince);
    return foundProvince;
  }
}
