import { queryClient } from '@/main'
import { deleteLink } from '@/services/delete-link'
import { Copy, Trash } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router'
import { IconButton } from './icon-button'

export function BrevlyLink({
	shortUrl,
	longUrl,
	access,
	id
}: { shortUrl: string; longUrl: string; access: number; id: string }) {
	const { invalidateQueries } = useQueryClient(queryClient)

	const { mutate } = useMutation({
		mutationFn: deleteLink,
		mutationKey: ['deleteLink'],
		onSuccess: () => {
			invalidateQueries({ queryKey: ['links'] })
		}
	})

	return (
		<li className="flex justify-between py-5 not-last:border-b not-last:border-gray-200">
			<div>
				<Link to={`/redirect/${encodeURIComponent(shortUrl)}}`}>
					<h3 className="text-md text-blue-base font-bold">{shortUrl}</h3>
				</Link>
				<span className="text-sm text-gray-500">{longUrl}</span>
			</div>
			<div className="flex justify-center items-center gap-5">
				<span className="text-sm text-gray-500">{access} acessos</span>
				<div className="flex gap-1">
					<IconButton
						icon={<Copy size={16} />}
						alt="copiar"
						onClick={() => navigator.clipboard.writeText(shortUrl)}
					/>
					<IconButton
						icon={<Trash size={16} />}
						alt="excluir"
						onClick={() => mutate(id)}
					/>
				</div>
			</div>
		</li>
	)
}
