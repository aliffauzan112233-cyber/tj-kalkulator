CREATE TABLE "calculations" (
	"id" serial PRIMARY KEY NOT NULL,
	"expression" text,
	"result" text,
	"created_at" timestamp DEFAULT now()
);
