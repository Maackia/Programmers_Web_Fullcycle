class Employee {
    constructor(private _empName: string, private _empAge: number, private _empJob: string) {}

    // getters and setters
    get empName() {
        return this._empName;
    }

    set empName(value: string) {
        this._empName = value;
    }

    printEmp = (): void => {
        console.log(`Name: ${this._empName}, Age: ${this._empAge}, Job: ${this._empJob}`);
    };
}

let employee1 = new Employee("John Doe", 30, "Software Engineer");
employee1.empName = "lee";
employee1.printEmp(); // Output: Name: Lee, Age: 30, Job: Software Engineer
