import { DataTypes, Model } from "sequelize";
import { IProvince } from "../../../Provinces/Domain/ProvinceInterfaces";
import _DBResources from "../Infra/Sequelize.conf";

abstract class ProvinceDbModel extends Model<IProvince> {
  id!: string;
  province!: string;
  id_country!: string;
  created_by!: string;
  created_at!: Date;
  modified_by!: string | null;
  modified_at!: Date | null;
  enabled!: boolean;
}

class _Provinces extends ProvinceDbModel {}

_Provinces.init(
  {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_country: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    modified_by: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: _DBResources,
    tableName: "provinces",
    modelName: "_Provinces",
    timestamps: false,
  }
);

export default _Provinces;
