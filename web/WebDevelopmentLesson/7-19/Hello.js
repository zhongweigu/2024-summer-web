function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

const fibonacci = n => {
    let a = 0, b = 1, c = 0;
    for ( let i = 2; i <= n; i++){
        c = a + b;
        a = b;
        b = c;
    }
    return c;
}

console.log(isLeapYear(2020)); // true
console.log(fibonacci(10)); // 55