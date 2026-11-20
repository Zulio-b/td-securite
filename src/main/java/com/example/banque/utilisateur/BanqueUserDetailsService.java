package com.example.banque.utilisateur;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service 
public class BanqueUserDetailsService implements UserDetailsService {

    @Autowired 
    private UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Utilisateur utilisateur = utilisateurRepository.findByLogin(username)
                .orElseThrow(() 
                -> new UsernameNotFoundException("Utilisateur non trouvé avec le login: " + username));
        return User.withUsername(utilisateur.getLogin())
                .password(utilisateur.getMotDePasse())
                .roles(utilisateur.getRole().name())
                .build();
    }
}
