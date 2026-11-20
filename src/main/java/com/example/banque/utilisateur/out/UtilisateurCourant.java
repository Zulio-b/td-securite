package com.example.banque.utilisateur.out;

import com.example.banque.utilisateur.Utilisateur;
import java.util.Optional;

/** Qui fait la requête en cours. Vide si personne n'est connecté. */
public interface UtilisateurCourant {
    Optional<Utilisateur> get();
}
