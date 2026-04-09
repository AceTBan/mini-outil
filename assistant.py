import sys
from datetime import datetime
GREEN = "\033[92m"
BLUE = "\033[94m"
RESET = "\033[0m"

def afficher_aide():
    print(f"{GREEN}--- Mon Assistant Personnel ---{RESET}")
    print("Commandes disponibles :")
    print("- aide : Affiche ce message")
    print("- date : Affiche l'heure actuelle")
    print("- note : Enregistrer une note texte") 
    print("- quit : Quitter")
def sauvegarder_note():
    note = input("Entrez votre note : ")
    with open("notes.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] {note}\n")
    print(" Note sauvegardée.")
def main():
    while True:
        commande = input(f"{BLUE}Que puis-je faire ? > {RESET}").lower()
        
        if commande == "aide":
            afficher_aide()
        elif commande == "date":
            print(f"{GREEN}Nous sommes le {datetime.now().strftime('%d/%m/%Y %H:%M')}")
        elif commande == "note":
            sauvegarder_note()
        elif commande == "calc":
            calculatrice()
        elif commande == "quit":
            break
        else:
            print("Commande inconnue. Tapez 'aide'.")

def calculatrice():
    print(f"{BLUE}--- Mode Calculatrice (tape 'menu' pour revenir) ---{RESET}")
    while True:
        expression = input("Calcul > ")
        if expression.lower() == "menu":
            break
        try:
            # eval() est pratique mais attention en vrai prod. 
            # Ici, pour un assistant CLI, c'est parfait.
            resultat = eval(expression)
            print(f" {GREEN}Résultat : {resultat}{RESET}")
        except Exception as e:
            print(f"❌ Erreur : Expression invalide ({e})")

if __name__ == "__main__":
    main()