import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import ComparisonModel from "./Comparison.js";

const Comparison = ComparisonModel(sequelize, DataTypes);

const db = {
  sequelize,
  Comparison,
};

export default db;
