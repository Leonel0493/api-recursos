import { Router } from "express";
import { SequelizeProvinceRepository } from "./SequelizeProvinceRepository";
import { SaveProvince } from "../Application/SaveProvince";
import { UpdateProvince } from "../Application/UpdateProvince";
import { DeleteProvince } from "../Application/DeleteProvince";
import { FindProvince } from "../Application/FindProvince";
import { ProvinceController } from "./ProvinceController";

// * init instance of Router
const routes = Router();

// * start DB infra
const sequelizeRepository = new SequelizeProvinceRepository();

// * init use cases
const _save = new SaveProvince(sequelizeRepository);
const _update = new UpdateProvince(sequelizeRepository);
const _delete = new DeleteProvince(sequelizeRepository);
const _find = new FindProvince(sequelizeRepository);

// * init controller
const provinceController = new ProvinceController(
  _save,
  _update,
  _delete,
  _find
);

// * set routes
routes.get("/", provinceController.getAll);
routes.get("/:id", provinceController.findeById);
routes.get("/byCountry/:idCountry", provinceController.findByCountryId);
routes.post("/", provinceController.save);
routes.put("/", provinceController.update);
routes.delete("/:id", provinceController.deleted);

export default routes;
