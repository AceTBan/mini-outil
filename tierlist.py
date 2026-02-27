class TierList:
    def __init__(self, niveaux=None):
        """
        Initialise la tier list avec des niveaux prédéfinis.
        Par défaut : S, A, B, C, D.
        """
        if niveaux is None:
            niveaux = ["S", "A", "B", "C", "D"]
        self.tiers = {niveau: [] for niveau in niveaux}

    def ajouter(self, niveau, element):
        """
        Ajoute un élément dans un niveau donné.
        """
        if niveau in self.tiers:
            self.tiers[niveau].append(element)
        else:
            print(f"Niveau inconnu : {niveau}")

    def retirer(self, niveau, element):
        """
        Retire un élément d'un niveau donné.
        """
        if niveau in self.tiers and element in self.tiers[niveau]:
            self.tiers[niveau].remove(element)
        else:
            print("Impossible de retirer cet élément.")

    def afficher(self):
        """
        Affiche la tier list dans la console.
        """
        print("\n--- TIER LIST ---")
        for niveau, elements in self.tiers.items():
            print(f"{niveau}: {elements}")
        print("-----------------\n")

    def niveaux_disponibles(self):
        """
        Retourne la liste des niveaux existants.
        """
        return list(self.tiers.keys())

    def modifier_niveau(self, ancien, nouveau):
        """
        Renomme un niveau existant.
        Conserve les éléments associés.
        """
        if ancien not in self.tiers:
            print("Niveau introuvable.")
            return

        if nouveau in self.tiers:
            print("Ce nom existe déjà.")
            return

        # On déplace les éléments vers le nouveau nom
        self.tiers[nouveau] = self.tiers.pop(ancien)
        print(f"Niveau '{ancien}' renommé en '{nouveau}'.")

    def sauvegarder(self, nom_fichier="tierlist_carte.txt"):
        """
        Sauvegarde la tier list dans un fichier texte formaté.
        """
        with open(nom_fichier, "w", encoding="utf-8") as f:
            f.write("=== TIER LIST ===\n\n")

            for niveau, elements in self.tiers.items():
                f.write(f"{niveau} :\n")
                if elements:
                    for elem in elements:
                        f.write(f"  - {elem}\n")
                else:
                    f.write("  (vide)\n")
                f.write("\n")

            f.write("==================\n")

        print(f"Tier list enregistrée dans : {nom_fichier}\n")


# ---------------------------------------------------------
# MENU INTERACTIF
# ---------------------------------------------------------

def menu():
    """
    Menu interactif permettant de gérer la tier list.
    """
    tl = TierList()

    while True:
        print("=== TIER LIST MAKER ===")
        print("1. Afficher la tier list")
        print("2. Ajouter un élément")
        print("3. Retirer un élément")
        print("4. Modifier un niveau")
        print("5. Voir les niveaux disponibles")
        print("6. Sauvegarder la tier list")
        print("7. Quitter")

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
            ancien = input("Nom du niveau à modifier : ")
            nouveau = input("Nouveau nom : ")
            tl.modifier_niveau(ancien, nouveau)

        elif choix == "5":
            print("Niveaux :", tl.niveaux_disponibles(), "\n")

        elif choix == "6":
            confirmation = input("Enregistrer la tier list ? (o/n) : ").lower()
            if confirmation == "o":
                nom = input("Nom du fichier (laisser vide pour défaut) : ")
                if nom.strip() == "":
                    tl.sauvegarder()
                else:
                    tl.sauvegarder(nom)
            else:
                print("Sauvegarde annulée.\n")

        elif choix == "7":
            print("Fermeture du programme.")
            break

        else:
            print("Choix invalide.\n")


# Lancement automatique du menu si le fichier est exécuté directement
if __name__ == "__main__":
    menu()