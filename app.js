const form = document.querySelector('.form-quizz');
let tableauResultats = [];
const reponses = ['a','b','c','a','b'];
const emojis = ['✔️','✨','👀','😭','👎'];
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aideResultat = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.question-block');
let verifTableau = []; 


// On écoute le bouton submit avec une fonction fléchée anonyme, utilisation du (e) pour utiliser les méthodes et propriétés d'un event
form.addEventListener('submit', (e) => {
    
    // on retire son comportement par défaut qui rechargerait la page
    e.preventDefault();

    // On log que c'est bien la valeur checkée qui est renvoyée
    console.log(document.querySelector('input[name="q1"]:checked').value);

    // On crée une boucle qui ajoute les valeurs (réponses) des 5 questions, i = 1 car name = "qX" qui démarre à 1
    for(i = 1; i < 6; i++) {
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }

    // On log les valeurs checkées
    console.log(tableauResultats);

    // On appelle la fonction qui renvoie false ou true en comparant les valeurs de tableauResultats[] et reponses[]
    verifFunc(tableauResultats);

    // On vide le tableau dans lequel sont les valeurs checkées
    tableauResultats = [];
})



// On créé la fonction de vérification des bonnes réponses
function verifFunc(tabResultats) {
 
    // On crée une boucle qui compare les 5 valeurs soumises et les valeurs de reponses[] , a = 0 car 1er élément d'un tableau a un indice de 0
    for(let a = 0; a < 5; a++){

        // On push true si la comparaison matche, sinon on push false
        if(tabResultats[a] === reponses[a]) {
            verifTableau.push(true);
        } else {
            verifTableau.push(false);
        }
    }

    // On log le tableau contenant le résultat de la comparaison avec les true et false
    console.log(verifTableau);
    
    // Méthode d'affichage des résultats avec le tableau des résultats comme argument
    afficherResultats(verifTableau);

    // Méthode d'affichage des couleurs et effets si c'est une bonne ou mauvaise réponse
    couleursFonction(verifTableau);

    // On vide le tableau dans lequel sont les résultats
    verifTableau = [];
}



// On crée une fonction qui selon le nombre de fautes va afficher le résultat, on utilise switch à la place de if/else
function afficherResultats(tabCheck) {
    const nbDeFautes = tabCheck.filter(el => el !== true).length;
    console.log(nbDeFautes);

    switch(nbDeFautes) {

        case 0:
            titreResultat.innerText = `Bravo, c'est un sans faute ${emojis[0]}`
            aideResultat.innerText = 'Vous n\'avez pas eu besoin d\'aide';
            noteResultat.innerText = '5/5';
            break;
        case 1:
            titreResultat.innerText = `Félicitations, c'était presque parfait ${emojis[1]}`
            aideResultat.innerText = 'Allez, encore un petit effort';
            noteResultat.innerText = '4/5';
            break;
        case 2:
            titreResultat.innerText = `C'est bien, mais vous pouvez faire mieux ${emojis[2]}`
            aideResultat.innerText = 'Vous êtes à deux réponses du sans faute';
            noteResultat.innerText = '3/5';
            break;
        case 3:
            titreResultat.innerText = `C'est limite, une révision s'impose ${emojis[3]}`
            aideResultat.innerText = 'Retentez après avoir révisé';
            noteResultat.innerText = '2/5';
            break;
        case 4:
            titreResultat.innerText = `Vous frôlez la correctionnelle ${emojis[4]}`
            aideResultat.innerText = 'Vous avez répondu au hasard non ?';
            noteResultat.innerText = '1/5';
            break;
        case 5:
            titreResultat.innerText = `Ridicule, 0 + 0 = ? ${emojis[4]}`
            aideResultat.innerText = 'Ce n\'est plus de l\'aide qu\'il vous faut, mais un plan de sauvetage';
            noteResultat.innerText = '0/5';
            break;

            default:
                'Oops, un problème est survenu. Contactez le webmaster';

                    
    }
}



// On crée la fonction qui va ajouter une couleur et un effet en cas de bonnes ou mauvaises réponses
function couleursFonction(tabValBool) {
    
    for(let j = 0; j < tabValBool.length; j++) {

        if(tabValBool[j] === true){
            toutesLesQuestions[j].style.background = 'lightgreen';
        } 
            // On ajoute un bg et la classe echec qui est dans style.css (on peut utiliser la méthode toggle), on la supprime après une seconde
            else {
            toutesLesQuestions[j].style.background = '#ffb8b8';
            toutesLesQuestions[j].classList.add('echec');

            setTimeout(() => {
                toutesLesQuestions[j].classList.remove('echec');
            }, 1000)
        }
    }
}

// On utilise forEach, une méthode qui va exécuter une fonction sur chaque élément  
toutesLesQuestions.forEach(item => {
    item.addEventListener('click', () => {
        item.style.background = "white";
    })
})