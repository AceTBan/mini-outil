# Listes contenant les arguments POUR et CONTRE
pour = []
contre = []


def afficher_balance():
    """
    Affiche simplement les listes POUR et CONTRE.
    """
    print("POUR :", pour)
    print("CONTRE :", contre)


# ---------------------------------------------------------
# Petit bloc pour exécuter quelque chose quand on double-clique
# ---------------------------------------------------------

if __name__ == "__main__":
    # On affiche la balance au lancement
    afficher_balance()

    # On empêche la fenêtre de se fermer immédiatement
    input("\nAppuie sur Entrée pour fermer...")