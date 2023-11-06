import "dotenv/config";
import { Sequelize } from "sequelize";

// * Set db credentials
const user = process.env.DB_RESOURCES_ADMIN_PROD_USER || "";
const pwd = process.env.DB_RESOURCES_ADMIN_PROD_PWD;
const host = process.env.DB_RESOURCES_PLANETSCALE_HOST;

const _DBResources = new Sequelize("recursos", user, pwd, {
  host,
  dialect: "mysql",
  ssl: true,
});

export default _DBResources;
