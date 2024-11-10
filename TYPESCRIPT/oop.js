var Employee = /** @class */ (function () {
    function Employee(_empName, _empAge, _empJob) {
        var _this = this;
        this._empName = _empName;
        this._empAge = _empAge;
        this._empJob = _empJob;
        this.printEmp = function () {
            console.log("Name: ".concat(_this._empName, ", Age: ").concat(_this._empAge, ", Job: ").concat(_this._empJob));
        };
    }
    Object.defineProperty(Employee.prototype, "empName", {
        // getters and setters
        get: function () {
            return this._empName;
        },
        set: function (value) {
            this._empName = value;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee1 = new Employee("John Doe", 30, "Software Engineer");
employee1.empName = "lee";
employee1.printEmp(); // Output: Name: Lee, Age: 30, Job: Software Engineer
