import { Router } from "express";
import { SequelizeCountryRepository } from "./SequelizeCountryRepository";
import { SaveCountry } from "../Application/SaveCountry";
import { FindCountry } from "../Application/FindCountry";
import { UpdateCountry } from "../Application/UpdateCountry";
import { DeleteCountry } from "../Application/DeleteCountry";
import { CountryController } from "./CountryController";

// * init instance of Router
const routes = Router();

// * start current DB manager
const sequelizeRepository = new SequelizeCountryRepository();

// * Start use cases
const _save = new SaveCountry(sequelizeRepository);
const _search = new FindCountry(sequelizeRepository);
const _update = new UpdateCountry(sequelizeRepository);
const _delete = new DeleteCountry(sequelizeRepository);

// * Inizializate Controller
const countryController = new CountryController(
  _save,
  _update,
  _delete,
  _search
);

// * set routes for countries
routes.get("/", countryController.getAllCountries);
routes.get("/:id", countryController.findById);
routes.post("/", countryController.save);
routes.put("/", countryController.update);
routes.delete("/", countryController.delete);

export default routes;
