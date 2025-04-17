import { Warning } from '@phosphor-icons/react'

interface InputProps {
	label: string
	placeholder?: string
	value?: string
	error?: string
	disabled?: boolean
	pre?: string
}

const Input: React.FC<InputProps> = ({
	label,
	placeholder,
	error,
	disabled = false,
	pre,
	...rest
}) => {
	const inputStateClass = error && 'border-danger focus:border-danger'

	const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

	const hasPreTextClass = pre ? 'pl-16 pr-4' : 'px-4'

	return (
		<div className={`group flex flex-col gap-1 ${disabledClass}`}>
			<label className={`text-xs uppercase ${disabledClass}`} htmlFor={label}>
				{label}
			</label>
			<div className="grid grid-cols-2 items-center">
				{pre && (
					<p className="col-start-1 row-start-1 pl-4 text-md text-gray-600 font-normal group-not-focus-within:text-gray-400">
						{pre}
					</p>
				)}
				<input
					id={label}
					type="text"
					placeholder={placeholder}
					aria-placeholder={pre}
					disabled={disabled}
					className={`col-start-1 col-span-2 row-start-1 w-full  py-3.5 border rounded-md text-md font-normal text-gray-600  placeholder:color-gray-400 placeholder:text-md focus:outline-none focus:ring-1 focus:ring-blue-base ${inputStateClass} ${disabledClass} ${hasPreTextClass}`}
					{...rest}
				/>
			</div>
			{error && (
				<span className="text-sm text-danger flex items-center gap-1">
					<Warning size={14} className="color-danger" />
					{error}
				</span>
			)}
		</div>
	)
}

export default Input
