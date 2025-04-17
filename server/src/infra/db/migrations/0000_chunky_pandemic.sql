CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"short_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"total_clicks" integer DEFAULT 0 NOT NULL
);
