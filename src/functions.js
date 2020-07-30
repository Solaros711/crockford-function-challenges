add = (arg1, arg2) => {
    return arg1 + arg2
}

sub = (arg1, arg2) => {
    return arg1 - arg2
}

mul = (arg1, arg2) => {
    return arg1 * arg2
}

identity = (arg1) => {
    return arg1
}

identityf = (arg1) => {
    return function(){return arg1}
}

addf = (arg1) => {
    var funcFirst = function doMath(param){
        return arg1 + param
    }
    return funcFirst
}

liftf = (func) => {
    var funcFirst = function doFirst(param1){
        var funcSec = function doSecond(param2){
            return func(param1, param2)
        }
        return funcSec
    }
    return funcFirst
}

curry = (func, arg1) => {
    var funcFirst = function doMath(param1){
        return func(arg1, param1)
    }
    return funcFirst
}

twice = (func) => {
    var funcFirst = function doMath(param1){
        return func(param1, param1)
    }
    return funcFirst
}

reverse = (func) => {
    var funcFirst = function doMath(param1, param2){
        return func(param2, param1)
    }
    return funcFirst
}

composeu = (func1, func2) => {
    var funcFirst = function doFirst(param){
        return func2(func1(param))
    }
    return funcFirst
}

composeb = (func1, func2) => {
    var funcFirst = function doMath(param1, param2, param3){
        return func2(func1(param1, param2,), param3)
    }
    return funcFirst
}

limit = (func, n) => {
    var funcFirst = function doMath(param1, param2){
        if(n != 0){
            n -= 1
            return func(param1, param2)
        }else{
            return undefined
        }
    }
    return funcFirst
}

from = (n) => {
    var val = n
    var funcFirst = function doMath(){
        return val++
    }
    return funcFirst
}

to = (func, n) => {
    var funcFirst = function doMath(){
        var val = func()
        if(val < n){
            return val
        }else{
            return undefined
        }
    }
    return funcFirst
}

fromTo = (low, high) => {
    var funcFirst = function doMath(){
        if(low < high){
            return low++
        }else{
            return undefined
        }
    }
    return funcFirst
    // return to(from(low), high)
}

element = (array, func) => {
    var val = 0
    var funcFirst = function doMath(){
        if(!func){
            return array[val++]
        }else{
            return array[func()]
        }
    }
    return funcFirst
}

collect = (func, array) => {
    var funcFirst = function doMath(){
        val = func()
        if(val != undefined){
            array.push(val)
        }
        return val
    }
    return funcFirst
}

filter = (gen, func) => {
    var funcFirst = function doMath(){
        var val = 0
        while(true){
            val = gen()
            if(val == undefined || func(val)){
                break
            }
        }
        return val
    }
    return funcFirst
}

concat = (gen1, gen2) => {
    var funcFirst = function doMath(){
        var set1 = true
        var val = 0
        if(set1){
            val = gen1()
            if(val === undefined){
                set1 = false
                val = gen2()
            }
        }else{
            val = gen2()
        }
        return val
    }
    return funcFirst
}

repeat = (gen) => {
    val = 0
    while(true){
        val = gen()
        if(val === undefined){
            return val
        }
    }
}

gensymf = (s) => {
    let val = 0
    var funcFirst = function doMath(){
        val++
        sym = s + val
        return sym
    }
    return funcFirst
}

counter = (n) => {
    var up = function countUp(){
        n += 1
        return n
    }
    var down = function countDown(){
        n -= 1
        return n
    }
    return {up: up, down: down}
}

revocable = (func) => {
    var check = true
    var revoke = function revoke(){
        check = false
    }
    var funcFirst = function doMath(...args){
        if(check){
            return func(...args)
        }
    }
    return {invoke: funcFirst, revoke: revoke}
}

m = (value, source) => {
    if(source){
        return {value: value, source: String(source)}
    }else{
        return {value: value, source: String(value)}
    }
}

addm = (obj1, obj2) => {
    return {value: obj1.value + obj2.value, source: `(${obj1.source}+${obj2.source})`}
}

liftm = (func, op) => {
    var funcFirst = function doMath(param1, param2){
        return {value: func(param1.value, param2.value), source: `(${param1.source}${op}${param2.source})`}
    }
    return funcFirst
}

exp = (array) => {
    var new_array = array
    var val = 0
    for(let i = 0; i < new_array.length; i++){
        if(typeof(new_array[i]) === "object"){
            new_array[i] = exp(new_array[i])
        }
    }
    if(new_array.length === 2){
        val = new_array[0](new_array[1])
    }else{
        val = new_array[0](new_array[1], new_array[2])
    }
    return val
}

addg = () => {

}