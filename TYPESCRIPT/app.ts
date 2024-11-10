// // 변수의 데이터 타입 명시
// let stdId: number = 1111;
// let stdName: string = "lee";
// let age: number = 20;
// let gender: string = "male";
// let course: string = "Typescript";
// let completed: boolean = false;

// // 열거형 : 사용자 정의 타입
// enum GenderType {
//     Male = "male",
//     Female = "female",
// }

// interface Student {
//     stdId: number;
//     stdName?: string;
//     age?: number;
//     gender?: `male` | `female`;
//     course?: string;
//     completed?: boolean;
//     // setName(name: string): void;
//     setName?: (name: string) => void;
//     getName?: () => string;
// }

// class MyStudent implements Student {
//     stdId = 2222;
//     stdName = "choi";
//     age = 20;
//     gender: `male` | `female` = "male";
//     course = "Typescript";
//     completed = false;

//     setName(name: string): void {
//         this.stdName = name;
//         console.log(`Name changed to ${this.stdName}`);
//     }
// }

// const myInstance = new MyStudent();
// myInstance.setName("Alice");

// function getInfo(id: number): Student {
//     return {
//         stdId: id,
//         stdName: "Jang",
//         age: 26,
//         gender: "female",
//         course: "Typescript",
//         completed: false,
//     };
// }

// let std = {
//     stdId: 2222,
//     stdName: "choi",
//     age: 20,
//     gender: "male",
//     course: "Typescript",
//     completed: false,
// };
// function setInfo(student: Student): void {
//     console.log(student);
// }

// setInfo(std);

// console.log(getInfo(1424));

// 함수의 데이터 타입 명시(매개변수, return type)
// 리턴 값이 없을 경우 : void
// function addNumbers(a: number, b: number): number {
//     return a + b;
// }

// let anyVal: any = 100;
// anyVal = "hello";

// let numbers: number[] = [1, 2, 3, 4, 5];

// let fruits: string[] = ["apple", "banana", "orange"];

// for (let i = 0; i < fruits.length; i++) {
//     console.log(fruits[i]);
// }

// let mixedArray: (number | string)[] = [1, "apple", 2, "banana"];

// for (let i = 0; i < mixedArray.length; i++) {
//     console.log(mixedArray[i]);
// }

// let infer = [1, 2, 3]; // 타입 추론

// for (let i = 0; i < infer.length; i++) {
//     console.log(infer[i]);
// }

// let readOnlyArray: ReadonlyArray<number> = [1, 2, 3]; // 읽기 전용 배열

// Tuple Type : 정해진 타입 순서를 따르는 배열
// let greeting: [number, string, boolean] = [1, "hello", true];

// for (let i = 0; i < greeting.length; i++) {
//     console.log(greeting[i]);
// }

// Spread Operator : ...
let firstArray = [1, 2, 3];
let secondArray = [4, 5, 6];

let combineArray = [...firstArray, ...secondArray]; // [1, 2, 3, 4, 5, 6]

for (let i = 0; i < combineArray.length; i++) {
    console.log(combineArray[i]);
}
