# Manipuler les fichiers : copier, déplacer, supprimer, s'informer

## `wc` — Word Count

Compte des éléments dans un fichier texte : lignes, mots, caractères.

```bash
$ wc notes.txt
  12   84  530 notes.txt
```
(ici : 12 lignes, 84 mots, 530 caractères)

| Option | Compte |
|---|---|
| `-l` | Nombre de **lignes** |
| `-w` | Nombre de **mots** |
| `-c` | Nombre de **caractères** (octets) |

```bash
$ wc -l notes.txt
12 notes.txt
```

## `cp` — Copy

Copie un fichier (ou un dossier) à un autre endroit.

```bash
cp source destination
```

Exemples :
```bash
$ cp notes.txt notes_backup.txt        # copie dans le même dossier sous un autre nom
$ cp notes.txt documents/               # copie dans le dossier documents/
$ cp -r cours/ cours_backup/            # -r = récursif, obligatoire pour copier un DOSSIER entier
```

> **Piège classique** : sans `-r`, `cp` refuse de copier un répertoire entier (erreur "omitting directory").

## `mv` — Move

Déplace un fichier, OU le renomme (c'est la même commande !).

```bash
mv source destination
```

```bash
$ mv notes.txt documents/          # déplace notes.txt dans documents/
$ mv notes.txt notes_finales.txt   # renomme notes.txt en notes_finales.txt
```

## `rm` — Remove

Supprime un fichier **définitivement** (pas de corbeille en ligne de commande !).

```bash
$ rm notes.txt
```

| Option | Effet |
|---|---|
| `-r` | Récursif — nécessaire pour supprimer un **dossier** et tout son contenu |
| `-f` | Force — ne demande pas confirmation |
| `-i` | Interactif — demande confirmation avant chaque suppression (plus sûr) |

> ⚠️ **Attention** : `rm -rf` supprime tout sans demander confirmation et **sans possibilité de récupération**. Ne jamais taper ça à la légère, surtout avec `*` ou en tant qu'administrateur.

## `rmdir` — Remove Directory

Supprime un répertoire, mais **seulement s'il est vide**. Si le dossier contient des fichiers, il faut utiliser `rm -r` à la place.

```bash
$ rmdir dossier_vide
```

## Obtenir de l'aide : `man` et `apropos`

### `man` — Manual
Affiche le manuel complet d'une commande : ce qu'elle fait, toutes ses options, des exemples.

```bash
$ man ls
```
(Pour quitter le manuel : touche `q`)

### `apropos`
Cherche parmi **toutes** les commandes celles dont la description contient un mot-clé donné. Utile quand on ne connaît pas le nom exact de la commande qu'on cherche.

```bash
$ apropos "copy"
cp (1)     - copy files and directories
```

## Tableau récapitulatif

| Commande | Rôle | Exemple |
|---|---|---|
| `wc` | Compter lignes/mots/caractères | `wc -l fichier.txt` |
| `cp` | Copier | `cp a.txt b.txt` |
| `mv` | Déplacer / renommer | `mv a.txt dossier/` |
| `rm` | Supprimer un fichier | `rm a.txt` |
| `rmdir` | Supprimer un dossier vide | `rmdir dossier` |
| `man` | Voir le manuel d'une commande | `man cp` |
| `apropos` | Chercher une commande par mot-clé | `apropos "delete"` |

## Erreurs fréquentes à éviter

- Confondre `rm` (fichier) et `rmdir`/`rm -r` (dossier).
- Oublier `-r` en copiant/supprimant un dossier.
- Faire `rm` sans vérifier avec `ls` qu'on est au bon endroit (toujours faire `pwd` + `ls` avant un `rm` important !).
