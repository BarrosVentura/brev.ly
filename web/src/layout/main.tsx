export function MainLayout({
	className,
	children
}: { children: React.ReactNode; className?: string }) {
	return (
		<main
			className={`grid items-start grid-cols-1 lg:grid-cols-[repeat(10,_minmax(80px,_1fr))] gap-5 max-w-[978px] mx-auto px-3 ${className}`}
		>
			{children}
		</main>
	)
}
