// Dates affichées sur le site et dans les e-mails : « 14 novembre 2027 », à l'heure de Paris
export const dateLongue = (d: Date) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" }).format(d);
