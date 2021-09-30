import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'
import 'moment/locale/ru';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';

ReactDOM.render(
	<React.StrictMode>
		<ConfigProvider locale={ru_RU}>
			<App />
		</ConfigProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
