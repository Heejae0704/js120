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

    updateNote(code, note) {
      const courseName = this.courses.find((course) => course.code === code)
        .name;
      this.notes[code] = `${courseName}: ${note}`;
    },

    addNote(code, note) {
      if (this.notes[code]) {
        this.notes[code] = this.notes[code].concat(`; ${note}`);
      } else {
        this.updateNote(code, note);
      }
    },

    viewNotes() {
      Object.keys(this.notes).forEach((course) => {
        console.log(this.notes[course]);
      });
    },
  };
}

let foo = createStudent("Foo", "1st");
foo.info();
//'Foo is a 1st year student'
foo.listCourses();
//[];
foo.addCourse({ name: "Math", code: 101 });
foo.addCourse({ name: "Advanced Math", code: 102 });
foo.listCourses();
//[{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, "Fun course");
foo.addNote(101, "Remember to study for algebra");
foo.viewNotes();
//"Math: Fun Course; Remember to study for algebra"
foo.addNote(102, "Difficult subject");
foo.viewNotes();
//"Math: Fun Course; Remember to study for algebra"
//"Advance Math: Difficult Subject"
foo.updateNote(101, "Fun course");
foo.viewNotes();
//"Math: Fun Course"
//"Advance Math: Difficult Subject"
