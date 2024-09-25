/* Author : Rena Ahn
   File   : script.js (JavaScript)
   Version 1
   Last Updated : September 24th, 2024
*/

/* -- Quiz Constants -- */
/** Philosopher Information JSON   (used when displaying quiz results)
    - quizLetter [string (char)] : the letter option on the quiz which represents
                                   the philosopher's personality
    - name [string] : the name of the philosopher
    - time [string] : the birth year and death year of the philosopher;
                      format : (<birthYear>-<deathYear>)
    - image [JSON] : stores information about the image and its source
        + path [string] : the path to the image file (from this file/directory)
        + caption [string] : the description of the (above) philosopher's image
        + link [string] : the link to the website storing the original image
        + author [JSON] : stores information about the author/uploader of the image
            > name : the name of the author
            > link : the link to the related website about the author
        + license [JSON] : stores information about the license of the image
            > name : the name of the license
            > link : the link to the website explaining the license
    - quote [string] : a famous quote of the philosopher
    - focus [string] : the philosopher's main field or subject of thought
    - description [string] : a description about the philosopher
    - writings [array<string>] : a list of the philosopher's notable writings
    - funFact [string] : a fun fact about the philosopher
*/
const philInfo = {
    descartes: {
        quizLetter: 'A',
        name: 'René Descartes',
        time: '(1596-1650)',
        image: {
            path: 'images/descartes1.jpg',
            caption: 'Portrait of René Descartes by Frans Hals',
            link: "https://commons.wikimedia.org/wiki/File:Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
            author: {
                name: 'Dedden',
                link: 'https://commons.wikimedia.org/wiki/User:Dedden'
            },
            license: {
                name: 'Public Domain',
                link: 'https://creativecommons.org/public-domain/'
            }
        },
        quote: 'I think; therefore I am.',
        focus: "Solipsism",
        description: 'Descartes was a French philosopher, scientist, and mathematician who questioned existence, wondering if like in a dream, the things we believe to exist do not truly exist. This question led him to ponder his existence, to which he came to the conclusion that he is “one that thinks,” and that therefore he exists.',
        writings: [
            'Meditations on First Philosophy (1641, "Meditationes de Prima Philosophia")',
        ],
        funFact: 'His ideas and writings were rejected and banned by the Catholic Church despite having insisted he was a devout and orthodox Catholic.'
    },
    camus: {
        quizLetter: 'B',
        name: 'Albert Camus',
        time: '(1913-1960)',
        image: {
            path: 'images/camus.jpg',
            caption: 'Albert Camus, Nobel prize winner, half-length portrait, seated at desk, facing left, smoking cigarette',
            link: 'https://commons.wikimedia.org/wiki/File:Albert_Camus,_gagnant_de_prix_Nobel,_portrait_en_buste,_pos%C3%A9_au_bureau,_faisant_face_%C3%A0_gauche,_cigarette_de_tabagisme.jpg',
            author: {
                name: 'Riad Salih',
                link: 'https://commons.wikimedia.org/wiki/User:Riad_Salih'
            },
            license: {
                name: 'Public Domain',
                link: 'https://creativecommons.org/public-domain/'
            }
        },
        quote: 'When the soul suffers too much, it develops a taste for misfortune.',
        focus: 'Existentialism',
        description: 'Camus was a French philosopher, novelist, essayist, and playwright believed that life is absurd, and the only certainty of our futures is death. Therefore, he explored the idea of finding happiness not in the uncertain future formed by hope but in the present.',
        writings: [
            "L'Étranger (1942; The Stranger)",
            'La Peste (1947; The Plague)',
            'La Chute (1956; The Fall)',
        ],
        funFact: 'Received the 1957 Nobel Prize for Literature.'
    },
    foucault: {
        quizLetter: 'C',
        name: 'Michel Foucault',
        time: '(1926-1984)',
        image: {
            path: 'images/foucault.jpg',
            caption: 'Michel Foucault 1974 Brasil',
            link: 'https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Brazil',
            author: {
                name: 'Jonnmann',
                link: 'https://commons.wikimedia.org/wiki/User:Jonnmann'
            },
            license: {
                name: 'Public Domain of Brazil',
                link: 'https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Brazil'
            }
        },
        quote: 'There are forms of oppression and domination which become invisible - the new normal',
        focus: 'Power and Knowledge-Societal Establishments\ni.e. the belif that education, judiciary, politics, science/medicine, entertainment (pop culture, social media, etc.), etc.) dictate/control one&apos;s identity.',
        description: 'Foucault was a French philosopher, writer, political activist, and literary critic who explored the idea of "normal" as expressions of power, control, and oppression. He viewed what is normal in society to be instituted by the powerful in a criteria best suited to their interest, solidifying and expanding their authority.',
        writings: [
            'The History of Madness (1961)',
            'The Birth of the Clinic (1963)',
            'The Order of Things (1966)'
        ],
        funFact: 'Besides having an interest in philosophy, he also was interested in psychology and therefore earned a Degree in Psychology from the University of Paris.'
    },
}

/* HTML (index.html) Element Variables */
const submitBtn = document.getElementById('submitBtn'); // submit button for quiz
const resultBox = document.getElementById('resultSection');  // section for result information
const nameVar = document.getElementById('nameText');    // span for name
const timeVar = document.getElementById('timeText');    // span for time
const imageVar = document.getElementById('faceImage');  // img for image of philosopher (and caption)
const imageTitleVar = document.getElementById('imageTitle');  // a for image caption and link
const imageAuthorVar = document.getElementById('imageAuthor');     // a for image author
const imageLicenseVar = document.getElementById('imageLicense');   // a for image license
const quoteVar = document.getElementById('quoteText');  // span for quote
const focusVar = document.getElementById('focusText');  // span for focus
const descriptionVar = document.getElementById('descriptionText'); // h4 for description
const writingsBox = document.getElementById('writingsContainer');  // div for listing writings
const factVar = document.getElementById('factText');    // span for funFact

/* -- Quiz Variables and Functions -- */
/** User's Philosopher Personality Score JSON
    - descartes [number (int)] : the number of user answers that matched
                                 descartes' personality
    - camus [number (int)] : the number of user answers that matched camus'
                             personality
    - foucault [number (int)] : the number of user answers that matched
                                foucault's personality
*/
var userScore = {
    descartes: 0,
    camus: 0,
    foucault: 0,
};

/** Calculates userScore based on the user's quiz answers
    Returns the key name of the philosopher with the highest score
    In the case of a tie, the philosopher that is first iterated in the second
    for loop (descartes -> camus -> foucault) is returned
    Pre : all quiz questions are answered
    Post : the elements/values of userScore are incremented appropriately
*/
function calculateScore() {
    // calculating score
    try {
        for(let i = 1; i <= 10; i++) {
            let userAnswer = document.querySelector(`input[name="q${i}"]:checked`).value;
            userScore[userAnswer] += 1;
        }
    }
    catch (TypeError) {   // catches null/undefined responses
        alert('Please answer all of the questions.');
    }

    // determining philosopher with the highest score
    let philosopher = '';
    let maxScore = 0;
    for(const philKey in userScore) {
        if(maxScore < userScore[philKey]) {
            philosopher = philKey.toString();
            maxScore = userScore[philKey];
        }
    }
    return philosopher;
}

/** Appropriately fills result section with information about the philosopher
    with a personality most akin to the user's personality
    Utlizes Function(s)... calculateScore
    Pre : all quiz questions are answered
    Post : the content (innerHTML) of related HTML elements hold appropriate
           information about the philosopher returned by calculateScore
 */
function addInformation() {
    const philosopher = calculateScore();

    // Defining content of HTML elements
    let info = philInfo[philosopher];
    nameVar.innerHTML = info.name;      // name info
    timeVar.innerHTML = info.time;      // time info
    quoteVar.innerHTML = info.quote;    // quote info
    focusVar.innerHTML = info.focus;    // focus info
    descriptionVar.innerHTML = info.description; // description info
    factVar.innerHTML = info.funFact;   // fun fact info

    imageVar.setAttribute('src', info.image.path);    // image info
    imageVar.setAttribute('alt', info.image.caption);
    imageTitleVar.innerHTML = info.image.caption;
    imageTitleVar.setAttribute('href', info.image.link);
    imageAuthorVar.innerHTML = info.image.author.name;
    imageAuthorVar.setAttribute('href' ,info.image.author.link);
    imageLicenseVar.innerHTML = info.image.license.name;
    imageLicenseVar.setAttribute('href', info.image.license.link);
    
    const writingsList = info.writings; // writings info
    for(let i = 0; i < writingsList.length; i++) {
        let iElement = document.createElement('i');
        iElement.innerHTML = writingsList[i];
        writingsBox.appendChild(iElement);
    }
}

// Displays results to the user
// Utilizes Function(s)... addInformation
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();  // prevent page refresh

    // reset userScore
    for(philKey in userScore) {
        userScore[philKey] = 0;
    }

    addInformation();

    // Adjusting display styles and scrolling result section into view
    resultSection.style.display = "block";
    submitBtn.style.display = "none";
    resultSection.scrollIntoView();
});
