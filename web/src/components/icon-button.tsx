import React from 'react'

type ButtonProps = {
	disabled?: boolean
	icon: React.ReactNode
	onClick: VoidFunction
	alt: string
}

function IconButton({ onClick, disabled = false, icon, alt }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`
    text-center cursor-pointer flex items-center justify-center px-2 py-2 rounded-[4px] text-sm-semi bg-gray-200 text-gray-700 border-1 border-transparent
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border hover:border-blue-base'}
  `}
			disabled={disabled}
			aria-label={alt}
			title={alt}
		>
			{icon}
		</button>
	)
}

export { IconButton }
