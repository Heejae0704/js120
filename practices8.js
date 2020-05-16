// eslint-disable-next-line max-lines-per-function
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    notes: {},

    info() {
      console.log(`${this.name} is a ${this.year} student`);
    },

    listCourses() {
      console.log(this.courses);
    },

    addCourse(courseObj) {
      this.courses.push(courseObj);
    },
  };
}

const school = {
  students: [],

  addStudent(name, year) {
    const VALID_YEARS = ["1st", "2nd", "3rd", "4th", "5th"];
    if (VALID_YEARS.includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
    } else {
      console.log("Invalid Year");
    }
  },

  findStudent(studentName) {
    const foundStudent = this.students.find(
      (studentObj) => studentObj.name === studentName
    );
    return foundStudent;
  },

  enrollStudent(studentName, courseObj) {
    const student = this.findStudent(studentName);
    student.addCourse(courseObj);
  },

  addGrade(studentName, courseCode, grade) {
    const student = this.findStudent(studentName);
    const course = student.courses.find((course) => course.code === courseCode);
    course.grade = grade;
  },

  getReportCard(studentName) {
    const student = this.findStudent(studentName);
    student.courses.forEach((course) => {
      console.log(
        `${course.name}: ${course.grade ? course.grade : "In progress"}`
      );
    });
  },

  courseReport(courseName) {
    const courseGrades = [];
    console.log(`=${courseName} Grades=`);
    this.students.forEach((student) => {
      student.courses.forEach((course) => {
        if (course.name === courseName) {
          courseGrades.push(course.grade);
          console.log(`${student.name}: ${course.grade}`);
        }
      });
    });
    if (courseGrades.length === 0) return undefined;
    console.log("---");
    console.log(
      `Course Average: ${
        courseGrades.reduce((accu, curr) => accu + curr, 0) /
        courseGrades.length
      }`
    );
  },
};

school.addStudent("foo", "3rd");
school.addStudent("bar", "1st");
school.addStudent("qux", "2nd");
school.enrollStudent("foo", { name: "Math", code: 101, grade: 95 });
school.enrollStudent("foo", { name: "Advanced Math", code: 102, grade: 90 });
school.enrollStudent("foo", { name: "Physics", code: 202 });
school.enrollStudent("bar", { name: "Math", code: 101, grade: 91 });
school.enrollStudent("qux", { name: "Math", code: 101, grade: 93 });
school.enrollStudent("qux", { name: "Advanced Math", code: 102, grade: 90 });

school.getReportCard("foo");
school.courseReport("Math");
school.courseReport("Advanced Math");
school.courseReport("Physics");
