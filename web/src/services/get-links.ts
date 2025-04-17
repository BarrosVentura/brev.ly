import { api } from '@/lib/axios'

type Link = {
	original_link: string
	short_link: string
	created_at: string
	updated_at: string
	id: string
	total_clicks: number
}

export function getLinks() {
	return api.get<Link[]>('/links')
}
