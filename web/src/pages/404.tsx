import { MainLayout } from '@/layout/main'
import NotFoundIcon from '@assets/404.svg?react'
import { Link } from 'react-router'

export function NotFound() {
	return (
		<MainLayout className="h-full justify-center items-center">
			<div className=" col-span-full lg:col-span-6 lg:col-start-3 self-center-safe bg-white rounded-lg grid place-items-center gap-5 py-16 px-12">
				<NotFoundIcon width={194} height={85} />
				<h1 className="text-xl gray-600 text-center">Link não encontrado</h1>
				<div>
					<p className="text-md text-center text-gray-500">
						O link que você está tentando acessar não existe, foi removido ou é
					</p>
					<div className="p-0 m-0 flex justify-center items-center gap-1">
						<p className="inline text-gray-500 text-md">
							uma URL inválida. Saiba mais em
						</p>
						<Link to="/" className="text-blue-base text-md underline">
							brev.ly.
						</Link>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
