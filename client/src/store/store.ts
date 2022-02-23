import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import api from "./middlewares/api";
import { roomApi } from "./reducers/room/apiReducer/reducer";
import { roomSocket } from "./reducers/room/socketReducer/reducer";
import { user } from "./reducers/user/reducer";
import { shared } from "./reducers/shared/reducer";

const middlewares = [api, thunk];
const rootReducers = combineReducers({
  user,
  roomApi,
  roomSocket,
  shared,
});
const composeEnhancers =
  process.env.NODE_ENV !== "production" ? composeWithDevTools({}) : compose;
const makeStore = () => {
  return createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};

const wrapper = createWrapper(makeStore);

export type State = ReturnType<typeof rootReducers>;
export default wrapper;
