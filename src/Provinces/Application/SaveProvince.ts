import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import getUuid from "../../Shared/Infra/uuidGenerator";
import { Province } from "../Domain/Province";
import { IProvince } from "../Domain/ProvinceInterfaces";
import { ProvinceRepository } from "../Domain/ProvinceRepository";
import { ProvinceValidations } from "./ProvinceValidations";

export class SaveProvince {
  constructor(private readonly repository: ProvinceRepository) {}

  async Save(
    province: string,
    idCountry: string,
    createdBy: string
  ): Promise<IProvince> {
    const validations = new ProvinceValidations(this.repository);
    const exists = await validations.ProvinceNameExists(province, idCountry);

    if (exists)
      throw new InvalidArgumentError(
        "Lo sentimos 😔, el nombre de la provincia ya esta asignado al pais que deseas agregarla"
      );

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

    const _province = new Province(data);

    return this.repository.save(_province);
  }
}
