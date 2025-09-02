import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import './index.css';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<App />
				</AuthProvider>
			</BrowserRouter>
		</ReduxProvider>
	</React.StrictMode>,
);
