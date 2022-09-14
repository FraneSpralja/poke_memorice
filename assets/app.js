const mainContainer = document.getElementById('main_container');

eventListener()

function eventListener() {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Funciona...')
        crearBloques()
    })
}

let parCard = []

const memoCards = [
    {
        id: 1,
        contenido: 'A',
    },
    {
        id: 2,
        contenido: 'B',
    },
    {
        id: 3,
        contenido: 'C',
    },
    {
        id: 4,
        contenido: 'D',
    },
    {
        id: 5,
        contenido: 'F',
    },
    {
        id: 6,
        contenido: 'G',
    },
    {
        id: 7,
        contenido: 'H',
    },
    {
        id: 8,
        contenido: 'I',
    },
]

function crearBloques() {
    const row = document.createElement('div')
    row.classList.add('row');

    fetchPokemon()
    
    const clonMemoCard = [...memoCards];
    
    const memorice = [...memoCards, ...clonMemoCard];
    
    randomizeMemoriceArr(memorice)
    
    memorice.forEach((card) => {
        const cardDiv = document.createElement('div');
        cardDiv.dataset.id = card.id;
        cardDiv.textContent = card.contenido;
        cardDiv.classList.add('card', 'memocard');

        row.appendChild(cardDiv);

    })
    mainContainer.appendChild(row)

    const arrayCards = document.querySelectorAll('.memocard');

    selectCard(arrayCards)
}

const cardArrMemo = []

const cardObj = {

}

let cardUno = 0 ;
let cardDos = 0 ;

function selectCard(arr) {
    
    arr.forEach((card) => {
        card.onclick = function() {
            if(cardUno === 0) {
                cardUno = parseInt(card.dataset.id)
                cardDos = 0;
                
                card.classList.add('click', 'card-uno')

            }else if(cardUno > 0 && cardDos == 0) {
                cardDos = parseInt(card.dataset.id)
        
                card.classList.add('click', 'card-dos')

                setTimeout(() => {
                    if(cardUno === cardDos) {
                        console.log('MAAATCHHH')
    
                        document.querySelector('.card-uno').classList.add('match')
                        document.querySelector('.card-dos').classList.add('match')
    
                        arr.forEach(click => {
                            click.classList.remove('click', 'card-uno', 'card-dos')                
                        })
                    cardUno = 0;
                    cardDos = 0;
                    terminarLaPartida(arr)
                    } else {
                        arr.forEach(click => {
                            click.classList.remove('click', 'card-uno', 'card-dos')
                        })
                        cardUno = 0;
                        cardDos = 0;
                    }
                }, 1500)
            }
        }
    })

}

function terminarLaPartida(arr) {
    const arrayMatch = document.querySelectorAll('.match');

    if(arr.length === arrayMatch.length) {
        mensaje('Ganaste, la partida a terminado', 'win')
    }
}

function randomizeMemoriceArr(arr) {
    arr.sort(() => .5 - Math.random())
}

function mensaje(mensaje, tipo) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('mensajeDiv');

    const parrafoMensaje = document.createElement('p');
    parrafoMensaje.classList.add('mensaje', tipo);
    parrafoMensaje.textContent = mensaje;

    const buttonClose = document.createElement('button');
    buttonClose.classList.add('btn-close');
    buttonClose.textContent = 'Reiniciar'
    buttonClose.onclick = function() {
        location.reload()
    }

    mensajeDiv.appendChild(parrafoMensaje);
    mensajeDiv.appendChild(buttonClose)

    modal.appendChild(mensajeDiv);

    mainContainer.appendChild(modal);
}

function fetchPokemon() {
    console.log('Desde fetch Pokemon')
}