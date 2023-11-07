import { Id } from "../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";
import _Cities from "../../Shared/ResourcesDB/Domain/_City";
import { City } from "../Domain/City";
import { ICity } from "../Domain/CityInterfaces";
import { CityName } from "../Domain/CityName";
import { CityRepository } from "../Domain/CityRepository";

export class SequelizeCityRepository implements CityRepository {
  async save(city: City): Promise<ICity> {
    const _city = city.GetPrimitives();

    const savedCity = await _Cities.create({
      id: _city.id,
      city: _city.city,
      id_province: _city.id_province,
      created_by: _city.created_by,
      created_at: _city.created_at,
      enabled: _city.enabled,
    });

    if (savedCity === null)
      throw new InvalidArgumentError("Error al guardar las ciudad");

    return savedCity;
  }

  async update(city: City): Promise<ICity> {
    const _city = city.GetPrimitives();

    const [newCity] = await _Cities.update(
      {
        city: _city.city,
        id_province: _city.id_province,
        modified_by: _city.modified_by,
        modified_at: _city.modified_at,
      },
      {
        where: { id: _city.id },
      }
    );

    if (newCity === 0)
      throw new InvalidArgumentError(
        "Lo sentimos no hemos podido actualizar los datos de la ciudad"
      );

    return _city;
  }

  async delete(city: City): Promise<boolean> {
    const _city = city.GetPrimitives();

    const [disabledCity] = await _Cities.update(
      {
        enabled: _city.enabled,
      },
      {
        where: { id: _city.id },
      }
    );

    return disabledCity === 0 ? false : true;
  }

  async getAll(): Promise<ICity[]> {
    const allCities = await _Cities.findAll({
      where: { enabled: true },
      raw: true,
    });

    return allCities;
  }

  async findById(id: Id): Promise<ICity | null> {
    const foundCity = await _Cities.findOne({
      where: { id: id.id, enabled: true },
      raw: true,
    });

    return foundCity;
  }

  async findByCityName(cityName: CityName): Promise<boolean> {
    const foundCity = await _Cities.findOne({
      where: { city: cityName.cityName },
      raw: true,
    });

    return foundCity === null ? false : true;
  }

  async findeByProvinceId(idProvince: Id): Promise<ICity[] | null> {
    const citiesByProvince = await _Cities.findAll({
      where: { id_province: idProvince.id, enabled: true },
      raw: true,
    });

    return citiesByProvince;
  }
}
