import { CircleDashed } from '@phosphor-icons/react'

export function LoadingState() {
	return (
		<div className="flex flex-col gap-3 justify-center items-center h-36">
			<CircleDashed size={32} className="text-blue-base animate-spin" />
		</div>
	)
}
