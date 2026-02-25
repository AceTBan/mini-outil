class TierList:
    def __init__(self, niveaux=None):
        # Définition des niveaux par défaut si rien n'est fourni
        if niveaux is None:
            niveaux = ["S", "A", "B", "C", "D"]
        self.tiers = {niveau: [] for niveau in niveaux}

    def ajouter(self, niveau, element):
        """Ajoute un élément dans un niveau donné."""
        if niveau in self.tiers:
            self.tiers[niveau].append(element)
        else:
            print(f"Niveau inconnu : {niveau}")

    def retirer(self, niveau, element):
        """Retire un élément d'un niveau donné."""
        if niveau in self.tiers and element in self.tiers[niveau]:
            self.tiers[niveau].remove(element)
        else:
            print("Impossible de retirer cet élément.")

    def afficher(self):
        """Affiche la tier list."""
        print("\n--- TIER LIST ---")
        for niveau, elements in self.tiers.items():
            print(f"{niveau}: {elements}")
        print("-----------------\n")

    def niveaux_disponibles(self):
        """Retourne la liste des niveaux existants."""
        return list(self.tiers.keys())


# ---------------------------------------------------------
# MENU INTERACTIF (s'exécute quand double-cliques)
# ---------------------------------------------------------

def menu():
    tl = TierList()

    while True:
        print("=== TIER LIST MAKER ===")
        print("1. Afficher la tier list")
        print("2. Ajouter un élément")
        print("3. Retirer un élément")
        print("4. Voir les niveaux disponibles")
        print("5. Quitter")

        choix = input("Choix : ")

        if choix == "1":
            tl.afficher()

        elif choix == "2":
            niveau = input("Niveau : ")
            element = input("Élément à ajouter : ")
            tl.ajouter(niveau, element)

        elif choix == "3":
            niveau = input("Niveau : ")
            element = input("Élément à retirer : ")
            tl.retirer(niveau, element)

        elif choix == "4":
            print("Niveaux :", tl.niveaux_disponibles())

        elif choix == "5":
            print("Fermeture du programme.")
            break

        else:
            print("Choix invalide.\n")


# Lance automatiquement le menu si on double-clique sur le fichier
if __name__ == "__main__":
    menu()