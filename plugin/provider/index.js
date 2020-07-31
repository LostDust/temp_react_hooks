import createStore from "./createStore";
import models from "./models";

const { Provider, useModel, getModel } = createStore(models);

export { Provider, useModel, getModel };
