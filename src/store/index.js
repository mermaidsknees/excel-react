import { createStore, applyMiddleware } from "redux";

//Middlewares
//Logger - useful tool to track state changes
import logger from "redux-logger";

import cellReducer from "./reducers/cellReducer";

const store = createStore(cellReducer, applyMiddleware(logger));

export default store;
