import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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

