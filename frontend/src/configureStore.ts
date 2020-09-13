import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { placesReducer } from './App/store/places/reducer';

const rootReducer = combineReducers({
	places: placesReducer,
});

export const configureStore = () => {
	const middlewares = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);

	const store = createStore(rootReducer, composedEnhancers);

	return store;
};

export type RootReducerType = ReturnType<typeof rootReducer>;
