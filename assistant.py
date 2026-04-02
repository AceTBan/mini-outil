import sys
from datetime import datetime

def afficher_aide():
    print("--- Mon Assistant Personnel ---")
    print("Commandes disponibles :")
    print("- aide : Affiche ce message")
    print("- date : Affiche l'heure actuelle")
    print("- quit : Quitter")
def sauvegarder_note():
    note = input("Entrez votre note : ")
    with open("notes.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] {note}\n")
    print("✅ Note sauvegardée.")
def main():
    while True:
        commande = input("\nQue puis-je faire pour vous ? > ").lower()
        
        if commande == "aide":
            afficher_aide()
        elif commande == "date":
            print(f"Nous sommes le {datetime.now().strftime('%d/%m/%Y %H:%M')}")
        elif commande == "note":
            sauvegarder_note()
        elif commande == "quit":
            break
        else:
            print("Commande inconnue. Tapez 'aide'.")

if __name__ == "__main__":
    main()