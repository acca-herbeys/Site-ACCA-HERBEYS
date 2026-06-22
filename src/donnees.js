// Couche de données : lecture / écriture du contenu du site dans Firestore.
// Tout le contenu éditable est regroupé dans un seul document "site/contenu",
// ce qui simplifie le chargement (une seule lecture) et la sauvegarde.
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const REF = doc(db, "site", "contenu");

// Charge le contenu depuis Firestore. Renvoie null si le document n'existe pas encore.
export async function chargerContenu() {
  try {
    const snap = await getDoc(REF);
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.error("Erreur de chargement du contenu :", e);
    return null;
  }
}

// Sauvegarde (écrase) le contenu dans Firestore.
export async function sauverContenu(contenu) {
  try {
    await setDoc(REF, contenu);
    return true;
  } catch (e) {
    console.error("Erreur de sauvegarde du contenu :", e);
    return false;
  }
}
