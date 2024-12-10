const x = 1 // no se puede cambiar
let y = 5 // define una variable normal

console.log(x, y)   // se imprime 1, 5
y += 10
console.log(x, y)   // se imprime 1, 15
y = 'sometext'
console.log(x, y)   // se imprime 1, sometext
//x = 4               // provoca un error