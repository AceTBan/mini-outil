class TierList:
    def __init__(self, niveaux=None):
        if niveaux is None:
            niveaux = ["S", "A", "B", "C", "D"]
        self.tiers = {niveau: [] for niveau in niveaux}

    def ajouter(self, niveau, element):
        """Ajoute un élément dans un niveau donné."""
        if niveau in self.tiers:
            self.tiers[niveau].append(element)
        else:
            raise ValueError(f"Niveau inconnu : {niveau}")

    def retirer(self, niveau, element):
        """Retire un élément d'un niveau donné."""
        if niveau in self.tiers and element in self.tiers[niveau]:
            self.tiers[niveau].remove(element)

    def afficher(self):
        """Affiche la tier list."""
        for niveau, elements in self.tiers.items():
            print(f"{niveau}: {elements}")

    def niveaux_disponibles(self):
        """Retourne la liste des niveaux existants."""
        return list(self.tiers.keys())