import type { CSSProperties } from "react";
import Image from "next/image";
import Apparitions from "@/components/Apparitions";
import EnTete from "@/components/EnTete";
import { Icone, SpriteIcones } from "@/components/Icones";

// décalage d'apparition du n-ième élément d'une même rangée
const delai = (rang: number) => ({ "--delai": `${rang * 0.25}s` }) as CSSProperties;

const lienFigaro = "https://adresses-incontournables.madame.lefigaro.fr/prendre-soin-soi/berenice-hervet/";

export default function Accueil() {
  return (
    <>
      <SpriteIcones />
      <EnTete />

      <main>
        {/* Brief : en haut le logo, puis « Ouvrir le champ de vos possibles » (vouvoiement sur le site), puis le texte d'introduction */}
        <section className="ouverture grain">
          <div className="wrap">
            <div>
              <h1>Ouvrir le champ<br />de <em>vos possibles</em></h1>
              <div className="accroche">
                <p className="forte">Vous avez en vous un pouvoir que vous ne connaissez peut-être pas encore.</p>
                <p className="douce">Vous portez déjà en vous des ressources insoupçonnées, des possibilités qui ne demandent qu’à être découvertes.</p>
                <p className="forte">À travers l’hypnose, venez à la rencontre de vous-même et découvrez tout ce qui peut encore s’ouvrir à vous.</p>
              </div>
              <div className="actions">
                <a className="btn btn-plein" href="#decouverte">Je découvre HypnoMorphosis gratuitement</a>
              </div>
            </div>
            <div className="logo-hero" aria-hidden="true">
              <div className="boussole"><span className="point haut" /><span className="point bas" /></div>
              <div className="boussole petite"><span className="point haut" /></div>
              <Image className="scarabee" src="/logo/hypnomorphosis-embleme.svg" alt="" width={350} height={350} priority />
            </div>
          </div>
        </section>

        {/* Brief : redirection vers l'expérience découverte, avec sa photo et ses textes */}
        <section className="decouverte grain" id="decouverte">
          <div className="wrap">
            <div className="couverture revele">
              <span className="gratuit">EXPÉRIENCE DÉCOUVERTE · GRATUITE</span>
              <a className="couv" href="#">
                <Image src="/images/couverture-decouverte.jpg" alt="Couverture du carnet de l’expérience découverte" width={800} height={1301} sizes="360px" />
              </a>
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
              <a className="btn btn-plein" href="#">Je découvre HypnoMorphosis gratuitement</a>
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
              <span><Icone nom="ecran" />Carnet en ligne dans votre espace</span>
            </div>
            <div className="carnets">
              <a className="carnet revele" href="#">
                <div className="couv couv-noeud"><div className="boussole" /><span className="cat">Expérience universelle</span><div><h3>Le Nœud</h3><span className="duree">21 jours</span></div></div>
                <div className="infos"><p>21 jours pour dénouer, comprendre et se reconnecter à soi.</p><div className="ligne"><span className="prix">49&nbsp;€</span><span className="lien">Découvrir</span></div></div>
              </a>
              <a className="carnet revele" href="#" style={delai(1)}>
                <div className="couv couv-apres"><div className="boussole" /><span className="cat">Expérience miroir</span><div><h3>Après nous</h3><span className="duree">21 jours</span></div></div>
                <div className="infos"><p>21 jours pour revenir à soi après une séparation.</p><div className="ligne"><span className="prix">49&nbsp;€</span><span className="lien">Découvrir</span></div></div>
              </a>
              <div className="carnet revele" style={delai(2)}>
                <div className="couv couv-avenir"><span className="cat">Grandes expériences</span><div><h3>Bientôt</h3><span className="duree">Des thèmes qui demandent davantage de temps</span></div></div>
                <div className="infos"><p>Pour aller à la rencontre de soi et découvrir ce qui peut émerger lorsque l’on prend vraiment le temps d’explorer.</p></div>
              </div>
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
              <Image src="/images/berenice.jpg" alt="Bérénice" fill sizes="240px" />
            </div>
            <div className="revele" style={delai(1)}>
              <span className="caps">Derrière HypnoMorphosis</span>
              <blockquote>«&nbsp;L’hypnose, ça sert à rien et pourtant ça change tout.&nbsp;»</blockquote>
              <p>Derrière HypnoMorphosis, il y a moi. Je suis Bérénice, ancienne infirmière urgentiste et aujourd’hui hypnothérapeute.</p>
              <div className="actions">
                <a className="btn btn-trait" href="#">Lire mon histoire</a>
                <a className="presse" href={lienFigaro} target="_blank" rel="noopener">Vu dans <i>Madame Figaro</i></a>
              </div>
            </div>
          </div>
        </section>

        {/* Brief : bloc réseaux sociaux sur l'accueil */}
        <section className="reseaux">
          <div className="boussole" />
          <div className="contenu wrap revele">
            <h2 className="section">Vous voulez découvrir HypnoMorphosis autrement&nbsp;?</h2>
            <p>Retrouvez-moi sur TikTok, Instagram et YouTube pour découvrir mes réflexions, mes expériences et une autre façon de parler de l’hypnose.</p>
            <div className="liens">
              <a className="btn btn-trait" href="#"><Icone nom="tiktok" />TikTok</a>
              <a className="btn btn-trait" href="#"><Icone nom="instagram" />Instagram</a>
              <a className="btn btn-trait" href="#"><Icone nom="youtube" />YouTube</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site">
        <div className="wrap">
          <div className="haut">
            <div><div className="nom" translate="no">HYPNOMORPHOSIS</div><div className="devise">Ouvrir le champ de vos possibles</div></div>
            <div>
              <h2>Le site</h2>
              <ul>
                <li><a href="#experiences">Les expériences</a></li>
                <li><a href="#decouverte">Expérience découverte</a></li>
                <li><a href="#apropos">Derrière HypnoMorphosis</a></li>
                <li><a href="#">Mon espace</a></li>
              </ul>
            </div>
            <div>
              <h2>Retrouvez HypnoMorphosis</h2>
              <div className="icones">
                <a href="#" aria-label="TikTok"><Icone nom="tiktok" /></a>
                <a href="#" aria-label="Instagram"><Icone nom="instagram" /></a>
                <a href="#" aria-label="YouTube"><Icone nom="youtube" /></a>
              </div>
            </div>
          </div>
          <div className="bas">Mentions légales · CGV · Politique de confidentialité · Paiement et vente en ligne</div>
        </div>
      </footer>

      <Apparitions />
    </>
  );
}
