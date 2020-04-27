function createBook(title, author, read=false) {
  return {
    title,
    author,
    read,

    getDescription() {
      const readStr = this.read ? "I have read it." : "I haven't read it";
      return `${this.title} was written by ${this.author}. ${readStr}`
    },

    readBook() {
      this.read = true;
    }
  }
}

const book1 = createBook("Mythos", "Stephen Fry");
const book2 = createBook("Me talk Pretty One Day", "David Sedaris");
const book3 = createBook("Aunts aren't Gentlemen", "PG Wodehouse");

book1.readBook();

console.log(book1.getDescription());
console.log(book2.getDescription());
console.log(book3.getDescription());