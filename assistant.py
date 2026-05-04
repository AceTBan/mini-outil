import random
import string
import sys
from datetime import datetime
import os
import urllib.request
import json
import time
import urllib.request
import platform
import urllib.request




# Codes couleur ANSI pour le terminal
GREEN = "\033[92m"
BLUE = "\033[94m"
RESET = "\033[0m"

def log_erreur(message):
    """Enregistre les erreurs système dans un fichier log local."""
    with open(".errors.log", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] ERROR: {message}\n")

def afficher_aide():
    """Affiche la liste des commandes disponibles dans l'application."""
    print(f"\n{GREEN}--- Assistant Personnel ---{RESET}")
    print("Liste des commandes :")
    for cmd in COMMANDES.keys():
        print(f"- {cmd}")

def afficher_date():
    """Affiche la date et l'heure système formatées."""
    print(f"{GREEN}Date actuelle : {datetime.now().strftime('%d/%m/%Y %H:%M')}{RESET}")

def sauvegarder_note():
    """Ajoute une entrée textuelle dans le fichier notes.txt."""
    note = input("Saisie de la note : ")
    with open("notes.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] {note}\n")
    print("Note enregistrée.")

def calculatrice():
    """Exécute des opérations mathématiques simples via l'entrée utilisateur."""
    print(f"{BLUE}--- Module Calculatrice (taper 'menu' pour quitter) ---{RESET}")
    while True:
        expression = input("Calcul > ")
        if expression.lower() == "menu": 
            break
        try:
            expression = expression.replace(',', '.')
            print(f" Résultat : {eval(expression)}")
        except Exception as e:
            print("Erreur : Expression invalide.")
            log_erreur(str(e))

def afficher_stats():
    """Calcule le nombre de lignes présentes dans le fichier de notes."""
    if not os.path.exists("notes.txt"):
        print("Fichier de notes inexistant.")
        return
    with open("notes.txt", "r", encoding="utf-8") as f:
        lignes = f.readlines()
        print(f"Total de notes enregistrées : {len(lignes)}")

def chercher_fichier():
    """Recherche les fichiers du répertoire courant par extension."""
    extension = input("Extension recherchée (ex: .py) : ")
    fichiers = [f for f in os.listdir('.') if f.endswith(extension)]
    if fichiers:
        print(f"Fichiers {extension} localisés :")
        for f in fichiers: 
            print(f" - {f}")
    else:
        print(f"Aucun fichier correspondant trouvé.")

def generer_password():
    """Génère une chaîne de caractères aléatoire de 12 symboles."""
    longueur = 12
    caracteres = string.ascii_letters + string.digits + string.punctuation
    password = "".join(random.choice(caracteres) for _ in range(longueur))
    print(f"Mot de passe généré : {password}")

def verifier_site():
    """Vérifie l'accessibilité d'une URL."""
    url = input("Entrez l'URL à tester (ex: https://google.com) : ")
    try:
        statut = urllib.request.urlopen(url).getcode()
        if statut == 200:
            print(f"Le site {url} est en ligne (Code 200).")
    except Exception as e:
        print(f"Impossible de joindre le site. Erreur : {e}")
        log_erreur(str(e))

def exporter_json():
    """Convertit les notes du fichier texte vers un format JSON structuré."""
    if not os.path.exists("notes.txt"):
        print("Aucune donnée à exporter.")
        return
    
    notes_list = []
    with open("notes.txt", "r", encoding="utf-8") as f:
        for ligne in f:
            notes_list.append({"contenu": ligne.strip()})
    
    with open("notes.json", "w", encoding="utf-8") as f_json:
        json.dump(notes_list, f_json, indent=4, ensure_ascii=False)
    print("Exportation vers notes.json terminée.")

def nettoyer_logs():
    """Supprime le fichier de logs d'erreurs s'il existe."""
    if os.path.exists(".errors.log"):
        os.remove(".errors.log")
        print("Fichier de logs supprimé.")
    else:
        print("Aucun fichier de logs à supprimer.")

def chronometre():
    """Mesure le temps écoulé entre deux pressions sur la touche Entrée."""
    input("Appuyez sur Entrée pour démarrer...")
    debut = time.time()
    input("Appuyez sur Entrée pour arrêter.")
    fin = time.time()
    duree = round(fin - debut, 2)
    print(f"Temps écoulé : {duree} secondes.")

def infos_systeme():
    """Affiche les paramètres techniques de la machine hôte."""
    print(f"Système : {platform.system()} {platform.release()}")
    print(f"Version : {platform.version()}")
    print(f"Architecture : {platform.machine()}")
    print(f"Répertoire courant : {os.getcwd()}")

def verifier_site():
    """Vérifie l'accessibilité d'une URL."""
    url = input("Entrez l'URL à tester (ex: https://google.com) : ")
    try:
        statut = urllib.request.urlopen(url).getcode()
        if statut == 200:
            print(f"Le site {url} est en ligne (Code 200).")
    except Exception as e:
        print(f"Impossible de joindre le site. Erreur : {e}")
        log_erreur(str(e))

def exporter_json():
    """Convertit les notes du fichier texte vers un format JSON structuré."""
    if not os.path.exists("notes.txt"):
        print("Aucune donnée à exporter.")
        return
    
    notes_list = []
    with open("notes.txt", "r", encoding="utf-8") as f:
        for ligne in f:
            notes_list.append({"contenu": ligne.strip()})
    
    with open("notes.json", "w", encoding="utf-8") as f_json:
        json.dump(notes_list, f_json, indent=4, ensure_ascii=False)
    print("Exportation vers notes.json terminée.")
    
def nettoyer_logs():
    """Supprime le fichier de logs d'erreurs s'il existe."""
    if os.path.exists(".errors.log"):
        os.remove(".errors.log")
        print("Fichier de logs supprimé.")
    else:
        print("Aucun fichier de logs à supprimer.")

def rechercher_note():
    """Parcourt le fichier de notes pour localiser un mot-clé spécifique."""
    if not os.path.exists("notes.txt"):
        print("Fichier de notes introuvable.")
        return
    mot_cle = input("Texte à rechercher : ").lower()
    trouve = False
    with open("notes.txt", "r", encoding="utf-8") as f:
        for ligne in f:
            if mot_cle in ligne.lower():
                print(f"Trouvé : {ligne.strip()}")
                trouve = True
    if not trouve:
        print("Aucune correspondance trouvée.")

# Structure de pilotage par dictionnaire
COMMANDES = {
    "aide": afficher_aide,
    "date": afficher_date,
    "note": sauvegarder_note,
    "calc": calculatrice,
    "stats": afficher_stats,
    "find": chercher_fichier,
    "pass": generer_password,
    "check": verifier_site,
    "clean": nettoyer_logs,
    "chrono": chronometre,
    "sys": infos_systeme,
    "check": verifier_site,
    "export": exporter_json,
    "clean": nettoyer_logs,
    "search": rechercher_note,
    "quit": sys.exit
}

def main():
    """Point d'entrée principal gérant les modes interactif et arguments CLI."""
    # Gestion des arguments de ligne de commande
    if len(sys.argv) > 1:
        choix = sys.argv[1].lower()
        if choix in COMMANDES:
            COMMANDES[choix]()
            return

    print(f"{GREEN}Assistant opérationnel. Taper 'aide' pour les options.{RESET}")
    while True:
        try:
            choix = input(f"{BLUE} > {RESET}").lower().strip()
            if not choix: 
                continue
            
            if choix in COMMANDES:
                COMMANDES[choix]()
            else:
                print("Commande non reconnue.")
        except (KeyboardInterrupt, EOFError):
            break

if __name__ == "__main__":
    main()