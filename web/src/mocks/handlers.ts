import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("/links", async () => {
    await delay(1000);

    return HttpResponse.json([
      {
        complete_url: "https://example.com",
        short_url: "brev.ly/abc123",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-02T00:00:00Z",
        id: "1",
        total_clicks: 10,
      },
      {
        complete_url: "https://example2.com",
        short_url: "brev.ly/def456",
        created_at: "2023-01-03T00:00:00Z",
        updated_at: "2023-01-04T00:00:00Z",
        id: "2",
        total_clicks: 20,
      },
    ]);
  }),

  http.post("/links", async (req) => {
    await delay(1000);
    const { complete_url, short_url } = (await req.request.json()) as {
      complete_url: string;
      short_url: string;
    };

    if (!complete_url || !short_url) {
      return HttpResponse.json(
        {
          message: "Invalid data",
        },
        {
          status: 400,
        }
      );
    }

    return HttpResponse.json({
      id: "3",
      complete_url,
      short_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      total_clicks: 0,
    });
  }),
  http.delete("/links/:id", ({ params }) => {
    console.log("Deleting link with ID:", params.id);
    delay(1000);
    return HttpResponse.json({
      message: "Link deleted successfully",
    });
  }),
];
