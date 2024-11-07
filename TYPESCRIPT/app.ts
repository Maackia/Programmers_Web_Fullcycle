// 변수의 데이터 타입 명시
let stdId: number = 1111;
let stdName: string = "lee";
let age: number = 20;
let gender: string = "male";
let course: string = "Typescript";
let completed: boolean = false;

// 열거형 : 사용자 정의 타입
enum GenderType {
    Male = "male",
    Female = "female",
}

interface Student {
    stdId: number;
    stdName?: string;
    age?: number;
    gender?: GenderType;
    course?: string;
    completed?: boolean;
    // setName(name: string): void;
    setName?: (name: string) => void;
    getName?: () => string;
}

class MyStudent implements Student {
    stdId = 2222;
    stdName = "choi";
    age = 20;
    gender = GenderType.Male;
    course = "Typescript";
    completed = false;

    setName(name: string): void {
        this.stdName = name;
        console.log(`Name changed to ${this.stdName}`);
    }
}

const myInstance = new MyStudent();
myInstance.setName("Alice");

function getInfo(id: number): Student {
    return {
        stdId: id,
        stdName: "Jang",
        age: 26,
        gender: GenderType.Female,
        course: "Typescript",
        completed: false,
    };
}

let std = {
    stdId: 2222,
    stdName: "choi",
    age: 20,
    gender: GenderType.Male,
    course: "Typescript",
    completed: false,
};
function setInfo(student: Student): void {
    console.log(student);
}

// setInfo(std);

// console.log(getInfo(1424));

// 함수의 데이터 타입 명시(매개변수, return type)
// 리턴 값이 없을 경우 : void
function addNumbers(a: number, b: number): number {
    return a + b;
}
