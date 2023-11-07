import { Router } from "express";
import { SequelizeCityRepository } from "./SequelizeCityRepository";
import { SaveCity } from "../Application/SaveCity";
import { UpdateCity } from "../Application/UpdateCity";
import { DeleteCity } from "../Application/DeleteCity";
import { FindCities } from "../Application/FindCities";
import { CitiesController } from "./CityController";

// * init instance for router
const routes = Router();

// * Get repository for Cities
const sequelizeRepository = new SequelizeCityRepository();

// * setting uses cases
const _save = new SaveCity(sequelizeRepository);
const _update = new UpdateCity(sequelizeRepository);
const _delete = new DeleteCity(sequelizeRepository);
const _find = new FindCities(sequelizeRepository);

// * init CityController
const cityController = new CitiesController(_save, _update, _delete, _find);

// * setting routes for each action
routes.get("/", cityController.getAll);
routes.get("/:id", cityController.findByCityId);
routes.get("/byProvince/:idProvince", cityController.findByProvinceId);
routes.post("/", cityController.save);
routes.put("/", cityController.update);
routes.delete("/:id", cityController.delete);

export default routes;
