# Représentation de l'information — Bases et systèmes de numération

## Système de numération

Un système de numération est composé de :
- un nombre **B** appelé la **base** ;
- un ensemble ordonné **C = {a, b, c, d, ...}** de cardinal **B**, les **chiffres** disponibles.

L'écriture d'un nombre `X = (x_(n-1) x_(n-2) ... x_1 x_0)_B` s'interprète en calculant :

```
X = x_(n-1)×B^(n-1) + x_(n-2)×B^(n-2) + ... + x_1×B^1 + x_0×B^0
```

- `x_(n-1)` (chiffre le plus à gauche) : **chiffre de poids fort**.
- `x_0` (chiffre le plus à droite) : **chiffre de poids faible**.

> **À retenir** : c'est ce que tu fais déjà en base 10 sans y penser : `235 = 2×10² + 3×10¹ + 5×10⁰`. On généralise juste `10` à n'importe quelle base `B`.

## Table de correspondance (bases usuelles en informatique)

| Base 10 | Base 2 | Base 8 | Base 16 |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 |
| 2 | 10 | 2 | 2 |
| 3 | 11 | 3 | 3 |
| 4 | 100 | 4 | 4 |
| 5 | 101 | 5 | 5 |
| 6 | 110 | 6 | 6 |
| 7 | 111 | 7 | 7 |
| 8 | 1000 | 10 | 8 |
| 9 | 1001 | 11 | 9 |
| 10 | 1010 | 12 | A |
| 11 | 1011 | 13 | B |
| 12 | 1100 | 14 | C |
| 13 | 1101 | 15 | D |
| 14 | 1110 | 16 | E |
| 15 | 1111 | 17 | F |

Base 2 (binaire), 8 (octal), 10 (décimal), 16 (hexadécimal — chiffres 0-9 puis A-F pour 10-15).

## Convertir un nombre d'une base vers une autre

### 1. Calcul direct de l'expression

Si `X = (x_(n-1) ... x_1 x_0)_B`, on calcule directement la somme `x_(n-1)×B^(n-1) + ... + x_0×B^0`, dans la base d'arrivée (en général 10).

**Exemple** : `X = (11101011)₂` vers la base 10.
```
X = 1×2⁷ + 1×2⁶ + 1×2⁵ + 0×2⁴ + 1×2³ + 0×2² + 1×2¹ + 1×2⁰
  = 128 + 64 + 32 + 0 + 8 + 0 + 2 + 1 = 235
```
`(11101011)₂ = (235)₁₀`.

### 2. Divisions entières successives

Pour convertir `X` (base `B`) vers une base `B'` : diviser `X` par `B'` de façon répétée jusqu'à quotient nul, noter les restes `R₀, R₁, ..., R_(n'-1)`, puis lire les restes **du dernier au premier**.

**Exemple** : `X = (235)₁₀` vers la base 2.
```
235 = 2×117 + 1   → R₀ = 1
117 = 2×58  + 1   → R₁ = 1
 58 = 2×29  + 0   → R₂ = 0
 29 = 2×14  + 1   → R₃ = 1
 14 = 2×7   + 0   → R₄ = 0
  7 = 2×3   + 1   → R₅ = 1
  3 = 2×1   + 1   → R₆ = 1
  1 = 2×0   + 1   → R₇ = 1
```
Restes lus du bas vers le haut : `(235)₁₀ = (11101011)₂`.

### 3. Méthode des puissances de 2 (cas particulier base 10 → base 2)

1. Précalculer une table des puissances de 2.
2. Chercher la plus grande puissance `2^i ≤ X`, mémoriser `i`, poser `X ← X − 2^i`.
3. Recommencer tant que le résultat n'est pas nul. Chaque puissance trouvée = un bit à 1.

**Exemple** : `X = (235)₁₀`.
```
235 − 128 (2⁷) = 107   → bit 7
107 − 64  (2⁶) = 43    → bit 6
 43 − 32  (2⁵) = 11    → bit 5
 11 − 8   (2³) = 3     → bit 3 (bit 4 sauté)
  3 − 2   (2¹) = 1     → bit 1 (bit 2 sauté)
  1 − 1   (2⁰) = 0     → bit 0
```
Bits à 1 : 7, 6, 5, 3, 1, 0 → `(235)₁₀ = (11101011)₂`.

### 4. Cas particulier B = B'ⁿ (ou Bⁿ = B') : groupement de chiffres

Quand une base est une puissance de l'autre, la conversion est un simple **groupement de chiffres**, sans calcul : c'est le principe utilisé entre hexadécimal (16 = 2⁴) et binaire — **1 chiffre hexadécimal = exactement 4 bits**.

**Exemple** : `X = (3A9B)₁₆` vers le binaire.
```
3 → 0011
A → 1010
9 → 1001
B → 1011
```
`(3A9B)₁₆ = (0011 1010 1001 1011)₂ = (11101010011011)₂`.

> **Quelle méthode choisir ?**
> - Base B → base 10 : méthode 1.
> - Base 10 → base B : méthode 2 (la plus générale, à apprendre en priorité).
> - Base 2 ↔ base 8/16 : méthode 4 (groupement, pas de calcul) — 3 bits ↔ 1 chiffre octal, 4 bits ↔ 1 chiffre hexadécimal.

## Mini-exercices

1. Convertir `(101101)₂` en base 10 (méthode 1).
2. Convertir `(45)₁₀` en base 2 par divisions successives, et vérifier que tu retombes sur le résultat précédent.
3. Convertir `(2F)₁₆` directement en binaire par groupement de chiffres.
4. Convertir `(45)₁₀` en base 16 par divisions successives.

<details>
<summary>Réponses</summary>

1. `1×2⁵+0×2⁴+1×2³+1×2²+0×2¹+1×2⁰ = 32+8+4+1 = 45` → `(101101)₂ = (45)₁₀`.
2. `45=2×22+1, 22=2×11+0, 11=2×5+1, 5=2×2+1, 2=2×1+0, 1=2×0+1` → `(45)₁₀ = (101101)₂`. ✅
3. `2→0010, F→1111` → `(2F)₁₆ = (101111)₂` (zéros de tête supprimés).
4. `45=16×2+13(=D), 2=16×0+2` → `(45)₁₀ = (2D)₁₆`.

</details>
