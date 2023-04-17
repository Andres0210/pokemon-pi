const validator = (pokemon) => {
    const error = {
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
    }

    const regexNumbersInName = /^[^0-9]+$/;
    const regexOnlyNumbers = /^[0-9]+$/;

    if (!pokemon.name) {
        error.name = 'debe ingresar un nombre';
    } else if (!regexNumbersInName.test(pokemon.name)) {
        error.name = 'el nombre ingresado no debe contener números'
    } else if (pokemon.name.length > 20) {
        error.name = 'el nombre no debe tener más de 20 caracteres'
    }

    if (!pokemon.hp) {
        error.hp = 'debe ingresar los puntos de vida';
    } else if (pokemon.hp > 255) {
        error.hp = 'los puntos de vida no deben ser mayor a 255';
    } else if (!regexOnlyNumbers.test(pokemon.hp)) {
        error.hp = 'el valor ingresado debe ser un numero'
    }

    if (!pokemon.attack) {
        error.attack = 'debe ingresar los puntos de ataque';
    } else if (pokemon.attack > 255) {
        error.attack = 'los puntos de ataque no deben ser mayor a 255';
    } else if (!regexOnlyNumbers.test(pokemon.attack)) {
        error.attack = 'el valor ingresado debe ser un numero'
    }

    if (!pokemon.defense) {
        error.defense = 'debe ingresar los puntos de defensa';
    } else if (pokemon.defense > 255) {
        error.defense = 'los puntos de defensa no deben ser mayor a 255';
    } else if (!regexOnlyNumbers.test(pokemon.defense)) {
        error.defense = 'el valor ingresado debe ser un numero'
    }


    if (pokemon.speed > 255) {
        error.speed = 'los puntos de velocidad no deben ser mayor a 255';
    } else if (!regexOnlyNumbers.test(pokemon.speed)) {
        error.speed = 'el valor ingresado debe ser un numero'
    }

    if (!pokemon.image) {
        error.image = 'debe ingresar una dirección de imagen';
    }
    return error;
}

export default validator;