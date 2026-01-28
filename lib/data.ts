import { Chapter, Quiz } from './types'

export const chapters: Chapter[] = [
  {
    id: '1',
    title: 'Introduction à la Mécanique Quantique',
    description: 'Découvrez les fondements de la physique qui régit l\'infiniment petit et ses mystères fascinants.',
    content: `
# Introduction à la Mécanique Quantique

La mécanique quantique est l'une des théories les plus révolutionnaires de la physique moderne. Elle décrit le comportement de la matière et de l'énergie à l'échelle atomique et subatomique.

## Pourquoi la mécanique quantique ?

Au début du 20ème siècle, les physiciens ont découvert que les lois de la physique classique ne pouvaient pas expliquer certains phénomènes observés à très petite échelle. La mécanique quantique est née de la nécessité de comprendre ces comportements étranges.

## Les piliers fondamentaux

### 1. La quantification de l'énergie
L'énergie n'est pas continue mais vient par "paquets" discrets appelés **quanta**. Max Planck a introduit cette idée révolutionnaire en 1900.

### 2. La dualité onde-particule
Les particules comme les électrons peuvent se comporter à la fois comme des particules et comme des ondes. Cette dualité est au cœur de la mécanique quantique.

### 3. Le principe d'incertitude
Formulé par Werner Heisenberg, ce principe stipule qu'il est impossible de connaître simultanément et avec précision la position et la vitesse d'une particule.

### 4. La superposition quantique
Une particule peut exister dans plusieurs états simultanément jusqu'à ce qu'une mesure soit effectuée.

## Applications modernes

- **Ordinateurs quantiques** : Utilisant les principes de superposition pour des calculs ultra-rapides
- **Cryptographie quantique** : Communication inviolable basée sur les lois quantiques
- **IRM médicale** : Imagerie utilisant les propriétés quantiques des atomes
- **Lasers** : Fonctionnant grâce à l'émission stimulée de photons
    `,
    order: 1,
    imageUrl: '/images/intro-quantum.svg',
    icon: 'Atom',
    duration: '15 min',
    difficulty: 'Débutant'
  },
  {
    id: '2',
    title: 'La Dualité Onde-Particule',
    description: 'Explorez le concept fascinant où la matière se comporte à la fois comme une onde et une particule.',
    content: `
# La Dualité Onde-Particule

L'une des découvertes les plus surprenantes de la physique quantique est que la matière possède une double nature : elle peut se comporter comme une particule ou comme une onde.

## L'expérience des fentes de Young

Cette expérience célèbre démontre parfaitement la dualité onde-particule :

### Configuration
Un faisceau de particules (électrons, photons) est envoyé vers un écran percé de deux fentes parallèles.

### Résultat surprenant
- **Sans observation** : Les particules créent un motif d'interférence typique des ondes
- **Avec observation** : Les particules se comportent comme des billes classiques

## La longueur d'onde de De Broglie

Louis de Broglie a proposé que toute particule possède une longueur d'onde associée :

**λ = h / p**

Où :
- λ est la longueur d'onde
- h est la constante de Planck
- p est la quantité de mouvement

## Implications philosophiques

Cette dualité remet en question notre conception classique de la réalité. La nature d'une particule semble dépendre de la façon dont nous choisissons de l'observer.

## Applications

- **Microscopie électronique** : Utilise la nature ondulatoire des électrons
- **Diffraction des neutrons** : Analyse de structures cristallines
    `,
    order: 2,
    imageUrl: '/images/wave-particle.svg',
    icon: 'Waves',
    duration: '20 min',
    difficulty: 'Intermédiaire'
  },
  {
    id: '3',
    title: 'Le Principe d\'Incertitude',
    description: 'Comprenez pourquoi il est impossible de tout connaître d\'une particule quantique.',
    content: `
# Le Principe d'Incertitude de Heisenberg

Formulé en 1927 par Werner Heisenberg, ce principe est l'un des concepts les plus fondamentaux de la mécanique quantique.

## L'énoncé du principe

Il est impossible de connaître simultanément et avec une précision arbitraire la position et la quantité de mouvement d'une particule.

**Δx · Δp ≥ ℏ/2**

Où :
- Δx est l'incertitude sur la position
- Δp est l'incertitude sur la quantité de mouvement
- ℏ est la constante de Planck réduite

## Ce que cela signifie

### Ce n'est PAS
- Un problème de technologie de mesure
- Une limitation de nos instruments

### C'est
- Une propriété fondamentale de la nature
- Une limite intrinsèque à la connaissance possible

## Autres paires conjuguées

Le principe s'applique aussi à d'autres paires de variables :
- **Énergie et temps** : ΔE · Δt ≥ ℏ/2
- **Moment angulaire et angle**

## Conséquences

### L'énergie du vide
Même le vide absolu contient des fluctuations d'énergie à cause de l'incertitude.

### Les particules virtuelles
Des particules peuvent "emprunter" de l'énergie au vide pendant de très courts instants.

## Impact sur notre vision du monde

Le principe d'incertitude nous montre que l'univers est fondamentalement probabiliste, pas déterministe.
    `,
    order: 3,
    imageUrl: '/images/uncertainty.svg',
    icon: 'HelpCircle',
    duration: '18 min',
    difficulty: 'Intermédiaire'
  },
  {
    id: '4',
    title: 'La Superposition Quantique',
    description: 'Découvrez comment une particule peut être dans plusieurs états à la fois.',
    content: `
# La Superposition Quantique

La superposition est peut-être le concept le plus contre-intuitif de la mécanique quantique.

## Qu'est-ce que la superposition ?

Un système quantique peut exister dans une combinaison linéaire de plusieurs états distincts simultanément, jusqu'à ce qu'une mesure soit effectuée.

## Le chat de Schrödinger

Cette expérience de pensée célèbre illustre l'étrangeté de la superposition :

### Le dispositif
- Un chat dans une boîte fermée
- Un atome radioactif
- Un détecteur relié à un poison

### Le paradoxe
Selon la mécanique quantique, tant que la boîte n'est pas ouverte, le chat est à la fois **vivant ET mort**.

## La fonction d'onde

L'état d'un système quantique est décrit par une fonction d'onde ψ (psi) :

**|ψ⟩ = α|0⟩ + β|1⟩**

Où α et β sont des amplitudes de probabilité complexes.

## L'effondrement de la fonction d'onde

Lors d'une mesure :
1. La superposition "s'effondre"
2. Un seul état est observé
3. La probabilité suit |amplitude|²

## Applications révolutionnaires

### Ordinateurs quantiques
Les qubits utilisent la superposition pour représenter 0 ET 1 simultanément, permettant des calculs parallèles massifs.

### Capteurs quantiques
Exploitent la sensibilité extrême des systèmes en superposition.
    `,
    order: 4,
    imageUrl: '/images/superposition.svg',
    icon: 'Layers',
    duration: '22 min',
    difficulty: 'Intermédiaire'
  },
  {
    id: '5',
    title: 'L\'Intrication Quantique',
    description: 'Explorez le phénomène qu\'Einstein appelait "l\'action fantôme à distance".',
    content: `
# L'Intrication Quantique

L'intrication est l'un des phénomènes les plus mystérieux de la physique quantique, décrit par Einstein comme une "action fantôme à distance".

## Définition

Deux particules sont intriquées lorsque l'état quantique de l'une est instantanément corrélé à l'état de l'autre, quelle que soit la distance qui les sépare.

## Comment créer l'intrication ?

### Méthodes courantes
- **Conversion paramétrique** : Un photon se divise en deux photons intriqués
- **Collision de particules** : Interaction créant des paires corrélées
- **Atomes piégés** : Manipulation par laser

## Le paradoxe EPR

Einstein, Podolsky et Rosen ont proposé en 1935 une expérience de pensée pour démontrer que la mécanique quantique était "incomplète".

### Leur argument
Si mesurer une particule affecte instantanément l'autre à distance, soit :
1. L'information voyage plus vite que la lumière (impossible selon la relativité)
2. Il existe des "variables cachées" non découvertes

## Les inégalités de Bell

John Bell a montré en 1964 qu'on pouvait tester expérimentalement si des variables cachées existent.

### Résultat des expériences
Les expériences d'Alain Aspect (1982) et suivantes ont confirmé : **la mécanique quantique a raison**, il n'y a pas de variables cachées locales.

## Applications

- **Téléportation quantique** : Transfert d'état quantique (pas de matière)
- **Cryptographie quantique** : Clés de chiffrement inviolables
- **Internet quantique** : Réseau de communication ultra-sécurisé
    `,
    order: 5,
    imageUrl: '/images/entanglement.svg',
    icon: 'Link',
    duration: '25 min',
    difficulty: 'Avancé'
  },
  {
    id: '6',
    title: 'L\'Équation de Schrödinger',
    description: 'Maîtrisez l\'équation fondamentale qui gouverne l\'évolution des systèmes quantiques.',
    content: `
# L'Équation de Schrödinger

L'équation de Schrödinger est à la mécanique quantique ce que les équations de Newton sont à la mécanique classique.

## L'équation dépendante du temps

**iℏ ∂ψ/∂t = Ĥψ**

Où :
- i est l'unité imaginaire
- ℏ est la constante de Planck réduite
- ψ est la fonction d'onde
- Ĥ est l'opérateur hamiltonien (énergie totale)

## L'équation indépendante du temps

Pour les états stationnaires :

**Ĥψ = Eψ**

C'est une équation aux valeurs propres où E représente l'énergie du système.

## La fonction d'onde ψ

### Interprétation de Born
|ψ(x,t)|² donne la densité de probabilité de trouver la particule à la position x au temps t.

### Propriétés
- Doit être normalisée : ∫|ψ|²dx = 1
- Continue et dérivable
- Tend vers 0 à l'infini

## Exemples fondamentaux

### Particule dans une boîte
Solutions : fonctions sinusoïdales avec énergies quantifiées
**Eₙ = n²π²ℏ²/(2mL²)**

### Oscillateur harmonique
Énergies : **Eₙ = ℏω(n + 1/2)**
Même au niveau fondamental (n=0), l'énergie n'est pas nulle !

### Atome d'hydrogène
Explique les niveaux d'énergie et les orbitales atomiques.

## Importance historique

Cette équation, formulée en 1926, a permis d'unifier et d'expliquer de nombreux phénomènes atomiques auparavant mystérieux.
    `,
    order: 6,
    imageUrl: '/images/schrodinger.svg',
    icon: 'Function',
    duration: '30 min',
    difficulty: 'Avancé'
  }
]

export const quizzes: Quiz[] = [
  {
    id: '1',
    chapterId: '1',
    title: 'Quiz : Introduction à la Mécanique Quantique',
    questions: [
      {
        id: '1-1',
        text: 'Qui a introduit le concept de quantification de l\'énergie ?',
        options: ['Albert Einstein', 'Max Planck', 'Niels Bohr', 'Werner Heisenberg'],
        correctAnswer: 1,
        explanation: 'Max Planck a introduit le concept de quanta d\'énergie en 1900 pour expliquer le rayonnement du corps noir.'
      },
      {
        id: '1-2',
        text: 'Qu\'est-ce qu\'un quantum ?',
        options: [
          'Une particule subatomique',
          'La plus petite unité indivisible d\'énergie',
          'Un type d\'onde électromagnétique',
          'Un état de la matière'
        ],
        correctAnswer: 1,
        explanation: 'Un quantum est la plus petite quantité discrète d\'énergie. L\'énergie est quantifiée et ne peut exister que par multiples de cette unité fondamentale.'
      },
      {
        id: '1-3',
        text: 'Quelle application moderne utilise les principes de superposition quantique ?',
        options: [
          'Les téléphones portables',
          'Les ordinateurs quantiques',
          'Les panneaux solaires',
          'Les moteurs électriques'
        ],
        correctAnswer: 1,
        explanation: 'Les ordinateurs quantiques utilisent la superposition pour effectuer des calculs parallèles grâce aux qubits qui peuvent être dans l\'état 0 et 1 simultanément.'
      },
      {
        id: '1-4',
        text: 'Le principe d\'incertitude de Heisenberg concerne :',
        options: [
          'La masse et la charge d\'une particule',
          'La position et la vitesse d\'une particule',
          'L\'énergie et la masse d\'une particule',
          'La taille et la forme d\'une particule'
        ],
        correctAnswer: 1,
        explanation: 'Le principe d\'incertitude stipule qu\'on ne peut pas connaître simultanément avec précision la position et la quantité de mouvement (liée à la vitesse) d\'une particule.'
      }
    ]
  },
  {
    id: '2',
    chapterId: '2',
    title: 'Quiz : La Dualité Onde-Particule',
    questions: [
      {
        id: '2-1',
        text: 'Dans l\'expérience des fentes de Young avec des électrons, que se passe-t-il quand on n\'observe pas ?',
        options: [
          'Les électrons passent par une seule fente',
          'Les électrons créent un motif d\'interférence',
          'Les électrons disparaissent',
          'Les électrons s\'arrêtent'
        ],
        correctAnswer: 1,
        explanation: 'Sans observation, les électrons se comportent comme des ondes et créent un motif d\'interférence caractéristique sur l\'écran.'
      },
      {
        id: '2-2',
        text: 'La formule de De Broglie λ = h/p relie :',
        options: [
          'L\'énergie et la masse',
          'La longueur d\'onde et la quantité de mouvement',
          'La fréquence et le temps',
          'La vitesse et l\'accélération'
        ],
        correctAnswer: 1,
        explanation: 'La relation de De Broglie associe une longueur d\'onde (λ) à toute particule en mouvement, en fonction de sa quantité de mouvement (p).'
      },
      {
        id: '2-3',
        text: 'Quelle technique utilise la nature ondulatoire des électrons ?',
        options: [
          'La radiographie',
          'La microscopie électronique',
          'L\'échographie',
          'La thermographie'
        ],
        correctAnswer: 1,
        explanation: 'La microscopie électronique exploite la très courte longueur d\'onde des électrons pour obtenir des images à très haute résolution.'
      }
    ]
  },
  {
    id: '3',
    chapterId: '3',
    title: 'Quiz : Le Principe d\'Incertitude',
    questions: [
      {
        id: '3-1',
        text: 'Le principe d\'incertitude est-il dû à nos instruments de mesure imparfaits ?',
        options: [
          'Oui, avec de meilleurs instruments on pourrait tout mesurer',
          'Non, c\'est une propriété fondamentale de la nature',
          'Cela dépend du type de particule',
          'Seulement pour les particules très petites'
        ],
        correctAnswer: 1,
        explanation: 'Le principe d\'incertitude n\'est pas une limitation technologique mais une propriété intrinsèque de la nature quantique.'
      },
      {
        id: '3-2',
        text: 'Quelle autre paire de variables est liée par une relation d\'incertitude ?',
        options: [
          'Masse et volume',
          'Énergie et temps',
          'Température et pression',
          'Charge et spin'
        ],
        correctAnswer: 1,
        explanation: 'L\'énergie et le temps forment une autre paire conjuguée : ΔE·Δt ≥ ℏ/2. Cela permet l\'existence de particules virtuelles.'
      },
      {
        id: '3-3',
        text: 'Les fluctuations du vide quantique sont une conséquence de :',
        options: [
          'La gravité',
          'L\'électromagnétisme',
          'Le principe d\'incertitude',
          'La force nucléaire'
        ],
        correctAnswer: 2,
        explanation: 'Le principe d\'incertitude implique que même le vide ne peut avoir une énergie exactement nulle, d\'où les fluctuations quantiques du vide.'
      }
    ]
  },
  {
    id: '4',
    chapterId: '4',
    title: 'Quiz : La Superposition Quantique',
    questions: [
      {
        id: '4-1',
        text: 'Dans l\'expérience du chat de Schrödinger, avant l\'ouverture de la boîte, le chat est :',
        options: [
          'Vivant',
          'Mort',
          'Dans une superposition vivant ET mort',
          'Ni vivant ni mort'
        ],
        correctAnswer: 2,
        explanation: 'Selon la mécanique quantique, avant la mesure (ouverture de la boîte), le chat est dans une superposition des deux états jusqu\'à l\'observation.'
      },
      {
        id: '4-2',
        text: 'Que se passe-t-il lors de la mesure d\'un système en superposition ?',
        options: [
          'Rien de spécial',
          'L\'effondrement de la fonction d\'onde',
          'La particule disparaît',
          'La superposition se renforce'
        ],
        correctAnswer: 1,
        explanation: 'La mesure provoque l\'effondrement de la fonction d\'onde : le système "choisit" un état parmi tous les états possibles de la superposition.'
      },
      {
        id: '4-3',
        text: 'Un qubit en superposition peut représenter :',
        options: [
          'Seulement 0',
          'Seulement 1',
          '0 et 1 simultanément',
          'Ni 0 ni 1'
        ],
        correctAnswer: 2,
        explanation: 'Contrairement au bit classique, un qubit peut être dans une superposition de 0 et 1, ce qui permet aux ordinateurs quantiques leur puissance de calcul.'
      }
    ]
  },
  {
    id: '5',
    chapterId: '5',
    title: 'Quiz : L\'Intrication Quantique',
    questions: [
      {
        id: '5-1',
        text: 'Comment Einstein appelait-il l\'intrication quantique ?',
        options: [
          'Magie quantique',
          'Action fantôme à distance',
          'Connexion mystérieuse',
          'Lien invisible'
        ],
        correctAnswer: 1,
        explanation: 'Einstein était sceptique envers l\'intrication et l\'appelait "spukhafte Fernwirkung" - action fantôme à distance.'
      },
      {
        id: '5-2',
        text: 'Que prouvent les expériences d\'Alain Aspect ?',
        options: [
          'Les variables cachées existent',
          'Einstein avait raison',
          'La mécanique quantique est correcte, pas de variables cachées locales',
          'L\'intrication n\'existe pas'
        ],
        correctAnswer: 2,
        explanation: 'Les expériences d\'Aspect ont violé les inégalités de Bell, prouvant que la mécanique quantique est correcte et qu\'il n\'existe pas de variables cachées locales.'
      },
      {
        id: '5-3',
        text: 'La téléportation quantique permet de transférer :',
        options: [
          'De la matière instantanément',
          'De l\'énergie à distance',
          'Un état quantique',
          'Des objets macroscopiques'
        ],
        correctAnswer: 2,
        explanation: 'La téléportation quantique transfère l\'état quantique d\'une particule à une autre, pas la matière elle-même. Elle nécessite aussi un canal classique.'
      }
    ]
  },
  {
    id: '6',
    chapterId: '6',
    title: 'Quiz : L\'Équation de Schrödinger',
    questions: [
      {
        id: '6-1',
        text: 'Que représente |ψ|² selon l\'interprétation de Born ?',
        options: [
          'L\'énergie de la particule',
          'La densité de probabilité de présence',
          'La vitesse de la particule',
          'La masse de la particule'
        ],
        correctAnswer: 1,
        explanation: 'Selon Max Born, le carré du module de la fonction d\'onde donne la densité de probabilité de trouver la particule à un endroit donné.'
      },
      {
        id: '6-2',
        text: 'Pour une particule dans une boîte, l\'énergie du niveau fondamental (n=1) est :',
        options: [
          'Nulle',
          'Infinie',
          'Non nulle et positive',
          'Négative'
        ],
        correctAnswer: 2,
        explanation: 'Même au niveau fondamental, l\'énergie est non nulle (E₁ = π²ℏ²/2mL²). C\'est l\'énergie du point zéro, conséquence du principe d\'incertitude.'
      },
      {
        id: '6-3',
        text: 'L\'opérateur Ĥ dans l\'équation de Schrödinger représente :',
        options: [
          'La position',
          'La quantité de mouvement',
          'L\'énergie totale (hamiltonien)',
          'Le spin'
        ],
        correctAnswer: 2,
        explanation: 'L\'hamiltonien Ĥ est l\'opérateur associé à l\'énergie totale du système (énergie cinétique + énergie potentielle).'
      }
    ]
  }
]
