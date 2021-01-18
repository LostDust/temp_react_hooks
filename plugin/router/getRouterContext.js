// 访问 react 内部 ContextAPI
import { __RouterContext } from "react-router";

// 使用该方法获取 Context 不会订阅更新，提高性能
const getRouterContext = () => __RouterContext._currentValue;
// const getRouterContext = () => __RouterContext._currentValue2;

const getLocation = () => getRouterContext().location;
const getHistory = () => getRouterContext().history;
const getMatch = () => getRouterContext().match;
const getParams = key => getRouterContext().match.params[key];

export { getRouterContext, getLocation, getHistory, getMatch, getParams };
