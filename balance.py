# Listes contenant les arguments POUR et CONTRE
pour = []
contre = []


def afficher_balance():
    """
    Affiche simplement les listes POUR et CONTRE.
    """
    print("\n--- BALANCE ---")
    print("POUR :", pour)
    print("CONTRE :", contre)
    print("----------------\n")


def supprimer_argument():
    """
    Supprime un argument présent dans l'une des deux listes.
    """
    afficher_balance()
    cible = input("Argument à supprimer : ")

    if cible in pour:
        pour.remove(cible)
        print("Supprimé de POUR.\n")
        return

    if cible in contre:
        contre.remove(cible)
        print("Supprimé de CONTRE.\n")
        return

    print("Argument introuvable.\n")


def deplacer_argument():
    """
    Déplace un argument de POUR vers CONTRE ou inversement.
    """
    afficher_balance()
    cible = input("Argument à déplacer : ")

    if cible in pour:
        pour.remove(cible)
        contre.append(cible)
        print("Déplacé de POUR vers CONTRE.\n")
        return

    if cible in contre:
        contre.remove(cible)
        pour.append(cible)
        print("Déplacé de CONTRE vers POUR.\n")
        return

    print("Argument introuvable.\n")


# ---------------------------------------------------------
# Programme principal (s'exécute quand on double-clique)
# ---------------------------------------------------------

if __name__ == "__main__":

    while True:
        # On demande un argument
        argument = input(
            "Écris ton argument (ou 'show' pour afficher, 'del' pour supprimer, 'move' pour déplacer, 'quit' pour fermer) : "
        )

        # Option pour quitter
        if argument.lower() == "quit":
            break

        # Option pour afficher la balance sans ajouter
        if argument.lower() == "show":
            afficher_balance()
            continue

        # Option pour supprimer un argument
        if argument.lower() == "del":
            supprimer_argument()
            continue

        # Option pour déplacer un argument
        if argument.lower() == "move":
            deplacer_argument()
            continue

        # On demande où le mettre
        choix = input("Le mettre dans POUR ou CONTRE ? (p/c) : ").lower()

        if choix == "p":
            pour.append(argument)
            print("Ajouté dans POUR.\n")

        elif choix == "c":
            contre.append(argument)
            print("Ajouté dans CONTRE.\n")

        else:
            print("Choix invalide, rien ajouté.\n")

        # On affiche la balance après chaque ajout
        afficher_balance()

    # Empêche la fenêtre de se fermer immédiatement
    input("Appuie sur Entrée pour fermer...")