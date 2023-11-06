import getUuid from "../../Shared/Infra/uuidGenerator";
import { Province } from "../Domain/Province";
import { IProvince } from "../Domain/ProvinceInterfaces";
import { ProvinceRepository } from "../Domain/ProvinceRepository";

export class SaveProvince {
  constructor(private readonly repository: ProvinceRepository) {}

  async Save(
    province: string,
    idCountry: string,
    createdBy: string
  ): Promise<IProvince> {
    const data: IProvince = {
      id: getUuid(),
      province,
      id_country: idCountry,
      created_by: createdBy,
      created_at: new Date(),
      modified_by: null,
      modified_at: null,
      enabled: true,
    };

    // TODO: agregar validacion de nombre de la provincia

    const _province = new Province(data);

    return this.repository.save(_province);
  }
}
