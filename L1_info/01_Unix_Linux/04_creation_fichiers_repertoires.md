# Créer et modifier des fichiers et répertoires

## Déterminer le type d'un fichier : `file`

Un fichier n'a pas forcément une extension fiable (`.txt`, `.jpg`...). La commande `file` regarde le **contenu réel** du fichier pour deviner son type.

```bash
$ file notes.txt
notes.txt: ASCII text

$ file photo.jpg
photo.jpg: JPEG image data
```

## Créer des répertoires : `mkdir`

`mkdir` = **m**a**k**e **dir**ectory.

```bash
$ ls
cours  images

$ mkdir documents
$ ls
cours  documents  images
```

| Option | Effet |
|---|---|
| `-p` | Crée aussi les dossiers **parents** manquants (utile pour créer plusieurs niveaux d'un coup) |

```bash
$ mkdir -p projets/2026/info      # crée projets/, puis projets/2026/, puis projets/2026/info/ d'un coup
```

## Créer un fichier : 3 façons

### 1. `touch`
Crée un fichier **vide**, ou si le fichier existe déjà, met juste à jour sa date de dernière modification.

```bash
$ touch nouveau.txt
```

### 2. Une redirection depuis une commande
On peut créer (ou écraser) un fichier en y redirigeant la sortie d'une commande (voir section redirections ci-dessous).

```bash
$ echo "Bonjour" > salut.txt
```

### 3. Un éditeur de texte comme `nano`
Ouvre un éditeur dans le terminal pour écrire directement dedans (voir plus bas).

## Voir le contenu d'un fichier : `cat`

`cat` = con**cat**enate. Affiche tout le contenu d'un fichier d'un coup dans le terminal.

```bash
$ cat notes.txt
Ligne 1
Ligne 2
Ligne 3
```

On peut aussi concaténer (mettre bout à bout) plusieurs fichiers :
```bash
$ cat fichier1.txt fichier2.txt
```

## Les redirections : `>` et `>>`

Par défaut, une commande affiche son résultat à l'écran. On peut **rediriger** ce résultat vers un fichier au lieu de l'écran.

| Symbole | Effet |
|---|---|
| `>` | **Remplace** le contenu du fichier (ou le crée s'il n'existe pas) |
| `>>` | **Ajoute** à la fin du fichier (sans effacer ce qu'il y avait avant) |

```bash
$ echo "Première ligne" > fichier.txt      # fichier.txt contient maintenant : "Première ligne"
$ echo "Deuxième ligne" >> fichier.txt     # fichier.txt contient maintenant les deux lignes
$ echo "Nouveau contenu" > fichier.txt     # ⚠️ écrase tout : fichier.txt ne contient plus QUE "Nouveau contenu"
```

> ⚠️ **Piège classique** : confondre `>` et `>>`. Avec `>`, tout l'ancien contenu est **perdu**. Retiens : `>>` a "deux chevrons" comme pour dire "j'ajoute, j'ajoute" — un seul `>` = "je remplace tout".

## Modifier un fichier : `nano`

`nano` est un éditeur de texte simple utilisable directement dans le terminal (contrairement à `vim`, plus puissant mais plus difficile à prendre en main).

```bash
$ nano notes.txt
```

Raccourcis essentiels dans `nano` (affichés en bas de l'écran avec `^` = touche Ctrl) :

| Raccourci | Effet |
|---|---|
| `Ctrl + O` | Sauvegarder (**O**utput) |
| `Ctrl + X` | Quitter |
| `Ctrl + K` | Couper une ligne |
| `Ctrl + U` | Coller |
| `Ctrl + W` | Rechercher |

## Voir seulement le début/la fin d'un fichier : `head` et `tail`

Utile pour de gros fichiers où `cat` afficherait beaucoup trop de lignes d'un coup.

### `head` — début du fichier
```bash
$ head notes.txt          # affiche les 10 premières lignes par défaut
$ head -n 5 notes.txt     # affiche les 5 premières lignes
```

### `tail` — fin du fichier
```bash
$ tail notes.txt          # affiche les 10 dernières lignes par défaut
$ tail -n 3 notes.txt     # affiche les 3 dernières lignes
```

| Option | Effet |
|---|---|
| `-n N` | Affiche N lignes au lieu de 10 |
| `-f` | (tail seulement) **f**ollow — affiche en direct les nouvelles lignes ajoutées au fichier (utile pour suivre un fichier de log en temps réel) |

## Tableau récapitulatif

| Commande | Rôle |
|---|---|
| `file` | Déterminer le type réel d'un fichier |
| `mkdir` | Créer un répertoire |
| `mkdir -p` | Créer plusieurs niveaux de répertoires d'un coup |
| `touch` | Créer un fichier vide / mettre à jour sa date |
| `cat` | Afficher tout le contenu d'un fichier |
| `>` | Rediriger en **remplaçant** |
| `>>` | Rediriger en **ajoutant** à la fin |
| `nano` | Éditer un fichier dans le terminal |
| `head -n N` | Afficher les N premières lignes |
| `tail -n N` | Afficher les N dernières lignes |
| `tail -f` | Suivre un fichier en temps réel |
