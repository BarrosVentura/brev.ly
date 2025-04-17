import { api } from '@/lib/axios'

export function deleteLink(id: string) {
	return api.delete(`/links/${id}`)
}
