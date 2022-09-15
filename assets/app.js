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
        id: Math.floor(Math.random() * 905),
    },
    {
        id: Math.floor(Math.random() * 905),

    },
    {
        id: Math.floor(Math.random() * 905),
    },
    {
        id: Math.floor(Math.random() * 905),
    },
    {
        id: Math.floor(Math.random() * 905),
    },
    {
        id: Math.floor(Math.random() * 905),
    },
    {
        id: Math.floor(Math.random() * 905),
    },
    {
        id: Math.floor(Math.random() * 905),
    },
]

function crearBloques() {
    const newMemoCards = fetchPokemon(memoCards)

    console.log(newMemoCards)

    const row = document.createElement('div')
    row.classList.add('row');
    
    const clonMemoCard = [...newMemoCards];
    
    const memorice = [...newMemoCards, ...clonMemoCard];

    // console.log(memorice)
    
    randomizeMemoriceArr(memorice)
    // console.log(memorice)

    setTimeout(() => {        
        memorice.forEach((card) => {
            // console.log(card)
    
            const cardDiv = document.createElement('div');
            cardDiv.dataset.id = card.id;
    
            const cardImg = document.createElement('img');
            cardImg.src = card.src;
            cardDiv.classList.add('card', 'memocard');
            cardDiv.appendChild(cardImg);
            row.appendChild(cardDiv);
    
            mainContainer.appendChild(row)
            const arrayCards = document.querySelectorAll('.memocard');
            selectCard(arrayCards)
        })
    }, 700)




}

const cardArrMemo = []

const cardObj = {

}

let cardUno = 0 ;
let cardDos = 0 ;

function selectCard(arr) {

    // console.log(arr)
    
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

function fetchPokemon(arr) {
    // 905
    const url = ("https://pokeapi.co/api/v2/pokemon/")
    
    for(let i = 0; i < arr.length; i++){ 
        const card = arr[i];
        const { id } = card;
        

        fetch(`${url}${id}`)
            .then(resp => resp.json())
            .then(data => {
            card.src = data.sprites.other['official-artwork'].front_default;
        })
    }

    const newArray = [...arr];

    return newArray;
}