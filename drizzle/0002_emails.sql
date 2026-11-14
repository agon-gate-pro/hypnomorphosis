CREATE TABLE "emails" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text,
	"type" text NOT NULL,
	"reference" text,
	"destinataire" text NOT NULL,
	"sujet" text NOT NULL,
	"statut" text NOT NULL,
	"id_resend" text,
	"erreur" text,
	"cree_le" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "emails_type_reference_idx" ON "emails" USING btree ("type","reference") WHERE "emails"."reference" is not null;