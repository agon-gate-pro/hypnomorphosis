import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Apparitions from "@/components/Apparitions";
import DonneesStructurees from "@/components/DonneesStructurees";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import VideoAccueil from "@/components/VideoAccueil";
import { Icone } from "@/components/Icones";
import { experiencesADecouvrir } from "@/lib/experiences";
import { berenice, descriptionSite, lienFigaro, metaPage, organisation, reseaux, urlSite, videoAccueil } from "@/lib/site";

// décalage d'apparition du n-ième élément d'une même rangée
const delai = (rang: number) => ({ "--delai": `${rang * 0.25}s` }) as CSSProperties;

export const metadata: Metadata = metaPage({ titre: "HypnoMorphosis · Ouvrir le champ de vos possibles", description: descriptionSite, chemin: "/" });

// la marque, son site, Bérénice et le catalogue des expériences, pour les moteurs de recherche et les IA
const donnees = {
  "@context": "https://schema.org",
  "@graph": [
    organisation,
    { "@type": "WebSite", "@id": `${urlSite}/#site`, url: urlSite, name: "HypnoMorphosis", inLanguage: "fr", publisher: { "@id": organisation["@id"] } },
    berenice,
    {
      "@type": "ItemList",
      name: "Les expériences HypnoMorphosis",
      itemListElement: experiencesADecouvrir().map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.titre, url: `${urlSite}/experiences/${e.slug}` })),
    },
  ],
};

export default function Accueil() {
  return (
    <>
      <DonneesStructurees donnees={donnees} />
      <EnTete />

      <main>
        {/* Brief : en haut le logo, puis « Ouvrir le champ de vos possibles » (vouvoiement sur le site), puis le texte d'introduction.
            Fond olive foncé à la demande de Bérénice (accueil « trop blanc ») ; sa vidéo de présentation à la place du logo, dans un cadre paysage. */}
        <section className="ouverture grain">
          <div className="wrap">
            <div>
              <h1>Ouvrir le champ{" "}<br />de <em>vos possibles</em></h1>
              <div className="accroche">
                <p className="forte">Vous avez en vous un pouvoir que vous ne connaissez peut-être pas encore.</p>
                <p className="douce">Vous portez déjà en vous des ressources insoupçonnées, des possibilités qui ne demandent qu’à être découvertes.</p>
                <p className="forte">À travers l’hypnose, venez à la rencontre de vous-même et découvrez tout ce qui peut encore s’ouvrir à vous.</p>
              </div>
              <div className="actions">
                <Link className="btn btn-plein" href="/inscription">Je découvre HypnoMorphosis gratuitement</Link>
              </div>
            </div>
            <div className="logo-hero">
              <div className="boussole" aria-hidden="true"><span className="point haut" /><span className="point bas" /></div>
              <div className="boussole petite" aria-hidden="true"><span className="point haut" /></div>
              <div className="video-cadre">
                {videoAccueil ? (
                  <VideoAccueil {...videoAccueil} />
                ) : (
                  <div className="video-attente">
                    <Image src="/logo/hypnomorphosis-embleme-dore.svg" alt="" width={160} height={160} priority />
                    <span>Vidéo de présentation à venir</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Brief : redirection vers l'expérience découverte, avec sa photo et ses textes */}
        <section className="decouverte grain" id="decouverte">
          <div className="wrap">
            <div className="couverture revele">
              <span className="gratuit">EXPÉRIENCE DÉCOUVERTE · GRATUITE</span>
              <Link className="couv" href="/inscription">
                <Image src="/images/couverture-decouverte.jpg" alt="Couverture du carnet de l’expérience découverte" width={800} height={1301} sizes="360px" />
              </Link>
            </div>
            <div className="revele" style={delai(1)}>
              <span className="caps">Expérience découverte</span>
              <h2 className="section">Vivez votre première expérience HypnoMorphosis gratuitement</h2>
              <p className="question-titre">Et si, pendant 5 jours, vous tentiez HypnoMorphosis&nbsp;?</p>
              <p className="chapo">Laissez-vous guider, jour après jour, dans une première découverte qui pourrait bien faire émerger des possibilités que vous n’aviez pas envisagées.</p>
              <p className="acces-titre">Vous aurez accès à&nbsp;:</p>
              <ul className="acces">
                <li><Icone nom="casque" /><span><b>2 expériences audio guidées</b> pour vous laisser guider autrement</span></li>
                <li><Icone nom="chemin" /><span><b>Une ordalie</b>, pour expérimenter plutôt que simplement réfléchir</span></li>
                <li><Icone nom="plume" /><span><b>Un exercice chaque jour pendant 5 jours</b>, pour avancer pas à pas dans l’expérience</span></li>
                <li><Icone nom="sceau" /><span><b>Un engagement à signer</b>, pour marquer votre décision d’aller jusqu’au bout de ces 5 jours</span></li>
              </ul>
              <Link className="btn btn-plein" href="/inscription">Je découvre HypnoMorphosis gratuitement</Link>
            </div>
          </div>
        </section>

        <section className="experiences" id="experiences">
          <div className="wrap">
            <div className="revele">
              <span className="caps">Les expériences HypnoMorphosis</span>
              <h2 className="section">Une véritable expérience personnelle à vivre</h2>
              <p className="intro-section">Un carnet à imprimer, des exercices d’introspection, des audios d’hypnose et une progression sur plusieurs jours.</p>
            </div>
            <div className="formats revele" style={delai(1)}>
              <span><Icone nom="casque" />Audios dans votre espace</span>
              <span><Icone nom="carnet" />Carnet à imprimer</span>
              <Link href="/aide/tablette"><Icone nom="ecran" />Carnet à remplir sur tablette</Link>
            </div>
            <div className="carnets">
              <Link className="carnet revele" href="/experiences/le-noeud">
                <div className="couv">
                  <Image src="/images/couverture-noeud.jpg" alt="" fill sizes="(max-width: 620px) 92vw, 360px" />
                  <h3>Le Nœud</h3>
                </div>
                <div className="infos"><p>21 jours pour dénouer, comprendre et se reconnecter à soi.</p><div className="ligne"><span className="prix">49&nbsp;€</span><span className="lien">Découvrir</span></div></div>
              </Link>
              <Link className="carnet revele" href="/experiences/apres-nous" style={delai(1)}>
                <div className="couv">
                  <Image src="/images/couverture-apres-nous.jpg" alt="" fill sizes="(max-width: 620px) 92vw, 360px" />
                  <h3>Après nous</h3>
                </div>
                <div className="infos"><p>21 jours pour revenir à soi après une séparation.</p><div className="ligne"><span className="prix">49&nbsp;€</span><span className="lien">Découvrir</span></div></div>
              </Link>
            </div>
          </div>
        </section>

        <section className="apropos" id="apropos">
          <svg className="rameau" viewBox="0 0 260 200" aria-hidden="true">
            <path d="M10 190 C 80 150, 150 110, 250 20" />
            <g>
              <ellipse cx="60" cy="158" rx="18" ry="6" transform="rotate(-50 60 158)" />
              <ellipse cx="78" cy="160" rx="18" ry="6" transform="rotate(20 78 160)" />
              <ellipse cx="110" cy="128" rx="20" ry="6.5" transform="rotate(-55 110 128)" />
              <ellipse cx="128" cy="132" rx="20" ry="6.5" transform="rotate(15 128 132)" />
              <ellipse cx="160" cy="96" rx="20" ry="6.5" transform="rotate(-60 160 96)" />
              <ellipse cx="178" cy="100" rx="20" ry="6.5" transform="rotate(10 178 100)" />
              <ellipse cx="206" cy="62" rx="18" ry="6" transform="rotate(-62 206 62)" />
              <ellipse cx="222" cy="66" rx="17" ry="5.5" transform="rotate(5 222 66)" />
              <circle cx="140" cy="122" r="6" /><circle cx="192" cy="86" r="5.5" />
            </g>
          </svg>
          <div className="wrap">
            <div className="portrait revele">
              <Image src="/images/berenice.jpg" alt="Bérénice Hervet, hypnothérapeute" fill sizes="240px" />
            </div>
            <div className="revele" style={delai(1)}>
              <span className="caps">Derrière HypnoMorphosis</span>
              <blockquote>«&nbsp;L’hypnose, ça sert à rien et pourtant ça change tout.&nbsp;»</blockquote>
              <p>Derrière HypnoMorphosis, il y a moi. Je suis Bérénice, ancienne infirmière urgentiste et aujourd’hui hypnothérapeute.</p>
              <div className="actions">
                <Link className="btn btn-trait" href="/derriere-hypnomorphosis">Lire mon histoire</Link>
                <a className="presse" href={lienFigaro} target="_blank" rel="noopener">Vu dans <i>Madame Figaro</i></a>
              </div>
            </div>
          </div>
        </section>

        {/* Brief : bloc réseaux sociaux sur l'accueil ; affiché dès qu'une adresse est renseignée dans lib/site.ts */}
        {reseaux.length > 0 && (
          <section className="reseaux">
            <div className="boussole" />
            <div className="contenu wrap revele">
              <h2 className="section">Vous voulez découvrir HypnoMorphosis autrement&nbsp;?</h2>
              <p>Retrouvez-moi sur TikTok, Instagram et YouTube pour découvrir mes réflexions, mes expériences et une autre façon de parler de l’hypnose.</p>
              <div className="liens">
                {reseaux.map((r) => (
                  <a key={r.nom} className="btn btn-trait" href={r.url} target="_blank" rel="noopener"><Icone nom={r.icone} />{r.nom}</a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <PiedDePage />

      <Apparitions />
    </>
  );
}
