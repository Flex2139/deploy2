import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function Layout({ children }) {
	return (
		<>
			<Header />
			<main className="container site-main" role="main">
				{children}
			</main>
			<Footer />
		</>
	);
}
