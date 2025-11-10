/*SOMMA NUMERI*/

function sum(a, b){
    return a + b
}

const total = sum(21, 23)
console.log(total)

/*PARI/DISPARI*/

function isPari(num){
    if(num % 2 === 0){
        return true
    }
    else{
        return false
    }
}

const numero = 44
console.log(isPari(numero))


/*+4 lettere*/
const array = ["Anna", "Giovanni", "Luca", "Maria"]

const newArray = array.filter((e) => e.length > 4)
console.log(newArray)

/*Somma in un array*/

const numbers = [1,2,3,4,5,6,7,8]

function Sum(arr){
let count = 0
for(let i = 0; i < arr.length; i++){
 count += arr[i];
}
return count
}

console.log(Sum(numbers))


/*Conta vocali */

function contaVocali(str){
    const vocali = "aeiou"
    let count = 0
    for(let i = 0; i < str.length; i++){
        const lettera = str[i].toLowerCase()
        if(vocali.includes(lettera)){
            count++;
        }
    }
    return count
}

console.log(contaVocali("aiuola"))




/*Operazioni con array di oggetti */

const utenti = [
  { nome: "Anna", eta: 25 },
  { nome: "Marco", eta: 31 },
  { nome: "Giulia", eta: 17 },
];

for(let i = 0; i < utenti.length; i++){
    if(utenti[i].eta > 18){
        console.log(utenti[i].nome)
    }
}


const somma = utenti.reduce((acc, curr) => {
    return acc + curr.eta
}, 0)

const media = somma / utenti.length

console.log(media)


/*trova utente con nome*/

function searchUser (str){
const user = utenti.find((u) => u.nome.toLowerCase().includes(str.toLowerCase().trim()))

if(user){
    console.log(user)
}else{
    console.log("Nessun risultato trovato")
}
}


/*ordina per nome crescente*/

utenti.sort((a,b) => {
    return a.nome.localeCompare(b.nome)
})
console.log(utenti)



/*dato un array di numeri, uno nuovo con i quadrati*/

const numeri = [1,2,3,4,5,6,7,8]

const double = numeri.map((n) => n*n)

console.log(double)



/*simulare chiamata API*/

async function getUser(){
    const myobj = { id: 1, name: "Mario Rossi" }
   
    return new Promise((resolve, reject) => {
        setTimeout(() => {
         resolve(myobj)
        }, 2000)
    })
}


/*

(async () => {
const user = await getUser()
console.log(user)
})();
la richiamo nel codice sottostante */


/*simulare chiamata API con Promise*/

async function fetchUsers(){
    const users = [
  { id: 1, nome: "Mario" },
  { id: 2, nome: "Luisa" },
  { id: 3, nome: "Carlo" }
]

return new Promise ((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random()
        if(success > 0.5){
            resolve(users)
        }else{
            reject("Errore nel fetch degli utenti!")
        }
        console.log(success)
    }, 3000)
})
}



/*la richiamo nel codice sottostante */
(async () => {
    try{
        
        console.log("Eseguo fetch...")
        const myUsers = await fetchUsers()
        console.log("Utenti arrivati...")
        console.log(myUsers)
    }catch(error){
        console.error(error)
    }
})();




/*Chiamata fetch reale + stampa dei nomi dei primi 3 utenti */

async function fetchRealUsers(){
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/users')

        if(!res.ok){
            throw new Error("Errore nella risposta durate il fetch")
        }

        const data = await res.json()
        
        const first3Names = data.slice(0,3).map((d) => d.name)
        return first3Names

    }catch(error){
        console.error(error)
    }
}

(async () => {
console.log("Attendo il fetch")
const first3Users = await fetchRealUsers()
console.log("I PRIMI 3 UTENTI ARRIVATI")
console.log(first3Users)
})();


/*differenza tra join e split */

const stringArray = ["ciao", "come", "stai"]
const diventaStringa = stringArray.join(" ")
console.log(diventaStringa)
const arraySlice = stringArray.slice(0,1)
console.log(arraySlice)



const stringa = "ciao come stai"
const diventaArray = stringa.split(" ")
diventaArray.splice(1, 1)
console.log(diventaArray)


/*map */
const nomi = ["Anna", "Giovanni", "Luca", "Maria"];
const lengths = nomi.map((n) => n.length)
console.log(lengths)

/*filter solo nomi +4 lettere*/
const utentiFilter = [
  { nome: "Anna", eta: 25 },
  { nome: "Marco", eta: 17 },
  { nome: "Giulia", eta: 20 }
];
const utenti4letters = utentiFilter.filter((u) => u.nome.length > 4)
console.log(utenti4letters)

/*some o every*/

const numeriDaVerificare = [3, 8, 12, 5];

console.log(numeriDaVerificare.some((n) => n > 10)) //true
console.log(numeriDaVerificare.every((n) => n > 10)) //false