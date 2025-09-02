export default function Input({
	type = 'text',
	placeholder = '',
	value,
	onChange,
	min,
	max,
	error,
	label,
}) {
	return (
		<div className="input-container">
			{label && <label className="input-label">{label}</label>}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				min={min}
				max={max}
				className={`input-field ${error ? 'input-error' : ''}`}
			/>
			{error && <div className="input-error-message">{error}</div>}
		</div>
	);
}
