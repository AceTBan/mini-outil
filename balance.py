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

    while True:
        # On demande un argument
        argument = input("Écris ton argument (ou tape 'quit' pour fermer) : ")

        # Option pour quitter
        if argument.lower() == "quit":
            break

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