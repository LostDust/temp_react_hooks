import { createManager } from "./createManager";
import useTake from "./useTake";
import getTake from "./getTake";

// import models from "./models";
import models from "@/config/manager.models";

createManager(models);

export { createManager, useTake, getTake };
