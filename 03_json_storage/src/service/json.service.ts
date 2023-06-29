import JsonFilesModel from "../../models/JsonFilesModel";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../exeptions/api.errors";

class JsonService {
  async putNewJson(jsonUrl: string, json: any) {
    const jsonCadidate = await JsonFilesModel.findAll({
      attributes: ["json"],
      where: {
        url: jsonUrl,
      },
    });
    if (jsonCadidate.length !== 0) {
      throw ApiError.Conflict(
        `Json file with this url:${jsonUrl} already exist`
      );
    }
    const foramtedJson = JSON.stringify(json);
    const jsonId = uuidv4();
    const newJson = await JsonFilesModel.create({
      id: jsonId,
      json: foramtedJson,
      url: jsonUrl,
    });
    return JSON.parse(foramtedJson);
  }

  async getJson(jsonUrl: string) {
    const findJson = await JsonFilesModel.findAll({
      attributes: ["json"],
      where: {
        url: jsonUrl,
      },
    });

    if (findJson.length === 0) {
      throw ApiError.JsonNotFound(`Json file with url:${jsonUrl} not found`);
    }

    return JSON.parse(findJson[0].dataValues.json);
  }
}

export default new JsonService();
