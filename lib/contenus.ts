import { issueSignedToken, presignUrl } from "@vercel/blob";

// Fichiers des expériences (audios, carnets PDF), dans le store Vercel Blob privé « hypnomorphosis-contenus ».
// Aucune URL publique : après vérification des droits, la cliente reçoit un lien signé valable 1 h.

const uneHeure = 60 * 60 * 1000;

// jeton passé explicitement : sans lui, le SDK tente l'OIDC et exige BLOB_STORE_ID
export async function lienSigne(chemin: string) {
  const validUntil = Date.now() + uneHeure;
  const jeton = await issueSignedToken({
    pathname: chemin,
    operations: ["get"],
    validUntil,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  const { presignedUrl } = await presignUrl(jeton, { operation: "get", pathname: chemin, access: "private", validUntil });
  return presignedUrl;
}
