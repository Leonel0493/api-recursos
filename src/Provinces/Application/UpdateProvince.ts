import { Id } from "../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import { Province } from "../Domain/Province";
import { IProvince, IUpdateProvince } from "../Domain/ProvinceInterfaces";
import { ProvinceRepository } from "../Domain/ProvinceRepository";
import { FindProvince } from "./FindProvince";

export class UpdateProvince {
  constructor(private readonly repository: ProvinceRepository) {}

  async Update(id: string, data: IUpdateProvince): Promise<IProvince> {
    const idProvince = new Id(id);
    const find = new FindProvince(this.repository);
    const foundProvince = await find.FindById(idProvince.id);

    if (foundProvince !== null) {
      const newProvince = new Province(foundProvince);

      newProvince.UpdateIdCountry(data.id_country);
      newProvince.UpdateProvinceName(data.province);
      newProvince.UpdateModifiedBy(data.modified_by);
      newProvince.UpdateModifiedAt(new Date());

      return this.repository.update(newProvince);
    }

    throw new InvalidArgumentError(
      "Lo sentimos la provincia a actualizar no esta disponible"
    );
  }
}
