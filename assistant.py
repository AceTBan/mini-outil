import sys
from datetime import datetime

def afficher_aide():
    print("--- Mon Assistant Personnel ---")
    print("Commandes disponibles :")
    print("- aide : Affiche ce message")
    print("- date : Affiche l'heure actuelle")
    print("- quit : Quitter")

def main():
    while True:
        commande = input("\nQue puis-je faire pour vous ? > ").lower()
        
        if commande == "aide":
            afficher_aide()
        elif commande == "date":
            print(f"Nous sommes le {datetime.now().strftime('%d/%m/%Y %H:%M')}")
        elif commande == "quit":
            break
        else:
            print("Commande inconnue. Tapez 'aide'.")

if __name__ == "__main__":
    main()