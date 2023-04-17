import userRoutes from "./user.js";
import buildingRoutes from "./building.js";
import roomRoutes from "./room.js";

const constructorMethod = (app) => {
  app.use("/user/", userRoutes);
  app.use("/building/", buildingRoutes);
  app.use("/room/", roomRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};

export default constructorMethod;
