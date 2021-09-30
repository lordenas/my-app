import React, { FC } from 'react';
import { store } from './store/configureStore';
import { Provider } from 'react-redux';
import MainPage from './pages/main-page'
import './sass/main.sass'

function App() {
	return (
		<Provider store={store}>
			<MainPage />
		</Provider>
	);
}

export default App;
