import { Model, DataTypes } from "sequelize";
import sequelize from "./index";

class JsonFiles extends Model {
  public id!: string;
  public json!: string;
  public url!: string;
}

JsonFiles.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    json: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "json-files",
    tableName: "json-files",
    timestamps: false,
  }
);

export default JsonFiles;
