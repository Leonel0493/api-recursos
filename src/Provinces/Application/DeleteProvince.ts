import { Id } from "../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import { Province } from "../Domain/Province";
import { ProvinceRepository } from "../Domain/ProvinceRepository";
import { FindProvince } from "./FindProvince";

export class DeleteProvince {
  constructor(private readonly repository: ProvinceRepository) {}

  async Delete(id: string): Promise<boolean> {
    const idProvince = new Id(id);
    const find = new FindProvince(this.repository);
    const foundProvince = await find.FindById(idProvince.id);

    if (foundProvince === null)
      throw new InvalidArgumentError(
        "Lo siento la provincia que deseas eliminar no existe"
      );

    const deletedProvince = new Province(foundProvince);

    deletedProvince.DisableProvince();

    return this.repository.delete(deletedProvince);
  }
}
