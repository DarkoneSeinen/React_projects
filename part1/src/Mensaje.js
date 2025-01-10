const Mensaje =(paraps) => { // deben ser parámetros, para que sean reutilizables
    return <h1 style ={{color : paraps.color }}>
        {paraps.message}</h1>
}

export default Mensaje;