import React from 'react';

export default function Button({ children, className = '', type = 'button', ...props }) {
	const cls = `${className}`.trim();
	return (
		<button type={type} className={cls} {...props}>
			{children}
		</button>
	);
}
