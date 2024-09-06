// 테스트 배열 선언
const arr = [1, 2, 3, 4, 5];

// 객체 (또는 배열)에 요소를 하나 꺼낸 다음 매개변수로 그 요소를 전달하여 호출되는 콜백함수.
const forEachArr = arr.forEach(function (a, b, c) {
    // function (데이터, 인덱스, 객체 전체)
    // console.log(`a : ${a}, b : ${b}, c : ${c}`);
    return a * 2;
});
console.log(arr);

const mapArr = arr.map((a, b, c) => {
    // function (데이터, 인덱스, 객체 전체)
    // console.log(`a : ${a}, b : ${b}, c : ${c}`);
    return a * 2;
});
console.log(arr);

console.log(`forEachArr : ${forEachArr}`);
console.log(`mapArr : ${mapArr}`);
// forEachArr : undefined
// mapArr : 2,4,6,8,10
