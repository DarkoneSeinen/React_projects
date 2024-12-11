const sum = (p1, p2) => { // arrow function, retorn implicito
    console.log (p1) 
    console.log (p2) 
    return p1 + p2 
} 


const result = sum(1, 5) // 6, almacena en result,
console.log (result)

const square = p => {
    console.log(p)
    return p * p
}

//const square = p => p * p

function product(a, b) {
    return a * b
}
  
const result1 = product(2, 6)
  // result ahora es 12