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


# ---------------------------------------------------------
# Programme principal (s'exécute quand on double-clique)
# ---------------------------------------------------------

if __name__ == "__main__":
    # On demande un argument à l'utilisateur
    argument = input("Écris ton argument : ")

    # On demande où le placer
    choix = input("Le mettre dans POUR ou CONTRE ? (p/c) : ").lower()

    if choix == "p":
        pour.append(argument)
        print("\nAjouté dans POUR.")
    elif choix == "c":
        contre.append(argument)
        print("\nAjouté dans CONTRE.")
    else:
        print("\nChoix invalide, rien n'a été ajouté.")

    # On affiche le résultat
    afficher_balance()

    # Empêche la fenêtre de se fermer immédiatement
    input("Appuie sur Entrée pour fermer...")
    