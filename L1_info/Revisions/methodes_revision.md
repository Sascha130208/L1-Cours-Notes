# Comment réviser efficacement (et sans s'ennuyer)

## Pour l'Unix/Linux : la meilleure méthode = pratiquer, pas lire

Les commandes shell, ça s'apprend par les **doigts**, pas par les yeux. Lire la liste des commandes 10 fois ne vaut pas 10 minutes à vraiment taper dedans.

### 1. Ouvre un vrai terminal et rejoue les cours
- Si tu es sur Windows : ouvre **Git Bash**, ou active le **WSL** (Windows Subsystem for Linux), ou utilise un terminal en ligne comme [replit.com](https://replit.com) / [webminal.org](https://www.webminal.org) (bac à sable Unix gratuit dans le navigateur).
- Recrée à la main l'arborescence `home/alice/cours/systeme/...` de tes notes avec `mkdir -p`, puis navigue dedans avec `cd`, `ls`, `pwd` jusqu'à ce que ça devienne un réflexe.

### 2. Le jeu du "je devine la commande"
Demande à quelqu'un (ou à moi) de te donner un objectif en français ("affiche les 3 dernières lignes du fichier", "trouve tous les fichiers cachés") et tape la commande sans regarder tes notes. Chronomètre-toi.

### 3. Flashcards commande ↔ rôle
Fais des flashcards (papier ou une appli comme Anki/Quizlet) :
- Recto : `sort -t ':' -k 2`
- Verso : "trie selon la 2e colonne, séparateur `:`"

Répète dans les deux sens : donne-toi le rôle, retrouve la commande — c'est ce sens-là qui est le plus dur (et le plus utile en examen).

### 4. Crée ton propre "mini projet" fil rouge
Un classique très efficace : crée un faux fichier `notes_classe.txt` avec des données inventées (`nom:matiere:note`), puis essaie d'enchaîner un maximum de commandes dessus : trier par note, extraire une colonne, compter les occurrences d'une matière, etc. C'est exactement le genre d'exercice qu'on te donnera en TP/examen.

### 5. Le "quiz à trous" avant un contrôle
Reprends `Exercices/exercices_unix.md`, cache toutes les réponses, et fais-les toutes d'affilée sans t'arrêter. Note ton score. Refais 2 jours après (la répétition espacée est beaucoup plus efficace que de tout revoir la veille).

## Pour l'algorithmique : comprendre avant de mémoriser

L'algorithmique n'est pas une matière "par cœur" — c'est de la logique. Le but n'est pas de mémoriser un algorithme, mais de comprendre **comment construire un raisonnement**.

### 1. La technique du "je l'explique à voix haute"
Prends un algorithme (le tien ou un exercice) et explique **à voix haute**, ligne par ligne, ce qu'il fait — comme si tu l'expliquais à quelqu'un qui n'y connaît rien. Si tu bloques sur une ligne, c'est que tu ne l'as pas encore vraiment comprise.

### 2. Trace-le "à la main" (exécution pas à pas)
Pour un algorithme donné, fais un tableau avec une colonne par variable, et note leur valeur après chaque ligne exécutée. C'est LA méthode de référence pour comprendre (et déboguer) un algorithme.

Exemple pour l'algorithme d'échange (`Exercices/exercices_algo.md`) :

| Ligne exécutée | a | b | temp |
|---|---|---|---|
| `a ← 5` | 5 | ? | ? |
| `b ← 8` | 5 | 8 | ? |
| `temp ← a` | 5 | 8 | 5 |
| `a ← b` | 8 | 8 | 5 |
| `b ← temp` | 8 | 5 | 5 |

### 3. Invente tes propres erreurs
Prends un algorithme correct, introduis volontairement une erreur (mauvais nom de variable, `=` au lieu de `←`, variable non déclarée...), et vois si tu la repères en le relisant. C'est un excellent entraînement pour l'examen où on te demandera souvent de "trouver l'erreur".

### 4. Transforme le cours en petit défi quotidien
Chaque jour, essaie d'écrire un algorithme tout simple à partir d'une situation réelle (calcul de pourboire, conversion de température, vérifier si un nombre est pair...). 5 minutes par jour valent mieux qu'une révision de 2h la veille de l'examen.

## Idée bonus : mélanger les deux matières

Une fois à l'aise avec les deux, essaie de "traduire" un algorithme simple en une **vraie commande shell** quand c'est possible (par exemple, "trier une liste de nombres" = l'algorithme du cours d'algo, et `sort -n` = la version tout-faite en Unix). Ça aide à comprendre que la programmation, ce sont des concepts qui se retrouvent partout, pas des recettes isolées par matière.

## Pour tes cours de maths

Dis-moi quels chapitres de maths tu veux que je t'aide à réviser (et si possible, envoie-moi aussi tes notes comme pour l'info) — je ferai la même chose : notes réorganisées + exercices progressifs + méthodes de révision adaptées à la matière (les maths se révisent différemment de l'algo : plus d'exercices répétés, de démonstrations à refaire soi-même sans regarder le cours).
