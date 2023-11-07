import { Router } from "express";
import { SequelizeDocumentRepository } from "./SequelizeDocumentRepository";
import { SaveDocument } from "../Application/SaveDocument";
import { UpdateDocument } from "../Application/UpdateDocument";
import { DeleteDocument } from "../Application/DeleteDocument";
import { FindDocument } from "../Application/FindDocument";
import { DocumentController } from "./DocumentController";

// * init instance for Router
const routes = Router();

// * Get document repository
const sequelizeRepository = new SequelizeDocumentRepository();

// * setting use cases
const _save = new SaveDocument(sequelizeRepository);
const _update = new UpdateDocument(sequelizeRepository);
const _delete = new DeleteDocument(sequelizeRepository);
const _find = new FindDocument(sequelizeRepository);

// * inir controller for Documents
const documentController = new DocumentController(
  _save,
  _update,
  _find,
  _delete
);

// * set routes for each use case
routes.get("/", documentController.getAll);
routes.get("/:id", documentController.findById);
routes.get("/byCountry/:id", documentController.findByCountryId);
routes.post("/", documentController.save);
routes.put("/", documentController.update);
routes.delete("/", documentController.delete);

export default routes;
