import React, { FC } from 'react';
import { store } from './store/configureStore';
import { Provider } from 'react-redux';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				test
			</div>
		</Provider>
	);
}

export default App;
