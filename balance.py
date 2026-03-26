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


def reset_balance():
    """
    Réinitialise complètement les listes POUR et CONTRE.
    """
    pour.clear()
    contre.clear()
    print("Balance réinitialisée.\n")


def resultat_balance():
    """
    Affiche un résultat simple selon le nombre d'arguments POUR et CONTRE.
    """
    nb_pour = len(pour)
    nb_contre = len(contre)

    print("\n--- RÉSULTAT ---")
    print("POUR :", nb_pour)
    print("CONTRE :", nb_contre)

    if nb_pour > nb_contre:
        print("Conclusion : la balance penche POUR.\n")
    elif nb_contre > nb_pour:
        print("Conclusion : la balance penche CONTRE.\n")
    else:
        print("Conclusion : équilibre.\n")


# ---------------------------------------------------------
# Programme principal (s'exécute quand on double-clique)
# ---------------------------------------------------------

if __name__ == "__main__":

    while True:
        # On demande un argument
        argument = input(
            "Écris ton argument (ou 'show', 'del', 'move', 'reset', 'result', 'quit') : "
        )

        # Option pour quitter
        if argument.lower() == "quit":
            break

        # Option pour afficher la balance
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

        # Option pour réinitialiser
        if argument.lower() == "reset":
            reset_balance()
            continue

        # Option pour afficher le résultat
        if argument.lower() == "result":
            resultat_balance()
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
