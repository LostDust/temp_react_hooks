import { getStore } from "./createManager";

const getTake = (name = "master") => getStore(name)._state;

export default getTake;
