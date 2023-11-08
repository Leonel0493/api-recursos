import { Id } from "../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import _Provinces from "../../Shared/ResourcesDB/Domain/_Province";
import { Province } from "../Domain/Province";
import { IProvince } from "../Domain/ProvinceInterfaces";
import { ProvinceName } from "../Domain/ProvinceName";
import { ProvinceRepository } from "../Domain/ProvinceRepository";

export class SequelizeProvinceRepository implements ProvinceRepository {
  async save(province: Province): Promise<IProvince> {
    const _province = province.getPrimitives();

    const savedProvince = await _Provinces.create({
      id: _province.id,
      province: _province.province,
      id_country: _province.id_country,
      created_by: _province.created_by,
      created_at: _province.created_at,
      enabled: _province.enabled,
    });

    if (savedProvince === null)
      throw new InvalidArgumentError("Error al guardar la provicia");

    return savedProvince;
  }

  async update(province: Province): Promise<IProvince> {
    const _province = province.getPrimitives();

    const [newProvince] = await _Provinces.update(
      {
        province: _province.province,
        id_country: _province.id_country,
        modified_by: _province.modified_by,
        modified_at: _province.modified_at,
      },
      {
        where: { id: _province.id },
      }
    );

    if (newProvince === 0)
      throw new InvalidArgumentError(
        "Lo sentimos no podemos actualizar la informacion de esta provincia"
      );

    return _province;
  }

  async delete(province: Province): Promise<boolean> {
    const _provinces = province.getPrimitives();
    const [_disabledProvince] = await _Provinces.update(
      {
        enabled: _provinces.enabled,
      },
      {
        where: { id: _provinces.id },
      }
    );

    return _disabledProvince === 0 ? false : true;
  }

  async getAll(): Promise<IProvince[]> {
    const allProvinces = await _Provinces.findAll({
      where: { enabled: true },
      raw: true,
    });

    return allProvinces;
  }

  async findById(id: Id): Promise<IProvince | null> {
    const foundProvince = await _Provinces.findOne({
      where: { id: id.id, enabled: true },
      raw: true,
    });

    return foundProvince;
  }

  async findByCountryId(idCountry: Id): Promise<IProvince[] | null> {
    const allProvinces = await _Provinces.findAll({
      where: { id_country: idCountry.id, enabled: true },
      raw: true,
    });

    return allProvinces;
  }

  async findByProvinceName(
    provinceName: ProvinceName
  ): Promise<IProvince | null> {
    const foundProvince = await _Provinces.findOne({
      where: { province: provinceName.provinceName },
      raw: true,
    });

    return foundProvince;
  }
}
