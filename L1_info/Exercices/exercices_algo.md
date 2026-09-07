# Exercices — Algorithmique (Chapitre 1 : variables)

## Niveau facile — noms de variables valides ?

Pour chaque nom, dis s'il est valide comme identificateur, et pourquoi si non.

| # | Nom proposé | Valide ? |
|---|---|---|
| 1 | `moyenne` | ? |
| 2 | `3eme_note` | ? |
| 3 | `nom_eleve` | ? |
| 4 | `pour` | ? |
| 5 | `age moyen` | ? |
| 6 | `Total2026` | ? |
| 7 | `_compteur` | ? |

<details><summary>Réponses</summary>

1. `moyenne` → ✅ valide
2. `3eme_note` → ❌ commence par un chiffre
3. `nom_eleve` → ✅ valide
4. `pour` → ❌ c'est un mot-clé réservé (boucle `Pour`)
5. `age moyen` → ❌ contient un espace
6. `Total2026` → ✅ valide (commence par une lettre, chiffres autorisés ensuite)
7. `_compteur` → ⚠️ dépend du cours : certains langages l'autorisent (underscore considéré comme une lettre), d'autres non. **Demande confirmation à ton prof** — en toute rigueur stricte "commence par une lettre" exclurait ce cas.

</details>

## Niveau facile — quel type utiliser ?

Pour chaque donnée, quel est le type de variable le plus adapté (Entier, Réel, Caractère, Chaîne, Booléen) ?

1. L'âge d'une personne
2. Le prix d'un article (ex: 4,99€)
3. La première lettre d'un prénom
4. Le nom complet d'une personne
5. Le fait qu'un élève ait réussi ou non son examen
6. Le nombre d'élèves dans une classe

<details><summary>Réponses</summary>

1. Entier
2. Réel
3. Caractère
4. Chaîne de caractères
5. Booléen
6. Entier

</details>

## Niveau intermédiaire — lire un algorithme

Que fait cet algorithme ? Donne le résultat affiché.

```
Algorithme Mystere
Variables
    a, b, temp : Entier
Début
    a ← 5
    b ← 8
    temp ← a
    a ← b
    b ← temp
    Écrire(a)
    Écrire(b)
Fin
```

<details><summary>Réponse</summary>

Cet algorithme **échange (permute)** les valeurs de `a` et `b` en utilisant une variable temporaire `temp`.

Affichage :
```
8
5
```

C'est un tout grand classique de l'algorithmique : sans variable temporaire, on ne peut pas échanger directement deux variables (`a ← b` puis `b ← a` ne marcherait pas, car on aurait déjà perdu la valeur originale de `a`).
</details>

## Niveau intermédiaire — écrire un algorithme

**Exercice** : Écris un algorithme qui demande à l'utilisateur son prénom et son âge, puis affiche : `"Bonjour <prénom>, tu as <âge> ans."`

<details><summary>Solution proposée</summary>

```
Algorithme Salutation
Variables
    prenom : Chaîne
    age : Entier
Début
    Écrire("Quel est ton prénom ?")
    Lire(prenom)
    Écrire("Quel est ton âge ?")
    Lire(age)
    Écrire("Bonjour ", prenom, ", tu as ", age, " ans.")
Fin
```
</details>

## Niveau avancé — trouver l'erreur

Ce pseudo-code contient plusieurs erreurs. Trouve-les toutes.

```
Algorithme Calcul
Variables
    2note : Entier
    Note Finale : Réel
Début
    2note = 15
    Note Finale ← 2note / 2
    Ecrire(Note Finale)
Fin
```

<details><summary>Réponse — 3 erreurs</summary>

1. `2note` commence par un chiffre → nom de variable invalide
2. `Note Finale` contient un espace → nom de variable invalide (il faudrait `Note_Finale` ou `noteFinale`)
3. `2note = 15` utilise `=` au lieu de `←` pour l'affectation (le `=` mathématique n'est pas une action d'affectation en pseudo-code)

Version corrigée :
```
Algorithme Calcul
Variables
    note2 : Entier
    noteFinale : Réel
Début
    note2 ← 15
    noteFinale ← note2 / 2
    Écrire(noteFinale)
Fin
```
</details>

## Défi — un peu plus loin (calcul de moyenne pondérée)

Écris un algorithme qui calcule la moyenne pondérée de deux notes : un contrôle (coefficient 1) et un examen (coefficient 2). Formule : `moyenne = (controle*1 + examen*2) / 3`.

<details><summary>Solution proposée</summary>

```
Algorithme MoyennePonderee
Variables
    controle, examen : Réel
    moyenne : Réel
Début
    Écrire("Note de contrôle :")
    Lire(controle)
    Écrire("Note d'examen :")
    Lire(examen)
    moyenne ← (controle * 1 + examen * 2) / 3
    Écrire("Moyenne pondérée : ", moyenne)
Fin
```

Ceci anticipe un peu sur les opérateurs arithmétiques (`+`, `*`, `/`), qui seront probablement vus juste après ce chapitre.
</details>
