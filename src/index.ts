import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";

// * import routes
import CityRoutes from "./Cities/Infra/City.routes";
import CountryRoutes from "./Countries/Infra/Country.routes";
import DocumentRoutes from "./Documents/Infra/Document.routes";
import ProvinceRoutes from "./Provinces/Infra/Provinces.routes";

const app = express();

// * configure middeleware's
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// * api routes
app.use("/api/v1/city", CityRoutes);
app.use("/api/v1/country", CountryRoutes);
app.use("/api/v1/documents", DocumentRoutes);
app.use("/api/v1/province", ProvinceRoutes);

// * config express
const port = process.env.API_PORT || 3000;

app.listen(port, () =>
  console.info(`marcaciones - API RUNNING ON PORT ${port}`)
);
