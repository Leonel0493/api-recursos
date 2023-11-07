import { DataTypes, Model } from "sequelize";
import { IDocument } from "../../../Documents/Domain/DocumentInterfaces";
import _DBResources from "../Infra/Sequelize.conf";

abstract class DocumentDBModel extends Model<IDocument> {
  id!: string;
  document!: string;
  parttern!: string | null;
  id_country!: string;
  created_by!: string;
  created_at!: Date;
  modified_by!: string | null;
  modified_at!: Date | null;
  enabled!: boolean;
}

class _Documents extends DocumentDBModel {}

_Documents.init(
  {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    document: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    parttern: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    id_country: {
      type: DataTypes.STRING(50),
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
    tableName: "documents",
    modelName: "_Documents",
    timestamps: false,
  }
);

export default _Documents;
