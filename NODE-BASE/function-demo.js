function add1(x, y) {
    return x + y;
}

let add2 = function (x, y) {
    return x + y;
};

// 화살표 함수
const add3 = (x, y) => {
    return x + y;
};

var add4 = (x, y) => x + y;

console.log(add1(1, 2), add2(1, 2), add3(1, 2), add4(1, 2));
