const t = [1, -1, 3] // define un arreglo

t.push(5) // agrega un elemento al final

console.log(t.length) // se imprime 4 porque se agrega un elemento al final quedando 4 elementos
console.log(t[1])     // se imprime -1

t.forEach(value => {
  console.log(value)  // se imprimen los números 1, -1, 3, 5 cada uno en su propia línea
})                    

value => {
    console.log(value)
}

/////
const t1 = [1, -1, 3] // define un arreglo

const t2 = t1.concat(5) // crea un nuevo array que contiene los elementos de t1 y 5

console.log(t1)  // se imprime [1, -1, 3]
console.log(t2) // se imprime [1, -1, 3, 5]

////
const t3 = [1, 2, 3]

const m1 = t3.map(value => value * 2) // crea un nuevo array que contiene los elementos del array t3 multiplicados por 2
console.log(m1) // se imprime [2, 4, 6]