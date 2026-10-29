import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Lock, Mail, Scale } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';

function LegalShell({
  title,
  eyebrow,
  intro,
  children,
  draft = false,
}: {
  title: string;
  eyebrow: string;
  intro: string;
  children: ReactNode;
  draft?: boolean;
}) {
  return (
    <>
      <section className="border-b border-primary/[0.06] bg-grain">
        <div className="container-astralis py-12 lg:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Retour à l’accueil
          </Link>
          <div className="mt-7 max-w-3xl">
            <p className="eyebrow text-secondary">{eyebrow}</p>
            <h1 className="mt-3 text-balance text-h1 text-primary">{title}</h1>
            <p className="mt-4 text-body-lg text-on-surface-variant">{intro}</p>
          </div>
        </div>
      </section>
      <section className="container-astralis py-12 lg:py-16">
        {draft ? (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-gold/80 bg-surface-container-low p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
            <p className="text-[0.76rem] leading-relaxed text-on-surface-variant">
              <strong className="text-primary">Document de préproduction.</strong> Les mentions entre
              crochets doivent être complétées avec les informations légales de l’éditeur avant toute
              mise en ligne publique. Astralis n’est pas encore une boutique ouverte.
            </p>
          </div>
        ) : null}
        <div className="prose-astralis max-w-3xl space-y-8 [&_h2]:text-h3 [&_h2]:text-primary [&_h2]:mt-8 [&_h3]:text-title [&_h3]:text-primary [&_h3]:mt-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5">
          {children}
        </div>
      </section>
    </>
  );
}

export function MentionsPage() {
  usePageMeta('Mentions légales | Astralis', 'Mentions légales du site Astralis.');
  return (
    <LegalShell
      eyebrow="Informations légales"
      title="Mentions légales"
      intro="Les informations relatives à l’éditeur, à l’hébergement et à la propriété intellectuelle du site."
      draft
    >
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site Astralis est édité par <strong>[À compléter : nom ou raison sociale]</strong>,
          [statut juridique], immatriculé·e sous le numéro <strong>[SIREN / SIRET]</strong>, dont le
          siège social est situé <strong>[adresse complète]</strong>.
        </p>
        <p>
          Responsable de la publication : <strong>[À compléter]</strong>. Contact :{' '}
          <a href="mailto:astralis.spiritalite@gmail.com">astralis.spiritalite@gmail.com</a>.
        </p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est conçu pour être hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
          91789, États-Unis. L’adresse d’hébergement définitive sera précisée lors de la mise en
          production.
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, éléments graphiques, interfaces et contenus éditoriaux du site sont protégés
          par le droit d’auteur. Toute reproduction ou réutilisation non autorisée est interdite. Les
          bibliothèques open source utilisées conservent leurs licences respectives, détaillées dans
          la page Éthique & méthodologie.
        </p>
      </section>
      <section>
        <h2>Nature du service</h2>
        <p>
          Astralis propose des outils de calcul et des contenus de connaissance de soi. Les résultats
          ne constituent ni un diagnostic médical ou psychologique, ni une prédiction, ni un conseil
          juridique ou financier. Voir la page Éthique & méthodologie.
        </p>
      </section>
      <section>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des données est décrit dans la{' '}
          <Link to="/confidentialite">politique de confidentialité</Link>. Les données de naissance
          sont calculées localement et ne sont pas transmises à l’éditeur.
        </p>
      </section>
    </LegalShell>
  );
}

export function PrivacyPage() {
  usePageMeta(
    'Politique de confidentialité | Astralis',
    'Comment Astralis traite vos données : calculs locaux, stockage de session, géocodage et newsletter.',
  );
  return (
    <LegalShell
      eyebrow="Vos données"
      title="Politique de confidentialité"
      intro="Astralis a été conçu pour limiter au strict minimum la collecte de données. Les calculs de naissance restent dans votre navigateur."
    >
      <section>
        <h2>Principe général</h2>
        <p>
          Les calculateurs d’astrologie, de numérologie et de Human Design fonctionnent entièrement
          côté navigateur. Votre prénom, votre date, votre heure et votre lieu de naissance ne sont
          pas envoyés à un serveur Astralis et ne sont pas enregistrés dans une base de données.
        </p>
        <p>
          Les informations saisies sont placées dans le <strong>sessionStorage</strong> de l’onglet,
          uniquement pour permettre l’affichage de la page de résultats après validation du
          formulaire. Elles sont effacées lorsque vous cliquez sur « Effacer mes données » ou lorsque
          vous fermez l’onglet.
        </p>
      </section>
      <section>
        <h2>Recherche de ville</h2>
        <p>
          La recherche de ville utilise d’abord une liste locale intégrée. Si la commune n’est pas
          trouvée, le navigateur interroge l’API de géocodage gratuite Open-Meteo. Seul le texte saisi
          dans le champ de recherche (par exemple « Lyon ») est transmis ; aucune date, heure ou
          donnée de naissance ne l’est. Open-Meteo peut recevoir l’adresse IP technique de la
          requête.
        </p>
      </section>
      <section>
        <h2>Newsletter</h2>
        <p>
          Si vous choisissez de vous inscrire à la lettre d’information, votre adresse e-mail est
          transmise à notre prestataire d’envoi Resend. L’inscription est facultative et n’est pas
          nécessaire pour utiliser les calculateurs. Vous pouvez vous désinscrire à tout moment via
          le lien présent dans chaque message ou en écrivant à{' '}
          <a href="mailto:astralis.spiritalite@gmail.com">astralis.spiritalite@gmail.com</a>.
        </p>
        <p>
          Dans cette version de préproduction, le service d’envoi peut ne pas être configuré. Dans ce
          cas, aucun e-mail n’est enregistré et l’interface affiche un message explicite.
        </p>
      </section>
      <section>
        <h2>Cookies et mesure d’audience</h2>
        <p>
          Astralis n’utilise pas de cookie publicitaire, de traceur marketing ni d’outil de mesure
          d’audience dans cette version. Aucun consentement cookie n’est donc requis. Si un outil de
          mesure est ajouté ultérieurement, cette page sera mise à jour avant son activation.
        </p>
      </section>
      <section>
        <h2>Paiements</h2>
        <p>
          Aucun paiement n’est ouvert dans cette version. Lorsque des offres payantes seront
          proposées, les paiements seront traités par Stripe et aucune donnée bancaire ne transitera
          par les serveurs Astralis. Les conditions seront précisées avant l’ouverture.
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et
          d’opposition sur les données vous concernant, dans les conditions prévues par le RGPD. Pour
          exercer ces droits, écrivez à{' '}
          <a href="mailto:astralis.spiritalite@gmail.com">astralis.spiritalite@gmail.com</a>. Les
          données de naissance n’étant pas conservées côté serveur, leur suppression se fait
          directement dans votre navigateur.
        </p>
      </section>
      <section>
        <h2>Sécurité</h2>
        <p>
          Les échanges avec le site sont chiffrés par HTTPS en production. Les secrets d’API
          (Resend, Stripe) sont conservés côté serveur dans des variables d’environnement et ne sont
          jamais exposés au navigateur.
        </p>
      </section>
    </LegalShell>
  );
}

export function CgvPage() {
  usePageMeta(
    'Conditions générales de vente | Astralis',
    'Les offres payantes Astralis ne sont pas encore ouvertes. Conditions de préproduction.',
  );
  return (
    <LegalShell
      eyebrow="Cadre commercial"
      title="Conditions générales de vente"
      intro="Les offres payantes ne sont pas encore ouvertes. Ce document présente le cadre prévu et doit être finalisé avant toute commercialisation."
      draft
    >
      <section>
        <h2>État actuel de l’offre</h2>
        <p>
          Les calculateurs d’astrologie, de numérologie et de Human Design sont gratuits. Les
          analyses approfondies, les formations et l’espace membre ne sont pas disponibles à la
          vente. Aucun paiement ne peut être effectué sur le site dans cette version.
        </p>
        <div className="flex items-center gap-2 rounded-lg border border-gold/70 bg-surface-container-low p-3 text-[0.78rem] text-on-surface-variant">
          <Lock className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          Aucun bouton de paiement actif, aucun panier, aucun abonnement.
        </div>
      </section>
      <section>
        <h2>Prestataire de paiement prévu</h2>
        <p>
          Lors de l’ouverture, les paiements seront traités par Stripe. Les données bancaires seront
          saisies sur les interfaces sécurisées de Stripe et ne seront jamais stockées par Astralis.
          Les mentions relatives au prix, à la TVA, aux droits de rétractation et aux garanties
          seront ajoutées avant activation.
        </p>
      </section>
      <section>
        <h2>Prix et devises</h2>
        <p>
          Les prix futurs seront affichés en euros, toutes taxes comprises, pour les clients
          particuliers résidant en France. Les éventuelles variations de TVA selon le pays de
          résidence seront précisées au moment du paiement.
        </p>
      </section>
      <section>
        <h2>Droit de rétractation</h2>
        <p>
          Les contenus numériques peuvent être soumis à une exception au droit de rétractation
          lorsqu’ils sont fournis immédiatement et que le client y consent expressément. Les
          modalités définitives seront rédigées et validées avant toute vente. Aucun contenu payant
          n’est délivré aujourd’hui.
        </p>
      </section>
      <section>
        <h2>Médiation et litiges</h2>
        <p>
          Les coordonnées du médiateur de la consommation, l’adresse de réclamation et les
          modalités de règlement des litiges seront complétées avant l’ouverture commerciale.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question :{' '}
          <a href="mailto:astralis.spiritalite@gmail.com">astralis.spiritalite@gmail.com</a>.
        </p>
      </section>
    </LegalShell>
  );
}

export function EthicsPage() {
  usePageMeta(
    'Éthique & méthodologie | Astralis',
    'Méthodes de calcul, moteurs open source, limites et posture non fataliste d’Astralis.',
  );
  return (
    <LegalShell
      eyebrow="Transparence"
      title="Éthique & méthodologie"
      intro="Ce que nous calculons, avec quels outils, et ce que nous refusons de prétendre."
    >
      <section>
        <h2>Une posture non fataliste</h2>
        <p>
          Astralis considère l’astrologie, la numérologie et le Human Design comme des langages
          symboliques d’introspection. Aucun résultat ne décrit un destin inévitable, une maladie, un
          échec ou une réussite garantie. Les interprétations proposent des hypothèses de réflexion ;
          vous restez l’auteur de vos décisions.
        </p>
        <div className="flex items-center gap-2 rounded-lg border border-gold/70 bg-surface-container-low p-3 text-[0.78rem] text-on-surface-variant">
          <Scale className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          Aucun contenu ne remplace un avis médical, psychologique, juridique ou financier.
        </div>
      </section>
      <section>
        <h2>Moteurs de calcul</h2>
        <ul>
          <li>
            <strong>Astronomie :</strong> <code>astronomy-engine</code> 2.x, licence MIT, fondé sur
            les théories VSOP87 et ELP2000. Calculs géocentriques tropicaux, rétrogradations
            détectées par variation de longitude.
          </li>
          <li>
            <strong>Maisons astrologiques :</strong> algorithme Placidus et calcul des angles
            adaptés de <code>free-human-design</code> (MIT), avec bascule en signes entiers aux
            latitudes polaires.
          </li>
          <li>
            <strong>Human Design :</strong> matrice canonique des 64 portes, 36 canaux, 9 centres et
            26 activations implémentée localement, d’après les données de référence de
            <code>free-human-design</code> (MIT).
          </li>
          <li>
            <strong>Numérologie :</strong> implémentation interne, table pythagoricienne et réduction
            théosophique, couverte par des tests automatisés.
          </li>
          <li>
            <strong>Interface :</strong> React, TypeScript, Vite, Tailwind CSS, React Router. Les
            bibliothèques conservent leurs licences respectives.
          </li>
        </ul>
        <p>
          Nous n’utilisons pas Swiss Ephemeris dans cette version. La précision d’Astronomy Engine
          est de l’ordre de l’arcminute, adaptée à une lecture astrologique, mais nous ne la
          présentons pas comme un équivalent certifié de Swiss Ephemeris pour un usage professionnel.
        </p>
      </section>
      <section>
        <h2>Heures inconnues et données manquantes</h2>
        <p>
          Astralis ne comble jamais une heure manquante par une valeur arbitraire. En astrologie, le
          mode « heure inconnue » ne conserve que les signes stables sur la journée et supprime
          Ascendant, maisons et aspects. En Human Design, l’heure exacte est obligatoire : aucun
          BodyGraph approximatif n’est produit.
        </p>
      </section>
      <section>
        <h2>Confidentialité</h2>
        <p>
          Les données de naissance sont traitées dans le navigateur et conservées uniquement en
          mémoire de session. Aucune base de données de naissance n’est alimentée. La recherche de
          ville peut interroger Open-Meteo avec le seul nom de la commune. Voir la{' '}
          <Link to="/confidentialite">politique de confidentialité</Link>.
        </p>
      </section>
      <section>
        <h2>Ce qui n’est pas encore disponible</h2>
        <p>
          Les analyses approfondies, les cours, l’espace membre et les paiements ne sont pas ouverts.
          Les boutons correspondants affichent un état « bientôt disponible » et ne simulent aucune
          transaction. Le service de newsletter dépend de la configuration de Resend ; en l’absence de
          configuration, un message explicite est affiché.
        </p>
      </section>
      <section>
        <h2>Contact & signalement</h2>
        <p>
          Pour signaler une erreur de calcul, une incohérence ou un problème d’accessibilité :{' '}
          <a href="mailto:astralis.spiritalite@gmail.com" className="inline-flex items-center gap-1.5">
            <Mail className="h-4 w-4" aria-hidden="true" />
            astralis.spiritalite@gmail.com
          </a>
          . Précisez la date, l’heure, le lieu et le résultat observé, sans joindre de document
          d’identité.
        </p>
      </section>
    </LegalShell>
  );
}
