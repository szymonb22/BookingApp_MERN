import express from "express";
import { createRoom, deleteRooms, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controlles/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.get("/:hotelid", verifyAdmin, createRoom)
//UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("availabilty/:id",  updateRoomAvailability)
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRooms)
//GET
router.get("/:id", getRoom)
//GET ALL
router.get("/", getRooms)


export default router