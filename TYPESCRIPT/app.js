// 변수의 데이터 타입 명시
var stdId = 1111;
var stdName = "lee";
var age = 20;
var gender = "male";
var course = "Typescript";
var completed = false;
// 열거형 : 사용자 정의 타입
var GenderType;
(function (GenderType) {
    GenderType["Male"] = "male";
    GenderType["Female"] = "female";
})(GenderType || (GenderType = {}));
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 2222;
        this.stdName = "choi";
        this.age = 20;
        this.gender = GenderType.Male;
        this.course = "Typescript";
        this.completed = false;
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log("Name changed to ".concat(this.stdName));
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName("Alice");
function getInfo(id) {
    return {
        stdId: id,
        stdName: "Jang",
        age: 26,
        gender: GenderType.Female,
        course: "Typescript",
        completed: false,
    };
}
var std = {
    stdId: 2222,
    stdName: "choi",
    age: 20,
    gender: GenderType.Male,
    course: "Typescript",
    completed: false,
};
function setInfo(student) {
    console.log(student);
}
// setInfo(std);
// console.log(getInfo(1424));
// 함수의 데이터 타입 명시(매개변수, return type)
// 리턴 값이 없을 경우 : void
function addNumbers(a, b) {
    return a + b;
}
