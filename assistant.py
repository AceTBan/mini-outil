import sys
from datetime import datetime
import os

# Couleurs
GREEN = "\033[92m"
BLUE = "\033[94m"
RESET = "\033[0m"

def afficher_aide():
    print(f"{GREEN}--- Mon Assistant Personnel ---{RESET}")
    print("Commandes disponibles :")
    for cmd in COMMANDES.keys():
        print(f"- {cmd}")

def afficher_date():
    print(f"{GREEN}Nous sommes le {datetime.now().strftime('%d/%m/%Y %H:%M')}{RESET}")

def sauvegarder_note():
    note = input("Entrez votre note : ")
    with open("notes.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] {note}\n")
    print(" Note sauvegardée.")

def calculatrice():
    print(f"{BLUE}--- Mode Calculatrice (tape 'menu' pour revenir) ---{RESET}")
    while True:
        expression = input("Calcul > ")
        if expression.lower() == "menu": break
        try:
            print(f" {GREEN}Résultat : {eval(expression)}{RESET}")
        except Exception as e:
            print(f"Erreur : Expression invalide ({e})")
def afficher_stats():
    if not os.path.exists("notes.txt"):
        print("Aucune note enregistrée pour le moment.")
        return
    
    with open("notes.txt", "r", encoding="utf-8") as f:
        lignes = f.readlines()
        print(f"Vous avez enregistré {len(lignes)} notes au total.")

def chercher_fichier():
    extension = input("Quelle extension cherchez-vous ? (ex: .py, .txt) : ")
    fichiers = [f for f in os.listdir('.') if f.endswith(extension)]
    if fichiers:
        print(f"Fichiers {extension} trouvés :")
        for f in fichiers:
            print(f" - {f}")
    else:
        print(f"Aucun fichier {extension} ici.")        

COMMANDES = {
    "aide": afficher_aide,
    "date": afficher_date,
    "note": sauvegarder_note,
    "calc": calculatrice,
    "stats": afficher_stats,
    "find": chercher_fichier,
    "quit": sys.exit
}

def main():
    print(f"{GREEN}Assistant prêt. Tapez 'aide' pour commencer.{RESET}")
    while True:
        choix = input(f"{BLUE} > {RESET}").lower().strip()
        
        if choix in COMMANDES:
            COMMANDES[choix]()
        else:
            print("Commande inconnue. Tapez 'aide'.")

if __name__ == "__main__":
    main()