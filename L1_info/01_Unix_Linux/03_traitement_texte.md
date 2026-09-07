# Traitement de texte : cut, paste, sort, uniq

Ces commandes servent à manipuler des fichiers texte **structurés en colonnes** (comme un fichier CSV), sans ouvrir de tableur.

Fichier d'exemple utilisé partout ci-dessous, `etudiants.txt` :
```
Dupont:Alice:20
Martin:Bob:22
Nasser:Chloé:19
Bernard:David:21
```
(format `Nom:Prénom:Âge`, séparé par `:`)

## `cut` — extraire des colonnes

Permet d'extraire une ou plusieurs colonnes d'un fichier texte.

| Option | Signifie |
|---|---|
| `-d` | **délimiteur** — le caractère qui sépare les colonnes (ici `:`) |
| `-f` | **field** — numéro de la (ou des) colonne(s) à extraire |

```bash
$ cut -d ':' -f 1 etudiants.txt
Dupont
Martin
Nasser
Bernard
```
→ ici on extrait la colonne 1 (le nom), en précisant que le séparateur est `:`.

```bash
$ cut -d ':' -f 2,3 etudiants.txt
Alice:20
Bob:22
Chloé:19
David:21
```
→ on peut extraire plusieurs colonnes en séparant les numéros par une virgule.

## `paste` — recoller des colonnes

Fait l'inverse de `cut` dans l'esprit : elle **fusionne des lignes de plusieurs fichiers côte à côte**, colonne par colonne.

Si `noms.txt` contient :
```
Dupont
Martin
```
et `ages.txt` contient :
```
20
22
```
alors :
```bash
$ paste noms.txt ages.txt
Dupont  20
Martin  22
```
(par défaut, `paste` sépare avec une tabulation ; on peut changer avec `-d`)

## `sort` — trier

Trie les lignes d'un fichier.

```bash
$ sort etudiants.txt
Bernard:David:21
Dupont:Alice:20
Martin:Bob:22
Nasser:Chloé:19
```
→ Par défaut, tri **alphabétique** (ordre croissant).

| Option | Effet |
|---|---|
| `-r` | **r**everse — inverse l'ordre du tri (décroissant) |
| `-n` | tri **numérique** (indispensable pour trier des nombres correctement — sinon `"10"` est trié avant `"2"` car `sort` compare les caractères un par un !) |
| `-t` | délimiteur (comme `-d` pour `cut`) |
| `-k` | numéro de la colonne (**k**ey) sur laquelle trier |

### Trier par colonne précise
```bash
$ sort -t ':' -k 2 etudiants.txt
```
→ trie le fichier en se basant sur la colonne 2 (le prénom), avec `:` comme séparateur.

### Trier des nombres correctement
```bash
$ sort -n fichier_de_nombres.txt
```
Sans `-n`, `sort` trie « 10 » avant « 2 » (comparaison caractère par caractère, comme dans un dictionnaire). Avec `-n`, il comprend que ce sont des nombres et trie 2 avant 10.

### Combiner les options
```bash
$ sort -t ':' -k 3 -n etudiants.txt      # trie par âge (colonne 3), numériquement
$ sort -t ':' -k 2 -r etudiants.txt      # trie par prénom, ordre inversé
```

## `uniq` — éliminer les doublons

Supprime les lignes **consécutives** identiques. ⚠️ Attention : `uniq` ne fonctionne que sur des doublons **côte à côte** — il faut donc quasiment toujours trier avant avec `sort` !

```bash
$ cat villes.txt
Paris
Paris
Lyon
Paris
```

```bash
$ uniq villes.txt
Paris
Lyon
Paris
```
→ Le 3ème "Paris" n'est pas consécutif au 1er, donc il reste !

**La bonne pratique : toujours trier avant `uniq`** :
```bash
$ sort villes.txt | uniq
Lyon
Paris
```

| Option de `uniq` | Effet |
|---|---|
| `-c` | affiche le **nombre d'occurrences** de chaque ligne |

```bash
$ sort villes.txt | uniq -c
   1 Lyon
   2 Paris
```

## Le `|` — pipe (tube)

Le symbole `|` permet de **chaîner des commandes** : la sortie de la commande de gauche devient l'entrée de la commande de droite. C'est extrêmement puissant et très utilisé en Unix.

```bash
$ cut -d ':' -f 1 etudiants.txt | sort
```
→ extrait les noms, puis les trie.

```bash
$ cut -d ':' -f 1 etudiants.txt | sort | uniq -c
```
→ extrait les noms, les trie, puis compte les occurrences de chaque nom.

## Tableau récapitulatif

| Commande | Rôle |
|---|---|
| `cut -d X -f N` | Extraire la colonne N, séparée par X |
| `paste` | Fusionner des fichiers colonne par colonne |
| `sort` | Trier les lignes (alphabétique par défaut) |
| `sort -n` | Trier numériquement |
| `sort -r` | Inverser l'ordre |
| `sort -t X -k N` | Trier selon la colonne N (séparateur X) |
| `uniq` | Supprimer les doublons **consécutifs** |
| `uniq -c` | Compter les occurrences |
| `\|` | Chaîner deux commandes (pipe) |
