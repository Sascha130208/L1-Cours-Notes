# Algorithmique 1 — Chapitre 1 : Introduction et variables

> ℹ️ Ta prise de notes s'arrêtait en plein milieu de la définition et de la règle de nommage des variables. J'ai complété la suite logique du cours ci-dessous — si ton prof a donné une syntaxe de pseudo-code différente (il en existe plusieurs styles), dis-le-moi et j'adapte.

## Qu'est-ce qu'un algorithme ?

Un **algorithme** est une **procédure de calcul bien définie** qui prend en entrée un ensemble de valeurs (les **données**) et qui produit en sortie un ensemble de valeurs (les **résultats**).

Autrement dit : c'est une **suite finie et non ambiguë d'instructions/étapes** qui permet de résoudre un problème ou d'effectuer une tâche.

**Exemple simple de la vie courante** : une recette de cuisine est un algorithme — elle prend des ingrédients en entrée, suit des étapes précises dans un ordre donné, et produit un plat en sortie.

**Exemple en info** : un algorithme qui calcule la moyenne de 3 notes :
1. Entrée : trois notes `n1`, `n2`, `n3`
2. Calcul : `moyenne ← (n1 + n2 + n3) / 3`
3. Sortie : afficher `moyenne`

### Propriétés qu'un bon algorithme doit avoir

| Propriété | Signifie |
|---|---|
| **Fini** | Il doit se terminer après un nombre fini d'étapes (pas de boucle infinie) |
| **Défini / non ambigu** | Chaque étape doit être décrite précisément, sans place à interprétation |
| **Correct** | Il doit produire le bon résultat pour toutes les entrées valides |
| **Réalisable** | Chaque étape doit pouvoir être effectivement exécutée |

## Les variables

Une **variable** est un espace réservé en mémoire qui contient une valeur, et qui possède un **nom** (aussi appelé **identificateur**).

Une variable a toujours (au moins) trois caractéristiques :
- un **nom** (identificateur)
- un **type** (quelle sorte de donnée elle contient — voir plus bas)
- une **valeur** (ce qu'elle contient à un instant donné — la valeur peut changer, contrairement au nom et au type)

### Règles de nommage d'une variable (identificateur)

D'après tes notes, un nom de variable :

1. Est composé de **lettres**, de **chiffres**, et du caractère **`_`** (underscore) — pas d'autres symboles (pas d'accents, pas de `-`, `@`, `!`, etc.)
2. Doit **commencer par une lettre** (jamais par un chiffre)
3. Doit être **différent d'un mot-clé** du langage (par exemple on ne peut pas nommer une variable `si`, `pour`, `tant que`, `fonction`... car ce sont des mots réservés du pseudo-code/langage)
4. **Pas d'espace** dans le nom (on utilise `_` à la place, ex: `note_finale` plutôt que `note finale`)

#### Exemples

| Nom | Valide ? | Pourquoi |
|---|---|---|
| `age` | ✅ | lettres uniquement |
| `note_finale` | ✅ | lettres + underscore |
| `x1` | ✅ | commence par une lettre |
| `2ageFois` | ❌ | commence par un chiffre |
| `note finale` | ❌ | contient un espace |
| `si` | ❌ | mot-clé réservé |
| `nom-eleve` | ❌ | le tiret `-` n'est pas autorisé |

> **Bonne pratique (au-delà de la règle stricte)** : donne des noms de variables **explicites**. `age` est bien meilleur que `x` ou `a`, car ça rend l'algorithme lisible sans avoir besoin de commentaire.

## Les types de variables (types de base)

Une variable contient toujours une donnée d'un **type** particulier. Les types de base qu'on retrouve dans (presque) tous les cours d'algorithmique :

| Type | Description | Exemples de valeurs |
|---|---|---|
| **Entier** (integer / int) | Nombre sans virgule | `3`, `-12`, `0`, `2026` |
| **Réel** (float / real) | Nombre à virgule | `3.14`, `-0.5`, `2.0` |
| **Caractère** (char) | Un seul symbole | `'a'`, `'Z'`, `'7'` |
| **Chaîne de caractères** (string) | Une suite de caractères (texte) | `"Bonjour"`, `"L1 info"` |
| **Booléen** (boolean) | Vrai ou faux uniquement | `Vrai` / `Faux` (ou `True` / `False`) |

## Déclarer une variable

Avant d'utiliser une variable, il faut généralement la **déclarer** : indiquer son nom et son type. En pseudo-code, ça s'écrit souvent comme ceci (la syntaxe varie selon les cours) :

```
Variable age : Entier
Variable prenom : Chaîne
Variable moyenne : Réel
Variable aReussi : Booléen
```

## L'affectation

**Affecter** une valeur à une variable, c'est lui donner (ou changer) son contenu. On utilise en général le symbole `←` (ou `:=` selon les conventions) — **à ne pas confondre avec le signe `=` mathématique**, qui exprime une égalité et non une action.

```
age ← 18
prenom ← "Alice"
moyenne ← 14.5
aReussi ← Vrai
```

> ⚠️ **Piège fréquent** : en algorithmique, `x ← x + 1` ne veut PAS dire "x égale x+1" (ce qui serait mathématiquement impossible). Ça veut dire : "**calcule** la valeur actuelle de x, ajoute 1, et **remplace** le contenu de x par ce résultat". C'est une **action**, pas une équation.

## Entrées / Sorties

Un algorithme communique avec l'extérieur (l'utilisateur, un capteur, etc.) grâce à deux opérations de base :

| Opération | Rôle | Exemple de pseudo-code |
|---|---|---|
| **Lire** (entrée) | Récupérer une valeur donnée par l'utilisateur | `Lire(age)` |
| **Écrire** (sortie) | Afficher un résultat | `Écrire(moyenne)` ou `Écrire("Bonjour ", prenom)` |

## Structure générale d'un algorithme en pseudo-code

```
Algorithme NomDeLAlgorithme
Variables
    n1, n2, n3 : Réel
    moyenne : Réel
Début
    Écrire("Entrez trois notes :")
    Lire(n1)
    Lire(n2)
    Lire(n3)
    moyenne ← (n1 + n2 + n3) / 3
    Écrire("La moyenne est : ", moyenne)
Fin
```

### Les 3 parties toujours présentes
1. **En-tête** : le nom de l'algorithme
2. **Déclaration des variables** : quelles variables seront utilisées, et de quel type
3. **Corps** (`Début ... Fin`) : la suite d'instructions qui constitue l'algorithme

## Ce qu'on verra probablement dans les chapitres suivants

Pour te repérer dans la suite du cours (probablement les prochains chapitres) :
- Les **opérateurs** : arithmétiques (`+ - * / %`), de comparaison (`< > = ≠ ≤ ≥`), logiques (`ET`, `OU`, `NON`)
- Les **structures conditionnelles** : `Si ... Alors ... Sinon`
- Les **boucles** : `Tant que`, `Pour`, `Répéter ... Jusqu'à`
- Les **tableaux** (structures pour stocker plusieurs valeurs sous un même nom)
- Les **fonctions/procédures** (découper un algorithme en sous-parties réutilisables)

## Tableau récapitulatif

| Notion | Résumé |
|---|---|
| Algorithme | Suite finie et précise d'étapes qui transforme une entrée en sortie |
| Variable | Espace mémoire nommé qui stocke une valeur d'un type donné |
| Identificateur | Nom d'une variable : lettres/chiffres/`_`, commence par une lettre, pas de mot-clé, pas d'espace |
| Type | Entier, Réel, Caractère, Chaîne, Booléen |
| Affectation (`←`) | Action qui donne/change la valeur d'une variable |
| Lire / Écrire | Entrée / Sortie de l'algorithme |
