// Gestion des documents : fichiers dans Firebase Storage, métadonnées dans Firestore.
// Chaque document = un fichier dans Storage (documents/...) + une entrée dans la
// collection Firestore "documents" (nom, catégorie, url, date, chemin de stockage).
import {
  collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import {
  ref, uploadBytes, getDownloadURL, deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";

const COL = collection(db, "documents");

// Liste tous les documents, triés par date (plus récent d'abord).
export async function listerDocuments() {
  try {
    const q = query(COL, orderBy("date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("Erreur liste documents :", e);
    return [];
  }
}

// Envoie un fichier dans Storage puis enregistre ses métadonnées dans Firestore.
// categorie : "adherent" (visible adhérents+) ou "bureau" (visible bureau/admin).
export async function ajouterDocument(fichier, nom, categorie) {
  const chemin = `documents/${categorie}/${Date.now()}-${fichier.name}`;
  const r = ref(storage, chemin);
  await uploadBytes(r, fichier);
  const url = await getDownloadURL(r);
  const docRef = await addDoc(COL, {
    nom: nom || fichier.name,
    categorie,
    url,
    chemin,
    taille: fichier.size,
    type: (fichier.name.split(".").pop() || "").toUpperCase(),
    date: serverTimestamp(),
  });
  return { id: docRef.id, nom: nom || fichier.name, categorie, url, chemin };
}

// Supprime un document : le fichier dans Storage et l'entrée Firestore.
export async function supprimerDocument(document) {
  try {
    if (document.chemin) await deleteObject(ref(storage, document.chemin));
  } catch (e) {
    // si le fichier n'existe plus dans Storage, on continue quand même
    console.warn("Fichier Storage déjà absent :", e);
  }
  await deleteDoc(doc(db, "documents", document.id));
}
