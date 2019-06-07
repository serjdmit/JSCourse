/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {
    if (array.length == 0 || !(array instanceof Array)) {
        throw 'empty array';
    } else if (typeof fn !== 'function') {
        throw 'fn is not a function';
    }

    var bool = 0;
    var i;
    for (i = 0; i < array.length; i++) {
        if ( fn(array[i]) === false) {
            bool++;
        }
    }

    if (bool > 0) {
        return false;
    } else {
        return true;
    }
}

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
    if (array.length == 0 || !(array instanceof Array)) {
        throw 'empty array';
    } else if (typeof fn !== 'function') {
        throw 'fn is not a function';
    }

    var bool = 0;
    var i;
    for (i = 0; i < array.length; i++) {
        if ( fn(array[i]) === true) {
            bool++;
        }
    }

    if (bool > 0) {
        return true;
    } else {
        return false;
    }
}

/*
 Задание 3:

 3.1: Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    if (typeof fn !== 'function') {
        throw 'fn is not a function';
    }

    var i;
    var array = [];

    for (i = 1; i < arguments.length; i++) {
        try {
            fn(arguments[i]);  
        } catch(e) {
            array.push(arguments[i]);
        }
    }

    return array;
}

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    var i;

    if ( typeof number != 'number' ) {
        throw "number is not a number";
    }
    
    function sum() {
        for (i = 0; i < arguments.length; i++) {
            number = number + arguments[i];
        }
        return number;
    }
    function dif() {
        for (i = 0; i < arguments.length; i++) {
            number = number - arguments[i];
        }
        return number;
    }
    function div() {
        for (i = 0; i < arguments.length; i++) {
            if (arguments[i] === 0) {
                throw "division by 0"
            }
            number = number / arguments[i];
        }
        return number;
    }
    function mul() {
        for (i = 0; i < arguments.length; i++) {
            number = number * arguments[i];
        }
        return number;
    }
    return {sum: sum, dif: dif, div: div, mul: mul}
}

/* При решении задач, пострайтесь использовать отладчик */

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
