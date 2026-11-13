CREATE TYPE "public"."origine_acces" AS ENUM('achat', 'renouvellement', 'offert');--> statement-breakpoint
CREATE TABLE "acces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"experience" text NOT NULL,
	"origine" "origine_acces" NOT NULL,
	"debut" timestamp with time zone DEFAULT now() NOT NULL,
	"fin" timestamp with time zone,
	"stripe_session_id" text,
	"montant_centimes" integer,
	"cree_le" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "acces_stripeSessionId_unique" UNIQUE("stripe_session_id")
);
--> statement-breakpoint
CREATE INDEX "acces_compte_experience_idx" ON "acces" USING btree ("clerk_user_id","experience");