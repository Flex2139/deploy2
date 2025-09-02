import React from 'react';

export default function Loader({ size = 40, label = 'Загрузка...' }) {
	const viewBoxSize = 50;
	const cx = viewBoxSize / 2;
	const r = 20;
	const circumference = 2 * Math.PI * r;

	const arcPortion = 0.35;
	const dash = circumference * arcPortion;
	const gap = circumference - dash;

	return (
		<div
			role="status"
			aria-label={label}
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<g transform={`rotate(0 ${cx} ${cx})`}>
					<circle
						cx={cx}
						cy={cx}
						r={r}
						fill="none"
						stroke="rgba(0,0,0,0.08)"
						strokeWidth="4"
					/>
					<circle
						cx={cx}
						cy={cx}
						r={r}
						fill="none"
						stroke="currentColor"
						strokeWidth="4"
						strokeLinecap="round"
						strokeDasharray={`${dash} ${gap}`}
						strokeDashoffset="0"
					>
						<animateTransform
							attributeName="transform"
							type="rotate"
							from={`0 ${cx} ${cx}`}
							to={`360 ${cx} ${cx}`}
							dur="0.9s"
							repeatCount="indefinite"
						/>
					</circle>
				</g>
			</svg>

			<span
				style={{
					position: 'absolute',
					width: 1,
					height: 1,
					padding: 0,
					margin: -1,
					overflow: 'hidden',
					clip: 'rect(0,0,0,0)',
					whiteSpace: 'nowrap',
					border: 0,
				}}
			>
				{label}
			</span>
		</div>
	);
}
