class Banner {
  constructor(message) {
    this.message = message;
    this.messageLength = message.length;
    this.spaceLength = this.messageLength + 2;
  }

  static EDGE = "+";
  static HORIZONTAL_LINE = "-";
  static VERTICAL_LINE = "|";
  static SPACE = " ";

  displayBanner() {
    console.log(
      [
        this.horizontalRule(),
        this.emptyLine(),
        this.messageLine(),
        this.emptyLine(),
        this.horizontalRule(),
      ].join("\n")
    );
  }

  horizontalRule() {
    return (
      Banner.EDGE +
      Banner.HORIZONTAL_LINE.repeat(this.spaceLength) +
      Banner.EDGE
    );
  }

  emptyLine() {
    return (
      Banner.VERTICAL_LINE +
      Banner.SPACE.repeat(this.spaceLength) +
      Banner.VERTICAL_LINE
    );
  }

  messageLine() {
    return `| ${this.message} |`;
  }
}

let banner1 = new Banner("To boldly go where no one has gone before.");
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner("");
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+
