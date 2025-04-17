import { CircleDashed } from '@phosphor-icons/react'
import React from 'react'

type ButtonProps = {
	type: 'primary' | 'secondary'
	label: string
	disabled?: boolean
	icon?: React.ReactNode // Adicionado para suportar ícones no tipo secondary,
	onClick?: VoidFunction
	className?: string
	isLoading?: boolean
}

function Button({
	type,
	label,
	onClick,
	disabled = false,
	icon,
	className,
	isLoading = false
}: ButtonProps) {
	const baseStyles =
		'text-center cursor-pointer flex items-center justify-center'
	const primaryStyles = `
    w-full py-[15px] rounded-[8px] text-md
    bg-blue-base text-white 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-dark'}
  `
	const secondaryStyles = `
    px-2 py-2 rounded-[4px] text-sm-semi bg-gray-200 text-gray-700 border-1 border-transparent
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border hover:border-blue-base'}
  `

	const styles = type === 'primary' ? primaryStyles : secondaryStyles

	function Content() {
		return (
			<>
				{type === 'secondary' && icon && <span className="mr-2">{icon}</span>}
				{label}
			</>
		)
	}

	return (
		<button
			onClick={onClick}
			className={`${baseStyles} ${styles} ${className}`}
			disabled={disabled}
		>
			{isLoading ? (
				<CircleDashed size={32} className="text-white animate-spin" />
			) : (
				<Content />
			)}
		</button>
	)
}

export { Button }
