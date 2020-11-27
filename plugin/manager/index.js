import { createManager } from "./createManager";
import useTake from "./useTake";
import getTake from "./getTake";
// 如何指定自定义配置文件？
// import models from "./models";
import models from "@/config/manager.models";

createManager(models);

export { createManager, useTake, getTake };
