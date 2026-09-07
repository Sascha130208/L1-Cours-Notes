# Exercices — Unix / Linux

Cache la correction avec ta main (ou un papier) et essaie vraiment avant de regarder !

## Niveau facile

**1.** Quelle commande affiche le répertoire courant ?
<details><summary>Réponse</summary><code>pwd</code></details>

**2.** Tu es dans `/home/alice`. Quelle commande te fait remonter dans `/home` ?
<details><summary>Réponse</summary><code>cd ..</code></details>

**3.** Quelle commande crée un dossier nommé `td1` ?
<details><summary>Réponse</summary><code>mkdir td1</code></details>

**4.** Quelle commande affiche TOUS les fichiers d'un dossier, y compris les fichiers cachés, en mode détaillé ?
<details><summary>Réponse</summary><code>ls -la</code></details>

**5.** Comment crée-t-on un fichier vide nommé `rapport.txt` ?
<details><summary>Réponse</summary><code>touch rapport.txt</code></details>

## Niveau intermédiaire

**6.** Écris la commande pour copier le dossier `cours/` (avec tout son contenu) vers `cours_backup/`.
<details><summary>Réponse</summary><code>cp -r cours/ cours_backup/</code></details>

**7.** Tu es dans `/home/alice/documents`. Écris le **chemin relatif** puis le **chemin absolu** vers le fichier `/home/alice/cours/td1.txt`.
<details><summary>Réponse</summary>
Chemin relatif : <code>../cours/td1.txt</code><br>
Chemin absolu : <code>/home/alice/cours/td1.txt</code>
</details>

**8.** Quelle est la différence entre `echo "test" > fichier.txt` exécuté deux fois de suite, et `echo "test" >> fichier.txt` exécuté deux fois de suite ? Que contient `fichier.txt` dans chaque cas ?
<details><summary>Réponse</summary>
Avec <code>&gt;</code> deux fois : <code>fichier.txt</code> ne contient qu'une seule ligne "test" (la deuxième commande a écrasé la première).<br>
Avec <code>&gt;&gt;</code> deux fois : <code>fichier.txt</code> contient deux lignes "test" (chaque commande ajoute à la fin).
</details>

**9.** On a un fichier `notes.csv` avec le format `nom;matiere;note`. Écris la commande pour extraire uniquement la colonne des notes (3ème colonne).
<details><summary>Réponse</summary><code>cut -d ';' -f 3 notes.csv</code></details>

**10.** Comment afficher les 5 dernières lignes d'un fichier `log.txt` ?
<details><summary>Réponse</summary><code>tail -n 5 log.txt</code></details>

## Niveau avancé (avec pipes `|`)

**11.** Le fichier `villes.txt` contient une ville par ligne, avec des doublons pas forcément côte à côte. Écris une commande pour afficher la liste des villes **uniques**, triées par ordre alphabétique.
<details><summary>Réponse</summary><code>sort villes.txt | uniq</code></details>

**12.** À partir de `villes.txt`, écris une commande qui affiche chaque ville avec le nombre de fois qu'elle apparaît.
<details><summary>Réponse</summary><code>sort villes.txt | uniq -c</code></details>

**13.** On a `etudiants.txt` au format `nom:prenom:age`. Écris une commande qui trie les étudiants par âge **décroissant**.
<details><summary>Réponse</summary><code>sort -t ':' -k 3 -n -r etudiants.txt</code></details>

**14.** Écris une commande qui compte combien de lignes contient le fichier `poeme.txt`, sans utiliser `cat` avant.
<details><summary>Réponse</summary><code>wc -l poeme.txt</code></details>

**15. (défi)** À partir de `etudiants.txt` (format `nom:prenom:age`), écris une seule ligne de commande (avec des pipes) qui affiche la liste des noms de famille uniques, triés par ordre alphabétique.
<details><summary>Réponse</summary><code>cut -d ':' -f 1 etudiants.txt | sort | uniq</code></details>

## Exercice pratique guidé

Ouvre un terminal et essaie cette petite mise en situation de A à Z :

1. Va dans ton répertoire personnel (`cd ~`)
2. Crée un dossier `td_unix`
3. Rentre dedans
4. Crée un fichier `animaux.txt` contenant (une ligne à la fois avec `echo ... >>`) : chat, chien, chat, oiseau, chien, chat
5. Affiche le contenu du fichier avec `cat`
6. Trouve la liste des animaux uniques avec leur nombre d'occurrences, triée par ordre alphabétique
7. Vérifie avec `wc -l` que ton fichier contient bien 6 lignes

<details><summary>Solution complète</summary>

```bash
cd ~
mkdir td_unix
cd td_unix
echo "chat" >> animaux.txt
echo "chien" >> animaux.txt
echo "chat" >> animaux.txt
echo "oiseau" >> animaux.txt
echo "chien" >> animaux.txt
echo "chat" >> animaux.txt
cat animaux.txt
sort animaux.txt | uniq -c
wc -l animaux.txt
```
</details>
