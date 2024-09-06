// 테스트 배열 선언
const arr = [1, 2, 3, 4, 5];

// 객체 (또는 배열)에 요소를 하나 꺼낸 다음 매개변수로 그 요소를 전달하여 호출되는 콜백함수.
arr.forEach(function (a, b, c) {
    // function (데이터, 인덱스, 객체 전체)
    console.log(`a : ${a}, b : ${b}, c : ${c}`);
});

// Map & forEach
let map = new Map();
map.set(7, "seven");
map.set(9, "nine");
map.set(8, "eight");

map.forEach((a, b, c) => {
    // function (value, key, object)
    console.log(`a :${a} , b : ${b} , c : ${c}`);
});
