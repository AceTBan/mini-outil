tiers = {
    "S": [],
    "A": [],
    "B": [],
    "C": [],
    "D": []
}

def afficher_tierlist():
    for tier, items in tiers.items():
        print(f"{tier}: {items}")