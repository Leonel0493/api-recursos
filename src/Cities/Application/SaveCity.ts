import getUuid from "../../Shared/Infra/uuidGenerator";
import { City } from "../Domain/City";
import { ICity } from "../Domain/CityInterfaces";
import { CityRepository } from "../Domain/CityRepository";

export class SaveCity {
  constructor(private readonly repository: CityRepository) {}

  async Save(
    city: string,
    id_province: string,
    created_by: string
  ): Promise<ICity> {
    const _Icity: ICity = {
      id: getUuid(),
      city,
      id_province,
      created_by,
      created_at: new Date(),
      modified_by: null,
      modified_at: null,
      enabled: true,
    };

    // TODO: Agregar una validacion de nombre previo en la provincia

    const _city = new City(_Icity);

    return this.repository.save(_city);
  }
}
