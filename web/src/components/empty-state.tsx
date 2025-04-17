import { Link } from '@phosphor-icons/react'

export function EmptyState() {
	return (
		<div className="flex flex-col gap-3 justify-center items-center h-36">
			<Link size={32} className="text-gray-400" />
			<p className="text-xs text-gray-500 uppercase">
				Ainda não existem links cadastrados
			</p>
		</div>
	)
}
