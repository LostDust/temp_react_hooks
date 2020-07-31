import { createManager } from "./createManager";
import useTake from "./useTake";
import getTake from "./getTake";
import models from "./models";

createManager(models);

export { createManager, useTake, getTake };
