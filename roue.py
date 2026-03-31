import random
import time
import os

# Chaque option est stockée sous forme de dictionnaire :
# {"nom": "Option 1", "poids": 1}
options = [{"nom": "Option 1", "poids": 1}, {"nom": "Option 2", "poids": 1}]

historique = []


def animation():
    """
    Petite animation ASCII pour simuler la roue qui tourne.
    Purement visuel, ne change pas le résultat.
    """
    frames = ["|", "/", "-", "\\"]
    for _ in range(10):  # Nombre de rotations
        for frame in frames:
            print(f"\rLa roue tourne... {frame}", end="")
            time.sleep(0.08)
    print("\r" + " " * 30, end="\r")  # Efface la ligne


def tourner():
    """
    Tire une option en tenant compte des poids.
    Affiche une animation avant de révéler le résultat.
    """
    animation()  # On lance l'animation avant le tirage

    # Création d'une "pool" pondérée
    pool = []
    for opt in options:
        pool.extend([opt["nom"]] * opt["poids"])

    resultat = random.choice(pool)
    historique.append(resultat)
    return resultat


def afficher_options():
    """
    Affiche les options avec leurs poids.
    """
    print("\n--- OPTIONS ---")
    for i, opt in enumerate(options, start=1):
        print(f"{i}. {opt['nom']} (poids : {opt['poids']})")
    print("----------------\n")


def ajouter_option(nom, poids=1):
    """
    Ajoute une option avec un poids (par défaut 1).
    """
    options.append({"nom": nom, "poids": poids})
    print(f"Option ajoutée : {nom} (poids : {poids})")


def modifier_poids(nom, nouveau_poids):
    """
    Modifie le poids d'une option existante.
    """
    for opt in options:
        if opt["nom"] == nom:
            opt["poids"] = nouveau_poids
            print(f"Poids modifié : {nom} → {nouveau_poids}")
            return
    print("Option introuvable.")


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


def reset_historique():
    """
    Réinitialise complètement l'historique des tirages.
    """
    historique.clear()
    print("Historique réinitialisé.")

def supprimer_option(nom):
    """
    Supprime une option existante si elle est trouvée.
    """
    for opt in options:
        if opt["nom"] == nom:
            options.remove(opt)
            print(f"Option supprimée : {nom}")
            return
    print("Option introuvable.")
def reset_options():
    """
    Réinitialise complètement la liste des options.
    """
    options.clear()
    print("Toutes les options ont été supprimées.")

def menu():
    """
    Menu interactif pour utiliser la roue.
    """
    while True:
        print("=== ROUE ALEATOIRE ===")
        print("1. Tourner la roue")
        print("2. Afficher les options")
        print("3. Ajouter une option")
        print("4. Modifier le poids d'une option")
        print("5. Voir l'historique")
        print("6. Réinitialiser l'historique")
        print("7. Supprimer une option")
        print("8. Réinitialiser les options")
        print("9. Quitter")


        choix = input("Choix : ")

        if choix == "1":
            print(f"\nRésultat : {tourner()}\n")

        elif choix == "2":
            afficher_options()

        elif choix == "3":
            nom = input("Nom de l'option : ")
            try:
                poids = int(input("Poids (nombre entier) : "))
            except ValueError:
                poids = 1
            ajouter_option(nom, poids)

        elif choix == "4":
            nom = input("Option à modifier : ")
            try:
                nouveau = int(input("Nouveau poids : "))
            except ValueError:
                print("Poids invalide.")
                continue
            modifier_poids(nom, nouveau)

        elif choix == "5":
            afficher_historique()

        elif choix == "6":
            reset_historique()

        elif choix == "7":
            nom = input("Option à supprimer : ")
            supprimer_option(nom)

        elif choix == "8":
            reset_options()

        elif choix == "9":
            print("Fermeture du programme.")
            break

        else:
            print("Choix invalide.\n")


if __name__ == "__main__":
    menu()
