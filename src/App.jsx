import React, { useState } from "react";

/* ================================================================
   ACCA d'Herbeys (38320 Herbeys, Isère) — site associatif
   Bloc 1 : structure et affichage. Les codes d'accès et les
   contenus éditables seront stockés dans Firebase au bloc 2.
   ================================================================ */

const WIX = "https://static.wixstatic.com/media/";
const PDF = "https://www.accadianedherbeys.com/_files/ugd/";
const img = (id, w, h) =>
  `${WIX}${id}/v1/fill/w_${w},h_${h},al_c,q_85,enc_avif,quality_auto/${id.split("~")[0]}.jpg`;

const IMG = {
  logo: `/logo.png`,
  hero: img("85f885_1e9473eff9c1403ca13fe2b3014d4875~mv2.jpg", 1800, 740),
  acca: img("85f885_076ca16752a449c8a5158a01265fa790~mv2.jpg", 1600, 700),
  chasse: img("9e2aaf0a80b94f009cbe35be931f90bd.jpg", 1600, 700),
  faune: img("85f885_f2a9b8b777804ecca957ce3a15823991~mv2.jpg", 1600, 600),
  vie: img("85f885_b744247e099e4179a729713f95e028d5~mv2.jpg", 1600, 700),
  reglement: img("85f885_7730dfa961bd4ce4aaecab3ae1941ac5~mv2.jpg", 1200, 800),
  bureau: img("85f885_feaa0b4b341c4f8891ee3c52a5a30fac~mv2.jpg", 1600, 600),
  jours: img("85f885_d4d59e65c05747a7881d01dd1f9fd419~mv2.jpg", 1200, 750),
  fdci: `${WIX}85f885_d465d2c7508c404c848aa68a64e247b2~mv2.png/v1/fill/w_260,h_166,al_c,q_90/fdci.png`,
  mairie: `${WIX}85f885_0cba9bcfeb3d4b6bac02651065f4c7a5~mv2.png/v1/fill/w_216,h_114,al_c,q_90/mairie.png`,
};

const GALERIE = [
  "85f885_07c9440f93bd4df59ffe680b71c3398f~mv2.jpg",
  "85f885_7093b5f34a7e4faaaef8eceee182a082~mv2.jpg",
  "85f885_b9093da100dc4cbcb768051ba6a1aa26~mv2.jpg",
  "85f885_14e6c893772844f9a2826724fb4ea7b6~mv2.jpg",
  "85f885_69ccc7e05e56461695aa3a024f2d8e98~mv2.jpg",
  "85f885_e8eff0bb17f549eb8e5e3890ade66cc0~mv2.jpg",
  "85f885_dc16dfc499db4f1c815bf2f33b11d915~mv2.jpg",
  "85f885_e3e2eb56e8ae43688ccc149f0eeaa9e6~mv2.jpg",
  "85f885_12c14bd596b34c1d943f0cb0b3c1ffd0~mv2.jpg",
].map((id) => img(id, 700, 500));

// Photos libres de droits (Wikimedia Commons, URLs stables Special:FilePath).
// `pdf` renseigné = fiche descriptive d'origine de l'ACCA ; sinon, pas de lien fiche.
const FAUNE = [
  { nom: "Chevreuil", desc: "Cervidé typiquement forestier, 20–30 kg.", credit: "CC BY-SA 3.0 — 4028mdk09",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2010-03-11_%2815%29_Reh%2C_Roe_deer%2C_Capreolus_capreolus.JPG?width=900",
    pdf: PDF + "85f885_1eb621c696d042a1891e8cdf6790c96e.pdf" },
  { nom: "Cerf élaphe", desc: "Le plus grand cervidé de nos forêts.", credit: "CC BY-SA 3.0 — Luc Viatour",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cervus_elaphus_Luc_Viatour_1.jpg?width=900",
    pdf: PDF + "85f885_1a8cd92d11444d7992dce6c839eb14bc.pdf" },
  { nom: "Sanglier", desc: "Ancêtre du porc, omnivore et prolifique.", credit: "CC BY-SA 4.0 — F. Bellamoli",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sardinian_wild_boar_%28Sus_scrofa_meridionalis%29.JPG?width=900",
    pdf: PDF + "85f885_f8ed9976655d424ca37d321aa74aa23b.pdf" },
  { nom: "Renard roux", desc: "Canidé carnivore, 6–10 kg.", credit: "CC BY-SA 2.0 — Peter Trimming",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Red_Fox_%28Vulpes_vulpes%29_-British_Wildlife_Centre-8.jpg?width=900",
    pdf: PDF + "85f885_506aec2614d04f1bb18eeb84215c2f9c.pdf" },
  { nom: "Blaireau", desc: "Mustélidé fouisseur, vit en clan dans son terrier.", credit: "CC BY-SA 2.5 — Ørland",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Meles_meles_norway_1.JPG?width=900",
    pdf: "" },
  { nom: "Martre", desc: "Mustélidé arboricole et nocturne des forêts.", credit: "CC BY-SA 3.0 — Bohuš Číčel",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Martes_martes_in_Sweden.jpg?width=900",
    pdf: "" },
  { nom: "Lièvre d'Europe", desc: "La hase, le bouquin et le levraut.", credit: "CC BY-SA 2.5 — F. Böhringer",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Feldhase%2C_Lepus_europaeus_4a.JPG?width=900",
    pdf: PDF + "85f885_e721d20eb9514c6398c41fce8c2298a6.pdf" },
  { nom: "Lièvre variable", desc: "Le « blanchon », blanc l'hiver, adapté au froid.", credit: "CC BY-SA 4.0 — K. Bjørnsrud",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mountain_hare_%28Lepus_timidus%29_Oppdal.jpg?width=900",
    pdf: PDF + "85f885_9ba48acebc0e4a41b7135f0a105515db.pdf" },
  { nom: "Faisan commun", desc: "Galliforme au plumage éclatant chez le mâle.", credit: "CC BY 3.0 — David Croad",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Common_Pheasant_Phasianus_Colchicus.jpg?width=900",
    pdf: "" },
  { nom: "Perdrix rouge", desc: "Gibier à plume des coteaux ouverts et secs.", credit: "CC BY-SA 4.0 — Wikimedia Commons",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Red-legged_Partridge_%28Perdiz_Roja%29_%28Alectoris_rufa%29_-_Torrevieja%2C_Spain_2024-02-04.jpg?width=900",
    pdf: "" },
  { nom: "Bécasse des bois", desc: "Limicole forestier au long bec, actif au crépuscule.", credit: "CC BY-SA 4.0 — Wikimedia Commons",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Eurasian_Woodcock_%28Scolopax_rusticola%29_%2826338656739%29.jpg?width=900",
    pdf: "" },
  { nom: "Grive musicienne", desc: "Passereau au chant mélodieux, friand d'escargots.", credit: "CC BY-SA — Wikimedia Commons",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Grive_musicienne_Turdus_philomelos_%2850026366226%29.jpg?width=900",
    pdf: "" },
  { nom: "Alouette des champs", desc: "Oiseau des champs au chant lancé en plein vol.", credit: "CC BY-SA — Wikimedia Commons",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Feldlerche_%28Alauda_arvensis%29.jpg?width=900",
    pdf: "" },
];

/* ---------------- Couleurs & constantes ---------------- */

const C = {
  foret: "#16301F",
  foret2: "#1E3D29",
  creme: "#FBFAF5",
  cuivre: "#B4651E",
  cuivreClair: "#D07A28",
  encre: "#20261E",
  gris: "#5E6557",
  ligne: "#E4E0D4",
};

// Codes provisoires — seront stockés dans Firebase et modifiables depuis l'espace admin (bloc 2).
const CODES_DEFAUT = {
  adherent: "ADHERENT26",
  bureau: "BUREAU26",
  admin: "ADMIN26",
};
// Adresse officielle fournie par la FDC38 (compte Google : Firebase, GitHub, Vercel, Gmail).
const EMAIL = "acca-herbeys@chasse38.org";
const EMAIL_EN_ATTENTE = false;

// Communauté WhatsApp « ACCA Herbeys ». Liens des groupes ouverts aux chasseurs (espace adhérents).
// Le groupe Bureau n'a volontairement pas de lien : ajout manuel par un administrateur.
const WHATSAPP_GROUPES = [
  {
    nom: "Organisation des chasses",
    desc: "Battues, jours de chasse, points pratiques de la saison.",
    lien: "https://chat.whatsapp.com/C2Z5ue7u5RdHh6Gz8F94Ct?s=cl&p=i&ilr=4",
  },
  {
    nom: "Discussion générale ACCA",
    desc: "Échanges entre adhérents et vie de l'association.",
    lien: "https://chat.whatsapp.com/CTcLcYSoln52Ww6QlmAZWw?s=cl&p=i&ilr=4",
  },
];

// Dates affichées publiquement (accueil + page Saison).
const DATES_PUBLIQUES = [
  ["Ouverture générale 2026/2027", "Dimanche 13 septembre 2026"],
  ["Clôture ACCA", "Dimanche 10 janvier 2027 (sangliers selon arrêté préfectoral / UG 26)"],
  ["Foire aux boudins", "Dimanche 6 décembre 2026"],
];

// Dates réservées à l'espace adhérents.
const DATES_ADHERENTS = [
  ["Remise des cartes", "Vendredi 4 septembre 2026, 17h–19h30 — cabane de la Voûte"],
  ["Réglage des carabines", "Samedi 22 août 2026 — ACCA Revel, piste du Pleurey"],
];

const JOURS = [
  ["Lundi", "Chasse individuelle petits gibiers"],
  ["Mardi", "Chasse en battue (sangliers, chevreuils)"],
  ["Mercredi", "Chasse individuelle petits gibiers"],
  ["Jeudi", "Chasse en battue (sangliers, chevreuils)"],
  ["Vendredi", "Aucune chasse (toute l'Isère)"],
  ["Samedi", "Chasse en battue (sangliers, chevreuils)"],
  ["Dimanche", "Chasse en battue (sangliers, chevreuils)"],
];

// Conseil d'administration renouvelé en AG le 11 juin 2026 (scrutin secret).
const BUREAU = [
  ["Président", "Patrice Naquin", ""],
  ["Vice-président", "Pierre Mattioni", ""],
  ["Secrétaire", "Stéphane Vincent", ""],
  ["Trésorier", "Jean-Louis Boujard", ""],
  ["Administrateur", "Antoine Benito", ""],
  ["Administrateur", "Pierre-Julien Yver", ""],
];

// Travaux collectifs — RDV 8h, terrain des sports.
const TRAVAUX = [
  ["Samedi 20 juin 2026", "Agrainage + pose de miradors"],
  ["Samedi 25 juillet 2026", "Agrainage"],
  ["Samedi 29 août 2026", "Agrainage"],
  ["Vendredi 25 septembre 2026", "Agrainage (retraités)"],
];

// Tarifs rappel 2025/2026 — à confirmer pour 2026/2027.
const TARIFS = [
  ["Résident", "90 €"],
  ["Plus de 80 ans", "Gratuit"],
  ["Extérieur", "180 €"],
  ["Invitation", "10 €"],
  ["Journalière", "20 €"],
];

const ACTUS_INIT = [
  {
    id: 1,
    date: "12 juin 2026",
    titre: "Un nouveau conseil d'administration",
    texte:
      "À la suite du décès de Marc Mure, l'assemblée générale du 11 juin 2026 a renouvelé l'intégralité du conseil par scrutin secret. Président : Patrice Naquin ; vice-président : Pierre Mattioni ; secrétaire : Stéphane Vincent ; trésorier : Jean-Louis Boujard ; administrateurs : Antoine Benito et Pierre-Julien Yver.",
    publique: true,
  },
  {
    id: 2,
    date: "12 juin 2026",
    titre: "Décisions de l'assemblée générale du 11 juin",
    texte:
      "Retrouvez les principales décisions votées en AG ainsi que le procès-verbal complet dans l'espace adhérents.",
    publique: true,
  },
  {
    id: 3,
    date: "11 juin 2026",
    titre: "Chevreuil : ouverture de 3 chevreuils au tir d'été",
    texte:
      "Trois chevreuils sont ouverts au tir d'été (approche ou affût, sans chien), du 1er juillet au 12 septembre 2026, sur autorisation préfectorale individuelle. Exécutoire après validation de la Fédération des Chasseurs de l'Isère. Inscription dans l'espace adhérents.",
    publique: true,
  },
  {
    id: 4,
    date: "11 juin 2026",
    titre: "Mise en place d'un garde particulier",
    texte:
      "Le conseil engage la désignation d'un garde particulier, possible sans modification du règlement intérieur (commissionnement et agrément préfectoral). Le garde ne peut pas être membre du conseil d'administration.",
    publique: false,
  },
  {
    id: 5,
    date: "8 juin 2026",
    titre: "Bécasse des bois : rappel réglementaire",
    texte:
      "Carnet de prélèvement obligatoire (papier ou ChassAdapt), PMA selon arrêté préfectoral. Chasse à la passée et chasse par temps de neige interdites.",
    publique: false,
  },
  {
    id: 6,
    date: "5 juin 2026",
    titre: "Réunion AICA le 25 juin",
    texte:
      "La réunion de l'AICA se tiendra le mercredi 25 juin 2026 à 19h.",
    publique: false,
  },
];

// Tir d'été du chevreuil — projet d'arrêté préfectoral n°38-2026-06 :
// approche ou affût uniquement, sans chien, sur autorisation préfectorale individuelle,
// sous l'autorité du détenteur du droit de chasse, bracelet réglementaire obligatoire,
// rabat interdit. Période 01/07/2026 → 12/09/2026. 3 chevreuils ouverts.
const TIR_ETE_INSCRITS_INIT = [];

const TIR_ETE_PLANNING_INIT = [];

const DOCS_ADHERENTS = [
  ["Règlement intérieur de chasse (RIC) 2025/2026", "PDF", "01/09/2025"],
  ["Statuts 2021 révisés", "PDF", "01/01/2021"],
  ["Engagement du chasseur", "PDF", "01/09/2025"],
  ["Consignes de sécurité à la chasse", "PDF", "01/09/2025"],
  ["Calendrier de la saison 2026/2027", "PDF", "11/06/2026"],
];

const DOCS_BUREAU = [
  ["PV de l'assemblée générale du 11 juin 2026", "PDF", "11/06/2026"],
  ["PV du conseil d'administration (désignation du bureau)", "PDF", "11/06/2026"],
  ["Statuts 2021 révisés", "PDF", "01/01/2021"],
  ["Liste des sociétaires 2024/2025", "PDF", "01/09/2024"],
  ["Bilans financiers — en attente", "—", "—"],
];

/* ---------------- Composants ---------------- */

function Eyebrow({ children, light }) {
  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: light ? "#E8C9A4" : C.cuivre,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function Titre({ children, light, size = 38 }) {
  return (
    <h2
      style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 600,
        fontSize: `clamp(26px, 4.4vw, ${size}px)`,
        lineHeight: 1.15,
        margin: "0 0 18px",
        color: light ? "#fff" : C.encre,
      }}
    >
      {children}
    </h2>
  );
}

function BandeauPhoto({ image, eyebrow, titre, texte, children }) {
  return (
    <section
      style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(13,26,17,0.62), rgba(13,26,17,0.72)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: "90px 24px",
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Eyebrow light>{eyebrow}</Eyebrow>
        <Titre light>{titre}</Titre>
        {texte && (
          <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 680, margin: 0, color: "#EDEAE0" }}>
            {texte}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

function Doc({ nom, type, maj, demo }) {
  return (
    <div className="doc-row">
      <div className="doc-badge" data-type={type}>{type}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>{nom}</div>
        <div className="mono-meta">mis à jour le {maj}</div>
      </div>
      <button className="btn-vert" onClick={demo}>Télécharger</button>
    </div>
  );
}

function CarteActu({ a }) {
  return (
    <article className="carte">
      <div className="mono-meta" style={{ color: C.cuivre, fontWeight: 700 }}>
        {a.date} {!a.publique && <span style={{ color: C.gris }}>· réservé adhérents</span>}
      </div>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 21, margin: "8px 0 10px" }}>{a.titre}</h3>
      <p style={{ margin: 0, lineHeight: 1.65, color: "#3D4438" }}>{a.texte}</p>
    </article>
  );
}

/* ---------------- Application ---------------- */

export default function App() {
  const [page, setPage] = useState("accueil");
  const [acces, setAcces] = useState(null); // null | "adherent" | "bureau" | "admin"
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState("");
  const [actus, setActus] = useState(ACTUS_INIT);
  const [menuOuvert, setMenuOuvert] = useState(false);

  // Codes (proviendront de Firebase au bloc 2 ; valeurs par défaut pour l'instant).
  const codes = CODES_DEFAUT;

  // Le bureau et l'admin ont les droits d'édition ; l'admin a en plus les réglages sensibles.
  const peutEditer = acces === "bureau" || acces === "admin";
  const estAdmin = acces === "admin";

  // formulaire publication d'actualité
  const [nTitre, setNTitre] = useState("");
  const [nTexte, setNTexte] = useState("");
  const [nPublique, setNPublique] = useState(true);

  // formulaire contact
  const [cQui, setCQui] = useState("École / sortie scolaire");
  const [cNom, setCNom] = useState("");
  const [cMsg, setCMsg] = useState("");

  // tir d'été du chevreuil
  const [tirInscrits, setTirInscrits] = useState(TIR_ETE_INSCRITS_INIT);
  const [tirPlanning, setTirPlanning] = useState(TIR_ETE_PLANNING_INIT);
  const [tirNom, setTirNom] = useState("");
  const [tirTel, setTirTel] = useState("");

  // Bandeau prioritaire (accueil) — modifiable depuis l'espace bureau/admin.
  // Sert d'hommage aujourd'hui, d'info prioritaire demain. Sera stocké dans Firebase (bloc 2).
  const [banniere, setBanniere] = useState({
    active: true,
    style: "hommage", // "hommage" (sombre) | "info" (cuivre)
    titre: "Marc Mure, président de l'ACCA d'Herbeys",
    texte:
      "L'ACCA d'Herbeys a la tristesse d'avoir perdu son président, Marc Mure, le 9 juin 2026. " +
      "Pendant dix-sept années, il a porté l'association avec passion et dévouement, au service " +
      "de la chasse, du territoire et de tous ses adhérents. Le bureau et l'ensemble des chasseurs " +
      "lui rendent hommage et poursuivent son engagement pour notre commune. Nous adressons nos " +
      "pensées les plus sincères à sa famille et à ses proches.",
    photo: true, // afficher l'emplacement photo
  });

  const demo = () => alert("Le téléchargement sera actif une fois les documents ajoutés (étape suivante).");

  const aller = (p) => {
    setPage(p);
    setMenuOuvert(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const connecter = () => {
    const c = code.trim().toUpperCase();
    if (c === codes.admin.toUpperCase()) { setAcces("admin"); setErreur(""); setCode(""); aller("espace"); }
    else if (c === codes.bureau.toUpperCase()) { setAcces("bureau"); setErreur(""); setCode(""); aller("espace"); }
    else if (c === codes.adherent.toUpperCase()) { setAcces("adherent"); setErreur(""); setCode(""); aller("espace"); }
    else { setErreur("Code incorrect. Utilisez le code transmis par l'association."); }
  };

  const publierActu = () => {
    if (!nTitre.trim() || !nTexte.trim()) return;
    const d = new Date();
    setActus([
      {
        id: Date.now(),
        date: d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
        titre: nTitre.trim(),
        texte: nTexte.trim(),
        publique: nPublique,
      },
      ...actus,
    ]);
    setNTitre(""); setNTexte("");
  };

  const sInscrireTir = () => {
    if (!tirNom.trim()) return;
    if (tirInscrits.some((p) => p.nom.toLowerCase() === tirNom.trim().toLowerCase())) {
      setTirNom(""); setTirTel(""); return;
    }
    setTirInscrits([...tirInscrits, { id: Date.now(), nom: tirNom.trim(), tel: tirTel.trim() }]);
    setTirNom(""); setTirTel("");
  };

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "[Site ACCA] " + cQui + (cNom ? " — " + cNom : "")
  )}&body=${encodeURIComponent(cMsg)}`;

  const mailtoChasse = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "[Demande de chasse extérieur] Prise de contact"
  )}&body=${encodeURIComponent(
    "Bonjour,\n\nJe souhaite chasser sur le territoire de l'ACCA d'Herbeys.\n\n" +
    "Nom et prénom :\nTéléphone :\nCommune de résidence :\nN° de permis de chasser (validé pour la saison) :\nAssurance chasse (compagnie) :\n\n" +
    "Type de demande souhaitée :\n  - Carte « invité » (accompagné par un sociétaire)\n  - Carte journalière « indépendant »\n\n" +
    "Dates ou période envisagées :\n\nMessage :\n\n" +
    "Je comprends que cette prise de contact ne vaut pas autorisation, que la demande devra être officialisée par courrier et qu'elle reste soumise à l'accord du président et du bureau.\n"
  )}`;

  const NAV = [
    ["accueil", "Accueil"],
    ["acca", "L'association"],
    ["chasse", "Saison 2026/2027"],
    ["faune", "La faune"],
    ["vie", "Vie de l'association"],
    ["contact", "Contact"],
  ];

  return (
    <div style={{ fontFamily: "'Public Sans', sans-serif", color: C.encre, background: C.creme }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Public+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        button { font-family: 'Public Sans', sans-serif; }
        .nav-lien {
          background: none; border: none; cursor: pointer; padding: 8px 2px;
          font-size: 15px; font-weight: 600; letter-spacing: 0.01em;
          color: #E9E6DB; border-bottom: 2px solid transparent;
        }
        .nav-lien:hover { color: #fff; }
        .nav-lien[data-actif="true"] { color: #F0B069; border-bottom-color: #F0B069; }
        .btn-cuivre {
          background: ${C.cuivre}; color: #fff; border: none; cursor: pointer;
          font-weight: 700; font-size: 15px; padding: 13px 26px; border-radius: 4px;
          letter-spacing: 0.02em;
        }
        .btn-cuivre:hover { background: ${C.cuivreClair}; }
        .btn-vert {
          background: ${C.foret2}; color: #fff; border: none; cursor: pointer;
          font-weight: 600; font-size: 14px; padding: 10px 18px; border-radius: 4px;
          white-space: nowrap;
        }
        .btn-vert:hover { background: #2B5439; }
        .btn-blanc {
          background: rgba(255,255,255,0.14); color: #fff; cursor: pointer;
          border: 1px solid rgba(255,255,255,0.55); font-weight: 600;
          font-size: 15px; padding: 12px 24px; border-radius: 4px;
        }
        .btn-blanc:hover { background: rgba(255,255,255,0.26); }
        .carte {
          background: #fff; border: 1px solid ${C.ligne}; border-radius: 6px;
          padding: 22px 24px;
        }
        .doc-row {
          display: flex; align-items: center; gap: 16px;
          background: #fff; border: 1px solid ${C.ligne}; border-radius: 6px;
          padding: 14px 18px;
        }
        .doc-badge {
          min-width: 52px; height: 52px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600;
          background: #F4E8DB; color: ${C.cuivre};
        }
        .doc-badge[data-type="XLSX"] { background: #E3EDE5; color: ${C.foret2}; }
        .mono-meta {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: ${C.gris};
          margin-top: 3px;
        }
        .grille { display: grid; gap: 16px; }
        input, textarea, select {
          width: 100%; padding: 12px 14px; font-size: 16px;
          border: 1px solid ${C.ligne}; border-radius: 4px;
          font-family: 'Public Sans', sans-serif; background: #fff;
        }
        input:focus-visible, textarea:focus-visible, select:focus-visible,
        button:focus-visible, a:focus-visible {
          outline: 3px solid ${C.cuivreClair}; outline-offset: 2px;
        }
        label { font-weight: 600; font-size: 14px; display: block; margin: 14px 0 6px; }
        .galerie-img {
          width: 100%; height: 200px; object-fit: cover; border-radius: 6px; display: block;
        }
        .faune-carte {
          display: flex; flex-direction: column; border-radius: 8px; overflow: hidden;
          border: 1px solid ${C.ligne}; background: #fff; text-decoration: none; color: inherit;
          transition: box-shadow .15s, transform .15s;
        }
        .faune-carte:hover { box-shadow: 0 10px 26px rgba(22,48,31,0.13); transform: translateY(-3px); }
        .faune-carte .photo { position: relative; aspect-ratio: 4/3; overflow: hidden; }
        .faune-carte .photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .faune-carte .credit {
          position: absolute; bottom: 0; right: 0;
          background: rgba(13,26,17,0.6); color: #EDEAE0;
          font-size: 9px; padding: 2px 6px; border-top-left-radius: 4px;
        }
        .faune-carte .corps { padding: 12px 14px; flex: 1; display: flex; flex-direction: column; }
        .faune-carte .corps h4 { font-family: 'Fraunces', serif; font-size: 17px; margin: 0 0 4px; }
        .faune-carte .corps p { margin: 0 0 10px; font-size: 13px; color: #4A5145; line-height: 1.45; flex: 1; }
        .faune-carte .lien {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600;
          color: ${C.cuivre};
        }
        @media (max-width: 760px) {
          .nav-desktop { display: none !important; }
          .burger { display: block !important; }
          .hommage-grid { grid-template-columns: 1fr !important; }
          .hommage-grid .photo-ph { max-width: 220px; margin: 0 auto; }
        }
        @media (min-width: 761px) {
          .nav-mobile { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      {/* ================= EN-TÊTE ================= */}
      <header style={{ background: C.foret, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 12px rgba(0,0,0,0.25)" }}>
        <div
          style={{
            maxWidth: 1140, margin: "0 auto", padding: "10px 20px",
            display: "flex", alignItems: "center", gap: 18,
          }}
        >
          <img
            src={IMG.logo}
            alt="Logo ACCA d'Herbeys"
            style={{ height: 62, width: 62, borderRadius: "50%", cursor: "pointer" }}
            onClick={() => aller("accueil")}
          />
          <div style={{ cursor: "pointer", flex: 1 }} onClick={() => aller("accueil")}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, color: "#fff", lineHeight: 1.1 }}>
              ACCA d'Herbeys
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#B9C8B6", letterSpacing: "0.12em" }}>
              CHASSE · HERBEYS · ISÈRE
            </div>
          </div>
          <nav className="nav-desktop" style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {NAV.map(([id, label]) => (
              <button key={id} className="nav-lien" data-actif={page === id} onClick={() => aller(id)}>
                {label}
              </button>
            ))}
            <button className="btn-cuivre" style={{ padding: "10px 18px" }} onClick={() => aller("espace")}>
              {acces ? "Mon espace" : "Connexion"}
            </button>
          </nav>
          <button
            className="burger nav-mobile"
            onClick={() => setMenuOuvert(!menuOuvert)}
            aria-label="Menu"
            style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer" }}
          >
            ☰
          </button>
        </div>
        {menuOuvert && (
          <nav className="nav-mobile" style={{ background: C.foret2, padding: "8px 20px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map(([id, label]) => (
              <button key={id} className="nav-lien" data-actif={page === id} onClick={() => aller(id)} style={{ textAlign: "left", padding: "10px 2px" }}>
                {label}
              </button>
            ))}
            <button className="btn-cuivre" onClick={() => aller("espace")} style={{ marginTop: 8 }}>
              {acces ? "Mon espace" : "Connexion"}
            </button>
          </nav>
        )}
      </header>

      <main>
        {/* ================= ACCUEIL ================= */}
        {page === "accueil" && (
          <>
            <section
              style={{
                position: "relative", minHeight: "78vh", display: "flex", alignItems: "center",
                backgroundImage: `linear-gradient(100deg, rgba(11,24,15,0.78) 30%, rgba(11,24,15,0.30)), url(${IMG.hero})`,
                backgroundSize: "cover", backgroundPosition: "center", color: "#fff",
                padding: "80px 24px",
              }}
            >
              <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%" }}>
                <Eyebrow light>Association communale de chasse agréée — Herbeys, Isère</Eyebrow>
                <h1
                  style={{
                    fontFamily: "'Fraunces', serif", fontWeight: 700,
                    fontSize: "clamp(36px, 6.5vw, 64px)", lineHeight: 1.08,
                    margin: "0 0 22px", maxWidth: 760,
                  }}
                >
                  Promouvoir la chasse, défendre la ruralité, préserver la biodiversité.
                </h1>
                <p style={{ fontSize: 19, lineHeight: 1.7, maxWidth: 620, color: "#EAE7DC", margin: "0 0 32px" }}>
                  Ouverts au dialogue, les chasseurs d'Herbeys restent à votre écoute. Habitants,
                  promeneurs, écoles, organisateurs : ce site est aussi le vôtre.
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <button className="btn-cuivre" onClick={() => aller("acca")}>Découvrir l'association</button>
                  <button className="btn-blanc" onClick={() => aller("contact")}>Organiser une sortie en forêt ?</button>
                </div>
              </div>
            </section>

            {/* Bandeau prioritaire — piloté depuis l'espace bureau/admin (hommage ou info) */}
            {banniere.active && (
              <section style={{
                background: banniere.style === "info" ? C.cuivre : "#0F1F14",
                color: banniere.style === "info" ? "#fff" : "#EDEAE0",
                padding: "56px 24px",
                borderBottom: "3px solid " + (banniere.style === "info" ? "#fff" : C.cuivre),
              }}>
                <div
                  className="hommage-grid"
                  style={{
                    maxWidth: 1000, margin: "0 auto", display: "grid", gap: 32,
                    gridTemplateColumns: banniere.photo ? "minmax(160px, 220px) 1fr" : "1fr",
                    alignItems: "center",
                  }}
                >
                  {banniere.photo && (
                    <div
                      className="photo-ph"
                      style={{
                        aspectRatio: "3/4", borderRadius: 8, overflow: "hidden",
                        background: "#1E3D29", border: "1px solid rgba(255,255,255,0.14)",
                      }}
                    >
                      <img
                        src={banniere.photoSrc || "/marc-mure.jpg"}
                        alt={banniere.titre}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  )}
                  <div>
                    <div
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: banniere.style === "info" ? "#FFE8D5" : "#E8C9A4", marginBottom: 12,
                      }}
                    >
                      {banniere.style === "info" ? "Information" : "En hommage"}
                    </div>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "clamp(24px, 3.6vw, 34px)", margin: "0 0 14px" }}>
                      {banniere.titre}
                    </h2>
                    <p style={{ fontSize: 17, lineHeight: 1.75, margin: 0, maxWidth: 640, whiteSpace: "pre-line" }}>
                      {banniere.texte}
                    </p>
                  </div>
                </div>
              </section>
            )}

            <section style={{ background: C.foret2, color: "#fff", padding: "44px 24px" }}>
              <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <Eyebrow light>Saison 2026 / 2027 — dates à retenir</Eyebrow>
                <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
                  {DATES_PUBLIQUES.map(([t, d], i) => (
                    <div key={i} style={{ borderLeft: "3px solid " + C.cuivreClair, paddingLeft: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{t}</div>
                      <div style={{ fontSize: 14, color: "#D8DECF", lineHeight: 1.5 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Actualités publiques */}
            <section style={{ padding: "70px 24px", maxWidth: 1140, margin: "0 auto" }}>
              <Eyebrow>Actualités</Eyebrow>
              <Titre>Les dernières informations</Titre>
              <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
                {actus.filter((a) => a.publique).slice(0, 3).map((a) => <CarteActu key={a.id} a={a} />)}
              </div>
              <p style={{ color: C.gris, marginTop: 18, fontSize: 15 }}>
                Les actualités sont publiées par le bureau depuis son espace de gestion — sans
                toucher au site.
              </p>
            </section>

            {/* Bloc écoles / manifestations */}
            <BandeauPhoto
              image={IMG.vie}
              eyebrow="Partage du territoire"
              titre="Écoles, organisateurs de manifestations sportives"
              texte="Vous préparez une sortie scolaire, un trail, une randonnée organisée ou toute activité en forêt sur la commune d'Herbeys ? Contactez-nous directement : nous vous renseignerons sur les jours et zones de chasse afin que chacun profite de la nature en toute sécurité."
            >
              <button className="btn-cuivre" style={{ marginTop: 28 }} onClick={() => aller("contact")}>
                Nous contacter
              </button>
            </BandeauPhoto>

            {/* Partenaires */}
            <section style={{ padding: "56px 24px", maxWidth: 1140, margin: "0 auto", display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <Eyebrow>Liens utiles</Eyebrow>
                <p style={{ margin: 0, lineHeight: 1.7, color: "#3D4438" }}>
                  L'ACCA travaille avec la Fédération des Chasseurs de l'Isère et la mairie d'Herbeys.
                </p>
              </div>
              <a href="https://www.chasse38.com" target="_blank" rel="noreferrer">
                <img src={IMG.fdci} alt="Fédération des Chasseurs de l'Isère" style={{ height: 72, width: "auto" }} />
              </a>
              <a href="https://www.herbeys.fr" target="_blank" rel="noreferrer">
                <img src={IMG.mairie} alt="Mairie d'Herbeys" style={{ height: 54, width: "auto" }} />
              </a>
            </section>
          </>
        )}

        {/* ================= L'ACCA ================= */}
        {page === "acca" && (
          <>
            <BandeauPhoto
              image={IMG.acca}
              eyebrow="L'association"
              titre="Qu'est-ce qu'une ACCA ?"
              texte="Une Association Communale de Chasse Agréée est une structure encadrée par le Code de l'environnement. Elle organise la chasse sur le territoire communal, assure une gestion raisonnée du gibier, entretient les milieux naturels et veille à la sécurité de tous les usagers de la nature."
            />
            <section style={{ padding: "70px 24px", maxWidth: 1140, margin: "0 auto" }}>
              <Eyebrow>Nos missions</Eyebrow>
              <Titre>Le rôle de l'ACCA d'Herbeys</Titre>
              <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                {[
                  ["Gestion du gibier", "Plan de chasse chevreuil, régulation du sanglier, comptages, agrainage et suivi des populations en lien avec la Fédération de l'Isère."],
                  ["Entretien du territoire", "Travaux collectifs : pose et entretien des miradors, ouverture de layons, signalisation des zones de chasse, réserve de chasse et de faune sauvage."],
                  ["Sécurité et dialogue", "Pose des panneaux « chasse en cours », règles strictes en battue, information du public et échanges avec la mairie, les écoles et les associations."],
                ].map(([t, x], i) => (
                  <div key={i} className="carte" style={{ borderTop: "3px solid " + C.cuivre }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, margin: "0 0 10px" }}>{t}</h3>
                    <p style={{ margin: 0, lineHeight: 1.65, color: "#3D4438" }}>{x}</p>
                  </div>
                ))}
              </div>
            </section>
            <section
              style={{
                backgroundImage: `linear-gradient(rgba(22,48,31,0.88), rgba(22,48,31,0.88)), url(${IMG.bureau})`,
                backgroundSize: "cover", backgroundPosition: "center",
                padding: "70px 24px", color: "#fff",
              }}
            >
              <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <Eyebrow light>Le conseil d'administration</Eyebrow>
                <Titre light>Les administrateurs de l'ACCA</Titre>
                <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                  {BUREAU.map(([role, nom, tel], i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 6, padding: "18px 20px" }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F0B069" }}>{role}</div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, margin: "6px 0 4px" }}>{nom}</div>
                      {tel && <div style={{ fontSize: 14, color: "#D8DECF" }}>{tel}</div>}
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 26, color: "#D8DECF", lineHeight: 1.6 }}>
                  Conseil renouvelé en assemblée générale le 11 juin 2026 (scrutin secret),
                  à la suite du décès du président Marc Mure. Prochaine élection en 2027.
                </p>
                <p style={{ marginTop: 10, color: "#D8DECF", lineHeight: 1.6, fontSize: 14 }}>
                  Siège social : Mairie d'Herbeys, Place de l'église, 38320 Herbeys.<br />
                  N° RNA : W381011410 · SIRET : 779 560 978 00016.<br />
                  {EMAIL_EN_ATTENTE
                    ? "Email : nouvelle adresse en cours de création."
                    : <a href={`mailto:${EMAIL}`} style={{ color: "#F0B069" }}>{EMAIL}</a>}
                </p>
              </div>
            </section>
          </>
        )}

        {/* ================= LA CHASSE ================= */}
        {page === "chasse" && (
          <>
            <BandeauPhoto
              image={IMG.chasse}
              eyebrow="Saison 2026 / 2027"
              titre="Le calendrier de la saison"
              texte="Ouverture générale le dimanche 13 septembre 2026, clôture ACCA le dimanche 10 janvier 2027 (sangliers selon arrêté préfectoral). Le vendredi, aucune chasse n'est pratiquée en Isère. Une réserve de chasse et de faune sauvage couvre une partie du territoire, où la chasse est interdite."
            />
            <section style={{ padding: "70px 24px", maxWidth: 1140, margin: "0 auto", display: "grid", gap: 50, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
              <div>
                <Eyebrow>Semaine type</Eyebrow>
                <Titre size={30}>Les jours chassés</Titre>
                <div style={{ border: "1px solid " + C.ligne, borderRadius: 6, overflow: "hidden", background: "#fff" }}>
                  {JOURS.map(([j, x], i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: "13px 18px", borderTop: i ? "1px solid " + C.ligne : "none", background: j === "Vendredi" ? "#F6F1E6" : "#fff" }}>
                      <strong style={{ width: 90, flexShrink: 0 }}>{j}</strong>
                      <span style={{ color: "#3D4438" }}>{x}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: C.gris, marginTop: 12 }}>
                  Jours susceptibles d'évoluer selon les décisions de l'assemblée générale et les arrêtés préfectoraux.
                </p>
              </div>
              <div>
                <Eyebrow>Dates clés</Eyebrow>
                <Titre size={30}>À retenir</Titre>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {DATES_PUBLIQUES.map(([t, d], i) => (
                    <div key={i} style={{ borderLeft: "3px solid " + C.cuivre, paddingLeft: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{t}</div>
                      <div style={{ fontSize: 14, color: "#3D4438", lineHeight: 1.5 }}>{d}</div>
                    </div>
                  ))}
                </div>
                <div className="carte" style={{ marginTop: 24, background: "#F6F1E6", border: "1px solid " + C.ligne }}>
                  <strong style={{ display: "block", marginBottom: 6 }}>Adhérents</strong>
                  <p style={{ margin: "0 0 12px", color: "#3D4438", fontSize: 15, lineHeight: 1.55 }}>
                    Calendrier des travaux collectifs, tarifs des cartes, dates de remise des cartes
                    et de réglage des carabines : à retrouver dans l'espace adhérents.
                  </p>
                  <button className="btn-vert" onClick={() => aller("espace")}>Accéder à l'espace adhérents</button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================= LA FAUNE ================= */}
        {page === "faune" && (
          <>
            <BandeauPhoto
              image={IMG.faune}
              eyebrow="Connaître pour préserver"
              titre="La faune de nos coteaux"
              texte="Chevreuils, cerfs, sangliers, lièvres, renards, faisans, perdrix, bécasses… Découvrez le gibier à poil et à plume qui peuple le territoire d'Herbeys. Certaines espèces renvoient à une fiche descriptive complète (PDF)."
            />
            <section style={{ padding: "60px 24px", maxWidth: 1140, margin: "0 auto" }}>
              <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {FAUNE.map((f, i) => {
                  const Tag = f.pdf ? "a" : "div";
                  return (
                    <Tag key={i} className="faune-carte" {...(f.pdf ? { href: f.pdf, target: "_blank", rel: "noreferrer" } : {})}>
                      <div className="photo">
                        <img src={f.image} alt={f.nom} loading="lazy" />
                        <span className="credit">{f.credit}</span>
                      </div>
                      <div className="corps">
                        <h4>{f.nom}</h4>
                        <p>{f.desc}</p>
                        {f.pdf
                          ? <span className="lien">Lire la fiche →</span>
                          : <span className="lien" style={{ color: C.gris }}>Présent sur le territoire</span>}
                      </div>
                    </Tag>
                  );
                })}
              </div>
              <p style={{ color: C.gris, marginTop: 20, fontSize: 14 }}>
                Photographies sous licence Creative Commons (Wikimedia Commons), crédits indiqués
                sur chaque image. Les fiches descriptives proviennent du fonds documentaire de
                l'ACCA.
              </p>
            </section>
          </>
        )}

        {/* ================= VIE DE L'ASSOCIATION ================= */}
        {page === "vie" && (
          <>
            <BandeauPhoto
              image={IMG.vie}
              eyebrow="Animation"
              titre="La vie de l'association"
              texte="Foire aux boudins, repas de chasse, travaux collectifs, journée de réglage des carabines : l'ACCA, c'est aussi des moments de convivialité ouverts au village."
            />
            <section style={{ padding: "60px 24px", maxWidth: 1140, margin: "0 auto" }}>
              <Eyebrow>En images</Eyebrow>
              <Titre size={30}>Galerie</Titre>
              <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {GALERIE.map((src, i) => (
                  <img key={i} className="galerie-img" src={src} alt={`Vie de l'association ${i + 1}`} loading="lazy" />
                ))}
              </div>
              <div className="carte" style={{ marginTop: 40, borderLeft: "4px solid " + C.cuivre }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, margin: "0 0 8px" }}>
                  Foire aux boudins — dimanche 6 décembre 2026
                </h3>
                <p style={{ margin: 0, lineHeight: 1.65, color: "#3D4438" }}>
                  De 8h à 13h. Le rendez-vous incontournable de l'hiver à Herbeys, ouvert à tous.
                  Venez nombreux !
                </p>
              </div>
            </section>
          </>
        )}

        {/* ================= CONTACT ================= */}
        {page === "contact" && (
          <>
            <BandeauPhoto
              image={IMG.jours}
              eyebrow="Contact"
              titre="Rentrer en contact avec l'ACCA"
              texte="Écoles, organisateurs de manifestations sportives, promeneurs, propriétaires, chasseurs extérieurs : écrivez-nous pour connaître les jours et zones de chasse, déposer une demande, ou pour toute question."
            />
            <section style={{ padding: "60px 24px", maxWidth: 760, margin: "0 auto" }}>
              <div className="carte" style={{ padding: "30px 28px" }}>
                <label htmlFor="qui">Vous êtes</label>
                <select id="qui" value={cQui} onChange={(e) => setCQui(e.target.value)}>
                  <option>École / sortie scolaire</option>
                  <option>Organisateur de manifestation sportive</option>
                  <option>Promeneur / habitant</option>
                  <option>Propriétaire foncier</option>
                  <option>Chasseur extérieur — demande de chasse</option>
                  <option>Autre demande</option>
                </select>
                <label htmlFor="nom">Votre nom (ou celui de votre structure)</label>
                <input id="nom" value={cNom} onChange={(e) => setCNom(e.target.value)} placeholder="École des Béalières, Trail de Belledonne…" />
                <label htmlFor="msg">Votre message</label>
                <textarea
                  id="msg" rows={6} value={cMsg} onChange={(e) => setCMsg(e.target.value)}
                  placeholder="Dates envisagées, secteur concerné, nombre de participants…"
                />
                {EMAIL_EN_ATTENTE ? (
                  <div
                    style={{
                      marginTop: 20, padding: "14px 16px", borderRadius: 6,
                      background: "#F6F1E6", border: "1px solid " + C.ligne,
                      color: "#3D4438", fontSize: 15,
                    }}
                  >
                    Le formulaire sera actif dès l'ouverture de la nouvelle adresse email.
                    En attendant, vous pouvez nous joindre via la mairie d'Herbeys.
                  </div>
                ) : (
                  <a href={mailto} className="btn-cuivre" style={{ display: "inline-block", marginTop: 20, textDecoration: "none", textAlign: "center" }}>
                    Envoyer le message
                  </a>
                )}
                <p style={{ fontSize: 13, color: C.gris, marginTop: 14, marginBottom: 0 }}>
                  {EMAIL_EN_ATTENTE
                    ? "La nouvelle adresse email de l'association est en cours de création. En attendant, vous pouvez nous joindre via la mairie d'Herbeys."
                    : `Le message s'ouvre dans votre messagerie, adressé à ${EMAIL}. Sur le site final, un envoi direct depuis la page pourra être mis en place.`}
                </p>
              </div>
              <div style={{ marginTop: 30, lineHeight: 1.8, color: "#3D4438" }}>
                <strong>ACCA d'Herbeys</strong>
                <br />Siège social : Mairie d'Herbeys, Place de l'église, 38320 Herbeys
                <br />Contact : par email, ou via la mairie d'Herbeys qui transmet les demandes.
                {!EMAIL_EN_ATTENTE && (
                  <><br />Email : <a href={`mailto:${EMAIL}`} style={{ color: C.cuivre }}>{EMAIL}</a></>
                )}
              </div>
            </section>

            {/* Chasser sur notre territoire (chasseurs extérieurs) */}
            <section style={{ padding: "0 24px 70px", maxWidth: 760, margin: "0 auto" }}>
              <div className="carte" style={{ padding: "30px 28px", borderTop: "4px solid " + C.cuivre }}>
                <Eyebrow>Chasseurs extérieurs</Eyebrow>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, margin: "0 0 12px" }}>
                  Chasser sur notre territoire
                </h3>
                <p style={{ lineHeight: 1.65, color: "#3D4438", margin: "0 0 14px" }}>
                  Un chasseur extérieur peut chasser à Herbeys selon deux formules prévues par le
                  règlement intérieur :
                </p>
                <ul style={{ margin: "0 0 16px", paddingLeft: 20, lineHeight: 1.7, color: "#3D4438" }}>
                  <li>
                    <strong>Carte « invité »</strong> — accompagné par un sociétaire, qui en assume
                    la responsabilité. 10 €, réglée par le sociétaire (2 cartes/an maximum par
                    chasseur).
                  </li>
                  <li>
                    <strong>Carte journalière « indépendant »</strong> — 20 €, à la discrétion du
                    président et du bureau, à partir du 2ᵉ week-end d'octobre jusqu'à la clôture.
                  </li>
                </ul>
                <p style={{ lineHeight: 1.65, color: "#3D4438", margin: "0 0 18px" }}>
                  Dans tous les cas, permis de chasser validé pour la saison et attestation
                  d'assurance obligatoires. Ce premier contact ne vaut pas autorisation : la
                  demande devra être officialisée par courrier et reste soumise à l'accord du
                  président et du bureau.
                </p>
                {EMAIL_EN_ATTENTE ? (
                  <div style={{ padding: "14px 16px", borderRadius: 6, background: "#F6F1E6", border: "1px solid " + C.ligne, color: "#3D4438", fontSize: 15 }}>
                    Demande possible dès l'ouverture de la nouvelle adresse email. En attendant,
                    vous pouvez nous joindre via la mairie d'Herbeys.
                  </div>
                ) : (
                  <a href={mailtoChasse} className="btn-cuivre" style={{ display: "inline-block", textDecoration: "none" }}>
                    Déposer une demande de chasse
                  </a>
                )}
              </div>
            </section>
          </>
        )}
        {page === "espace" && !acces && (
          <section style={{ padding: "70px 24px", maxWidth: 460, margin: "0 auto" }}>
            <Eyebrow>Accès réservé</Eyebrow>
            <Titre>Connexion</Titre>
            <p style={{ lineHeight: 1.7, color: "#3D4438" }}>
              Saisissez le code transmis par l'association. Adhérents, bureau et administrateur :
              c'est le code qui détermine votre espace.
            </p>
            <div className="carte" style={{ borderTop: "4px solid " + C.cuivre, marginTop: 8 }}>
              <label htmlFor="code">Code d'accès</label>
              <input
                id="code" type="password" value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && connecter()}
                placeholder="••••••••"
                style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.15em", fontSize: 18 }}
              />
              {erreur && (
                <p style={{ color: "#B3261E", fontWeight: 600, margin: "12px 0 0" }}>{erreur}</p>
              )}
              <button className="btn-cuivre" style={{ width: "100%", marginTop: 14, padding: "13px" }} onClick={connecter}>
                Entrer
              </button>
            </div>
          </section>
        )}

        {/* ================= ESPACES CONNECTÉS ================= */}
        {page === "espace" && acces && (
          <section style={{ padding: "56px 24px", maxWidth: 1140, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 30 }}>
              <Titre size={34}>{estAdmin ? "Espace admin" : acces === "bureau" ? "Espace bureau" : "Espace adhérents"}</Titre>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff",
                  background: estAdmin ? "#7A2E12" : acces === "bureau" ? C.cuivre : C.foret2,
                  padding: "6px 12px", borderRadius: 999, marginBottom: 18,
                }}
              >
                {estAdmin ? "Admin" : acces === "bureau" ? "Bureau" : "Adhérent"}
              </span>
              <div style={{ flex: 1 }} />
              <button className="btn-vert" style={{ background: "#8A857A", marginBottom: 18 }} onClick={() => { setAcces(null); setCode(""); }}>
                Se déconnecter
              </button>
            </div>

            {/* Groupes WhatsApp (chasseurs) */}
            <Eyebrow>Rester en contact</Eyebrow>
            <Titre size={26}>Groupes WhatsApp de l'ACCA</Titre>
            <p style={{ color: "#3D4438", lineHeight: 1.6, maxWidth: 720, marginTop: -6 }}>
              Rejoignez les groupes de la communauté « ACCA Herbeys ». Réservés aux adhérents,
              ils servent à organiser les chasses et à échanger entre membres.
            </p>
            <div
              className="grille"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginBottom: 44 }}
            >
              {WHATSAPP_GROUPES.map((g, i) => (
                <a
                  key={i} href={g.lien} target="_blank" rel="noreferrer"
                  className="carte" style={{ textDecoration: "none", color: C.encre, borderLeft: "4px solid #25D366" }}
                >
                  <strong style={{ fontSize: 17 }}>💬 {g.nom}</strong>
                  <p style={{ margin: "6px 0 12px", color: C.gris, fontSize: 14 }}>{g.desc}</p>
                  <span style={{ color: "#1E7E45", fontWeight: 600, fontSize: 14 }}>Rejoindre le groupe →</span>
                </a>
              ))}
            </div>

            {peutEditer && (
              <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", marginBottom: 40 }}>
                <a
                  href="https://mail.google.com" target="_blank" rel="noreferrer"
                  className="carte" style={{ textDecoration: "none", color: C.encre, borderLeft: "4px solid #D93025" }}
                >
                  <strong style={{ fontSize: 17 }}>📧 Boîte mail du bureau</strong>
                  <p style={{ margin: "6px 0 0", color: C.gris, fontSize: 14 }}>Ouvrir la messagerie Gmail de l'association</p>
                </a>
                <a
                  href="https://www.chasse38.com" target="_blank" rel="noreferrer"
                  className="carte" style={{ textDecoration: "none", color: C.encre, borderLeft: "4px solid " + C.foret2 }}
                >
                  <strong style={{ fontSize: 17 }}>🦌 Espace adhérent FDC 38</strong>
                  <p style={{ margin: "6px 0 0", color: C.gris, fontSize: 14 }}>Accéder au portail de la Fédération des Chasseurs de l'Isère</p>
                </a>
                <a
                  href="https://www.herbeys.fr" target="_blank" rel="noreferrer"
                  className="carte" style={{ textDecoration: "none", color: C.encre, borderLeft: "4px solid " + C.cuivre }}
                >
                  <strong style={{ fontSize: 17 }}>🏛 Mairie d'Herbeys</strong>
                  <p style={{ margin: "6px 0 0", color: C.gris, fontSize: 14 }}>Site de la commune</p>
                </a>
              </div>
            )}

            {/* Bandeau prioritaire / hommage (bureau + admin) */}
            {peutEditer && (
              <div className="carte" style={{ marginBottom: 44, borderTop: "4px solid #0F1F14" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 23, margin: 0, flex: 1 }}>
                    Bandeau d'accueil
                  </h3>
                  <label style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                    <input
                      type="checkbox" checked={banniere.active} style={{ width: "auto" }}
                      onChange={(e) => setBanniere({ ...banniere, active: e.target.checked })}
                    />
                    Afficher en page d'accueil
                  </label>
                </div>
                <p style={{ color: C.gris, fontSize: 15, margin: "6px 0 8px" }}>
                  Encart en haut de l'accueil : hommage, ou information prioritaire (battue exceptionnelle,
                  fermeture, annonce). Décochez la case pour le masquer.
                </p>
                <label htmlFor="bstyle">Style</label>
                <select
                  id="bstyle" value={banniere.style}
                  onChange={(e) => setBanniere({ ...banniere, style: e.target.value })}
                >
                  <option value="hommage">Hommage (sobre, sombre)</option>
                  <option value="info">Information (cuivre, mise en avant)</option>
                </select>
                <label htmlFor="btitre">Titre</label>
                <input id="btitre" value={banniere.titre} onChange={(e) => setBanniere({ ...banniere, titre: e.target.value })} />
                <label htmlFor="btexte">Texte</label>
                <textarea id="btexte" rows={4} value={banniere.texte} onChange={(e) => setBanniere({ ...banniere, texte: e.target.value })} />
                <label style={{ margin: "14px 0 0", display: "flex", alignItems: "center", gap: 8, fontWeight: 400 }}>
                  <input
                    type="checkbox" checked={banniere.photo} style={{ width: "auto" }}
                    onChange={(e) => setBanniere({ ...banniere, photo: e.target.checked })}
                  />
                  Afficher un emplacement photo
                </label>
              </div>
            )}

            {/* Gestion des actualités (bureau) */}
            {peutEditer && (
              <div className="carte" style={{ marginBottom: 44, borderTop: "4px solid " + C.cuivre }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 23, margin: "0 0 4px" }}>
                  Gérer les actualités
                </h3>
                <p style={{ color: C.gris, fontSize: 15, margin: "0 0 8px" }}>
                  Publiez une information : elle apparaît immédiatement sur le site, en page
                  d'accueil si elle est publique, dans l'espace adhérents sinon. Aucune
                  connaissance technique nécessaire.
                </p>
                <label htmlFor="ntitre">Titre</label>
                <input id="ntitre" value={nTitre} onChange={(e) => setNTitre(e.target.value)} placeholder="Ex. : Battue annulée ce dimanche" />
                <label htmlFor="ntexte">Texte</label>
                <textarea id="ntexte" rows={3} value={nTexte} onChange={(e) => setNTexte(e.target.value)} />
                <div style={{ display: "flex", gap: 18, alignItems: "center", marginTop: 14, flexWrap: "wrap" }}>
                  <label style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, fontWeight: 400 }}>
                    <input type="radio" name="vis" checked={nPublique} onChange={() => setNPublique(true)} style={{ width: "auto" }} />
                    Publique (page d'accueil)
                  </label>
                  <label style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, fontWeight: 400 }}>
                    <input type="radio" name="vis" checked={!nPublique} onChange={() => setNPublique(false)} style={{ width: "auto" }} />
                    Réservée aux adhérents
                  </label>
                  <div style={{ flex: 1 }} />
                  <button className="btn-cuivre" onClick={publierActu}>Publier</button>
                </div>
              </div>
            )}

            {/* Actualités internes */}
            <Eyebrow>Informations</Eyebrow>
            <Titre size={26}>Actualités {peutEditer ? "(toutes)" : "internes et publiques"}</Titre>
            <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", marginBottom: 50 }}>
              {actus.map((a) => (
                <div key={a.id} style={{ position: "relative" }}>
                  <CarteActu a={a} />
                  {peutEditer && (
                    <button
                      onClick={() => setActus(actus.filter((x) => x.id !== a.id))}
                      style={{
                        position: "absolute", top: 10, right: 10, background: "#FBEAE8",
                        color: "#B3261E", border: "none", borderRadius: 4, padding: "4px 10px",
                        cursor: "pointer", fontSize: 13, fontWeight: 600,
                      }}
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Tir d'été du chevreuil */}
            <Eyebrow>Chasse anticipée</Eyebrow>
            <Titre size={26}>Tir d'été du chevreuil</Titre>
            <p style={{ color: "#3D4438", lineHeight: 1.6, maxWidth: 720, marginTop: -6 }}>
              Trois chevreuils ouverts au tir d'été, du 1ᵉʳ juillet au 12 septembre 2026, à
              l'approche ou à l'affût uniquement, sans chien et sans rabat, sur autorisation
              préfectorale individuelle et sous l'autorité du détenteur du droit de chasse
              (bracelet réglementaire obligatoire). Exécutoire après validation de la FDCI.
              Inscrivez-vous ci-dessous : les créneaux sont attribués par tirage au sort, puis
              publiés dans le planning.
            </p>
            <div
              className="grille"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginBottom: 18, alignItems: "start" }}
            >
              {/* Inscription */}
              <div className="carte" style={{ borderTop: "4px solid " + C.foret2 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, margin: "0 0 4px" }}>
                  S'inscrire
                </h3>
                <p style={{ color: C.gris, fontSize: 14, margin: "0 0 10px" }}>
                  {tirInscrits.length} inscrit{tirInscrits.length > 1 ? "s" : ""} pour la saison.
                </p>
                <label htmlFor="tirnom">Nom et prénom</label>
                <input id="tirnom" value={tirNom} onChange={(e) => setTirNom(e.target.value)} placeholder="Prénom NOM" />
                <label htmlFor="tirtel">Téléphone (facultatif)</label>
                <input id="tirtel" value={tirTel} onChange={(e) => setTirTel(e.target.value)} placeholder="06 .. .. .. .." />
                <button className="btn-vert" style={{ width: "100%", marginTop: 14, padding: "12px" }} onClick={sInscrireTir}>
                  Je m'inscris au tir d'été
                </button>
                <div style={{ marginTop: 16 }}>
                  {tirInscrits.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "7px 0", borderTop: "1px solid " + C.ligne, fontSize: 15,
                      }}
                    >
                      <span style={{ flex: 1 }}>{p.nom}{p.tel ? " · " + p.tel : ""}</span>
                      {peutEditer && (
                        <button
                          onClick={() => setTirInscrits(tirInscrits.filter((x) => x.id !== p.id))}
                          style={{ background: "none", border: "none", color: "#B3261E", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
                        >
                          retirer
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Planning */}
              <div className="carte" style={{ borderTop: "4px solid " + C.cuivre, gridColumn: "1 / -1" }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, margin: "0 0 4px" }}>
                  Planning après tirage au sort
                </h3>
                <p style={{ color: C.gris, fontSize: 14, margin: "0 0 14px" }}>
                  {tirPlanning.length
                    ? "Attributions de la saison. En cas d'empêchement, prévenez le bureau."
                    : "Le planning sera publié par le bureau après le tirage au sort."}
                </p>
                {tirPlanning.length > 0 && (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, minWidth: 480 }}>
                      <thead>
                        <tr style={{ textAlign: "left", color: C.foret2 }}>
                          <th style={{ padding: "8px 10px", borderBottom: "2px solid " + C.ligne }}>Date</th>
                          <th style={{ padding: "8px 10px", borderBottom: "2px solid " + C.ligne }}>Créneau</th>
                          <th style={{ padding: "8px 10px", borderBottom: "2px solid " + C.ligne }}>Secteur</th>
                          <th style={{ padding: "8px 10px", borderBottom: "2px solid " + C.ligne }}>Chasseur</th>
                          {peutEditer && <th style={{ borderBottom: "2px solid " + C.ligne }} />}
                        </tr>
                      </thead>
                      <tbody>
                        {tirPlanning.map((r) => (
                          <tr key={r.id}>
                            <td style={{ padding: "9px 10px", borderBottom: "1px solid " + C.ligne }}>{r.date}</td>
                            <td style={{ padding: "9px 10px", borderBottom: "1px solid " + C.ligne }}>{r.creneau}</td>
                            <td style={{ padding: "9px 10px", borderBottom: "1px solid " + C.ligne }}>{r.secteur}</td>
                            <td style={{ padding: "9px 10px", borderBottom: "1px solid " + C.ligne, fontWeight: 600 }}>{r.chasseur}</td>
                            {peutEditer && (
                              <td style={{ borderBottom: "1px solid " + C.ligne, textAlign: "right" }}>
                                <button
                                  onClick={() => setTirPlanning(tirPlanning.filter((x) => x.id !== r.id))}
                                  style={{ background: "none", border: "none", color: "#B3261E", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
                                >
                                  retirer
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {peutEditer && (
                  <button className="btn-vert" style={{ marginTop: 16 }} onClick={demo}>
                    + Ajouter une attribution (après tirage)
                  </button>
                )}
              </div>
            </div>
            <div style={{ marginBottom: 50 }} />

            {/* Saison 2026/2027 — réservé adhérents */}
            <Eyebrow>Saison 2026/2027</Eyebrow>
            <Titre size={26}>Dates, travaux et tarifs</Titre>
            <div className="grille" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginBottom: 18, alignItems: "start" }}>
              <div className="carte">
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, margin: "0 0 12px" }}>Dates adhérents</h3>
                {DATES_ADHERENTS.map(([t, d], i) => (
                  <div key={i} style={{ borderLeft: "3px solid " + C.cuivre, paddingLeft: 12, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{t}</div>
                    <div style={{ fontSize: 14, color: "#3D4438", lineHeight: 1.5 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div className="carte">
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, margin: "0 0 4px" }}>Travaux collectifs</h3>
                <p style={{ color: C.gris, fontSize: 14, margin: "0 0 12px" }}>RDV 8h, terrain des sports.</p>
                {TRAVAUX.map(([d, x], i) => (
                  <div key={i} style={{ padding: "8px 0", borderTop: i ? "1px solid " + C.ligne : "none" }}>
                    <strong style={{ fontSize: 15 }}>{d}</strong>
                    <div style={{ fontSize: 14, color: "#3D4438" }}>{x}</div>
                  </div>
                ))}
              </div>
              <div className="carte">
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, margin: "0 0 12px" }}>Tarifs des cartes</h3>
                {TARIFS.map(([t, p], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderTop: i ? "1px solid " + C.ligne : "none" }}>
                    <span style={{ color: "#3D4438" }}>{t}</span>
                    <strong>{p}</strong>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: C.gris, marginTop: 10 }}>
                  Rappel 2025/2026 — montants 2026/2027 à confirmer. Abattements pour participation aux corvées.
                </p>
              </div>
            </div>
            <div style={{ marginBottom: 50 }} />

            {/* Réglementation et sécurité (adhérents) */}
            <Eyebrow>Réglementation</Eyebrow>
            <Titre size={26}>Sécurité et règles essentielles</Titre>
            <div className="carte" style={{ borderTop: "4px solid " + C.cuivre, marginBottom: 50 }}>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, color: "#3D4438" }}>
                <li>Port du vêtement fluorescent orange obligatoire en action de chasse collective.</li>
                <li>Chasse interdite à moins de 150 m des habitations, sur les routes, chemins publics, stades et lieux fréquentés.</li>
                <li>Identification formelle du gibier avant tout tir ; tir fichant à courte distance en battue.</li>
                <li>Zones de battue signalées par les panneaux « chasse en cours » sur les accès principaux.</li>
                <li>Arme déchargée et sous étui pour tout déplacement et en présence d'un autre usager.</li>
                <li>Registre de battue obligatoire ; consignes rappelées à voix haute avant chaque chasse collective.</li>
                <li>Bécasse des bois : carnet de prélèvement obligatoire (papier ou ChassAdapt), chasse à la passée et par temps de neige interdites.</li>
              </ul>
              <p style={{ fontSize: 14, color: C.gris, margin: "14px 0 0" }}>
                Le règlement intérieur (RIC), l'engagement du chasseur et les consignes de sécurité
                complètes sont disponibles ci-dessous.
              </p>
            </div>

            {/* Documents */}
            <Eyebrow>Documents</Eyebrow>
            <Titre size={26}>Documents des adhérents</Titre>
            <div className="grille" style={{ marginBottom: 44 }}>
              {DOCS_ADHERENTS.map(([n, t, m], i) => <Doc key={i} nom={n} type={t} maj={m} demo={demo} />)}
            </div>

            {peutEditer && (
              <>
                <Eyebrow>Administration</Eyebrow>
                <Titre size={26}>Documents du bureau</Titre>
                <div className="grille">
                  {DOCS_BUREAU.map(([n, t, m], i) => <Doc key={i} nom={n} type={t} maj={m} demo={demo} />)}
                </div>
                <button className="btn-vert" style={{ marginTop: 18 }} onClick={demo}>
                  + Ajouter un document
                </button>
              </>
            )}
          </section>
        )}
      </main>

      {/* ================= PIED DE PAGE ================= */}
      <footer style={{ background: C.foret, color: "#C6CDBF", marginTop: 0 }}>
        <div
          style={{
            maxWidth: 1140, margin: "0 auto", padding: "44px 24px",
            display: "grid", gap: 30, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <div>
            <img src={IMG.logo} alt="" style={{ height: 72, width: 72, borderRadius: "50%", marginBottom: 12 }} />
            <div style={{ fontFamily: "'Fraunces', serif", color: "#fff", fontSize: 18 }}>ACCA d'Herbeys</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 6 }}>
              Mairie d'Herbeys, Place de l'église
              <br />38320 Herbeys
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 10 }}>Navigation</div>
            {NAV.map(([id, label]) => (
              <button key={id} className="nav-lien" onClick={() => aller(id)} style={{ display: "block", padding: "4px 0", fontSize: 14 }}>
                {label}
              </button>
            ))}
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 10 }}>Contact</div>
            {EMAIL_EN_ATTENTE
              ? <span style={{ fontSize: 14 }}>Nouvelle adresse email en cours.<br />Contact via la mairie d'Herbeys.</span>
              : <a href={`mailto:${EMAIL}`} style={{ color: "#F0B069", fontSize: 14 }}>{EMAIL}</a>}
            <p style={{ fontSize: 13, lineHeight: 1.7, marginTop: 14 }}>
              Écoles et organisateurs : contactez-nous pour connaître les sorties en forêt.
            </p>
            <p style={{ fontSize: 11, lineHeight: 1.7, marginTop: 12, fontFamily: "'IBM Plex Mono', monospace", color: "#9AA694" }}>
              RNA W381011410 · SIRET 779 560 978 00016
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", padding: "14px 24px", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
          © {new Date().getFullYear()} ACCA d'Herbeys · Association Communale de Chasse Agréée
        </div>
      </footer>
    </div>
  );
}
