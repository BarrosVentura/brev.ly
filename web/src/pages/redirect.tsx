import { MainLayout } from '@/layout/main'
import LogoIcon from '@assets/logo-icon.svg?react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export function Redirect() {
	const { link } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (!link) {
			navigate('/')
		}
	}, [link])

	console.log({ link: decodeURIComponent(link!) })

	return (
		<MainLayout className="h-full justify-center items-center">
			<div className=" col-span-full lg:col-span-6 lg:col-start-3 self-center-safe bg-white rounded-lg grid place-items-center gap-5 py-16 px-12">
				<LogoIcon />
				<h1 className="text-xl gray-600 text-center">Redirecionando...</h1>
				<div>
					<p className="text-md text-center text-gray-500">
						O link será aberto automaticamente em alguns instantes.
					</p>
					<div className="p-0 m-0 flex justify-center items-center gap-1">
						<p className="inline text-gray-500 text-md">
							Não foi redirecionado?
						</p>
						<a href="#" className="text-blue-base text-md">
							Acesse aqui
						</a>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
