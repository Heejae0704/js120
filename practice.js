function createBook(title, author) {
  return {
    title: title,
    author: author,
    read: false,

    getDescription() {
      console.log(
        `${this.title} was written by ${this.author}. I ${
          this.read ? "have" : "haven't"
        } read it.`
      );
    },

    readBook() {
      this.read = true;
    },
  };
}

let book1 = createBook("Mythos", "Stephen Fry");
let book2 = createBook("Me Talk Pretty One Day", "David Sedaris");
let book3 = createBook("Aunts aren't Gentlemen", "PG Wodehouse");

book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
book1.getDescription(); // Mythos was written by David Fry. I have read it.
book2.getDescription(); // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription(); // "Aunts aren't Gentlemen was written by PG Wodehouse"
