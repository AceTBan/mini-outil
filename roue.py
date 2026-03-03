import random

# Liste des options disponibles dans la roue
options = [
    "Option 1",
    "Option 2"
]

# Historique des résultats tirés par la roue
historique = []


def tourner():
    """
    Tire une option aléatoire dans la liste.
    Le résultat est ajouté à l'historique.
    """
    resultat = random.choice(options)
    historique.append(resultat) # On garde une trace du tirage
    return resultat


def afficher_options():
    """
    Affiche toutes les options disponibles dans la roue.
    """
    print("\n--- OPTIONS ---")
    for i, opt in enumerate(options, start=1):
        print(f"{i}. {opt}")
    print("----------------\n")


def ajouter_option(option):
    """
    Ajoute une nouvelle option à la roue.
    """
    options.append(option)
    print(f"Option ajoutée : {option}")


def supprimer_option(option):
    """
    Supprime une option de la roue si elle existe.
    """
    if option in options:
        options.remove(option)
        print(f"Option supprimée : {option}")
    else:
        print("Cette option n'existe pas.")


def afficher_historique():
    """
    Affiche l'historique des tirages.
    """
    print("\n--- HISTORIQUE DES TIRAGES ---")
    if historique:
        for i, tirage in enumerate(historique, start=1):
            print(f"{i}. {tirage}")
    else:
        print("Aucun tirage pour le moment.")
    print("--------------------------------\n")


# ---------------------------------------------------------
# MENU INTERACTIF
# ---------------------------------------------------------

def menu():
    """
    Menu interactif permettant d'utiliser la roue.
    """
    while True:
        print("=== ROUE ALEATOIRE ===")
        print("1. Tourner la roue")
        print("2. Afficher les options")
        print("3. Ajouter une option")
        print("4. Supprimer une option")
        print("5. Voir l'historique des tirages")
        print("6. Quitter")

        choix = input("Choix : ")

        if choix == "1":
            resultat = tourner()
            print(f"\nRésultat : {resultat}\n")

        elif choix == "2":
            afficher_options()

        elif choix == "3":
            nouvelle = input("Nouvelle option : ")
            ajouter_option(nouvelle)

        elif choix == "4":
            afficher_options()
            cible = input("Option à supprimer : ")
            supprimer_option(cible)

        elif choix == "5":
            afficher_historique()

        elif choix == "6":
            print("Fermeture du programme.")
            break

        else:
            print("Choix invalide.\n")


# Lancement automatique si double-clic
if __name__ == "__main__":
    menu()