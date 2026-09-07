# Système d'exploitation — Navigation dans les fichiers

## Le terminal, c'est quoi ?

Le terminal permet de piloter l'ordinateur en tapant des **commandes** au lieu de cliquer avec la souris. Chaque commande est exécutée dans un **répertoire courant** (l'endroit où tu te trouves), un peu comme quand tu navigues dans l'explorateur de fichiers Windows/Mac, sauf qu'ici tu tapes le chemin au lieu de double-cliquer.

## Les commandes de base

### `pwd` — Print Working Directory
Affiche le chemin complet du répertoire dans lequel on se trouve actuellement.

```bash
$ pwd
/home/alice
```

> **À retenir** : `pwd` = « où suis-je ? »

### `ls` — List
Affiche le contenu (fichiers + répertoires) du répertoire courant.

```bash
$ ls
cours  images  documents
```

> **À retenir** : `ls` = « qu'est-ce qu'il y a ici ? »

#### Options utiles de `ls`

| Option | Effet |
|---|---|
| `-l` | Affichage **détaillé** (long) : permissions, propriétaire, taille, date, nom |
| `-a` | Affiche aussi les fichiers **cachés** (ceux qui commencent par `.`) |
| `-h` | Tailles lisibles par un humain (Ko, Mo, Go au lieu d'octets) — à combiner avec `-l` |
| `-la` ou `-al` | Combine `-l` et `-a` |

Exemple de sortie avec `ls -l` :

```bash
$ ls -l
drwxr-xr-x  2 alice alice 4096 sept.  7 10:00 cours
-rw-r--r--  1 alice alice  512 sept.  7 09:30 notes.txt
```

Le tout premier caractère de chaque ligne indique le **type** :

| Symbole | Signifie |
|---|---|
| `d` | **d**irectory → un **répertoire** (dossier) |
| `-` | fichier **ordinaire** |
| `l` | lien symbolique (raccourci) |

### Fichiers cachés

Un nom de fichier ou de répertoire qui **commence par un point `.`** est considéré comme **caché**. Il n'apparaît pas avec un simple `ls`, il faut `ls -a`.

```bash
$ ls -a
.  ..  .bashrc  cours  images
```

- `.` représente le répertoire courant lui-même
- `..` représente le répertoire **parent**

## Se déplacer : `cd` (Change Directory)

| Commande | Effet |
|---|---|
| `cd nom_dossier` | Va dans le sous-dossier `nom_dossier` |
| `cd ..` | Remonte d'un niveau : va dans le répertoire **parent** |
| `cd .` | Reste dans le répertoire **courant** (ne change rien — utile surtout dans des scripts) |
| `cd ~` ou `cd` (sans rien après) | Revient directement dans son **répertoire personnel** (home) |
| `cd -` | Revient au **dernier répertoire visité** (pratique pour faire des allers-retours) |
| `cd /` | Va à la **racine** du système de fichiers |

## Chemins absolus vs chemins relatifs

Un **chemin** décrit l'emplacement d'un fichier ou dossier. Il y a deux façons de l'écrire :

### Chemin absolu
Commence toujours par `/` (la racine). Il décrit le chemin **complet**, depuis le tout début du système, peu importe où on se trouve actuellement.

```bash
/home/alice/cours/systeme/cours.txt
```

### Chemin relatif
Ne commence PAS par `/`. Il est décrit **par rapport à l'endroit où l'on se trouve actuellement** (le répertoire courant).

**Exemple** : si on se trouve dans `/home/alice`, alors le chemin relatif :

```bash
cours/systeme/cours.txt
```

...pointe vers exactement le même fichier que le chemin absolu `/home/alice/cours/systeme/cours.txt`.

> **Astuce pour comprendre la différence** : le chemin absolu, c'est comme donner une adresse complète (« 12 rue de la Paix, Paris, France ») — ça marche depuis n'importe où. Le chemin relatif, c'est comme dire « la maison juste après le carrefour » — ça ne veut dire quelque chose que si on sait déjà où on est.

### Tableau récapitulatif des symboles de chemin

| Symbole | Signification |
|---|---|
| `/` | Racine du système, ou séparateur entre dossiers |
| `~` | Répertoire personnel (home) de l'utilisateur |
| `.` | Répertoire courant |
| `..` | Répertoire parent (un niveau au-dessus) |
| `-` | (avec `cd`) dernier répertoire visité |

## Autres commandes utiles pour se repérer

| Commande | Effet |
|---|---|
| `whoami` | Affiche le nom de l'utilisateur connecté |
| `history` | Affiche l'historique des commandes tapées |
| `clear` | Efface l'écran du terminal (raccourci : `Ctrl + L`) |

## Schéma mental

```
/                          ← racine
├── home/
│   └── alice/              ← "~" pour alice, = /home/alice
│       ├── cours/
│       │   └── systeme/
│       │       └── cours.txt
│       ├── images/
│       └── documents/
```

Si je suis dans `/home/alice` et que je tape `cd cours/systeme`, je me retrouve dans `/home/alice/cours/systeme`. Si je tape `cd ..` je remonte dans `/home/alice/cours`. Si je tape `cd ~` je reviens direct dans `/home/alice`.
