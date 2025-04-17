import { http, HttpResponse, delay } from 'msw'

export const handlers = [
	http.get('/links', async () => {
		await delay(1000)

		return HttpResponse.json([
			{
				original_link: 'https://example.com',
				short_link: 'brev.ly/abc123',
				created_at: '2023-01-01T00:00:00Z',
				updated_at: '2023-01-02T00:00:00Z',
				id: '1',
				total_clicks: 10
			},
			{
				original_link: 'https://example2.com',
				short_link: 'brev.ly/def456',
				created_at: '2023-01-03T00:00:00Z',
				updated_at: '2023-01-04T00:00:00Z',
				id: '2',
				total_clicks: 20
			}
		])
	}),

	http.post('/links', async req => {
		await delay(1000)
		const { original_link, short_link } = (await req.request.json()) as {
			original_link: string
			short_link: string
		}

		if (!original_link || !short_link) {
			return HttpResponse.json(
				{
					message: 'Invalid data'
				},
				{
					status: 400
				}
			)
		}

		return HttpResponse.json({
			id: '3',
			original_link,
			short_link,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			total_clicks: 0
		})
	}),
	http.delete('/links/:id', ({ params }) => {
		console.log('Deleting link with ID:', params.id)
		delay(1000)
		return HttpResponse.json({
			message: 'Link deleted successfully'
		})
	})
]
