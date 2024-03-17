import express from "express";
import { create, getAll, getOne, remove, update } from "../controller/friendController.js";

const route = express.Router();

route.post("/create", create);
route.get("/get", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", remove);

export default route;