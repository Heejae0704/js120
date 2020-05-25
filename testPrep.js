class Employee {
  constructor(name, serialNumber, isFulltime) {
    this.name = name;
    this.serialNumber = serialNumber;
    this.isFulltime = isFulltime;
  }
}

class FullTime extends Employee {
  constructor(name, serialNumber) {
    super(name, serialNumber, true);
  }
  takeVacation(days) {
    this.vacation -= days;
    // indicate the leave dates in the calendar etc etc
  }
}

class Regular extends FullTime {
  constructor(name, serialNumber) {
    super(name, serialNumber);
    this.vacation = 10;
    this.location = "cubicle farm";
  }
}

class Manager extends FullTime {
  constructor(name, serialNumber) {
    super(name, serialNumber);
    this.vacation = 14;
    this.location = "regular private office";
  }

  delegate(work) {
    // manager can delegate work to designated delegate
  }
}

class Executive extends Manager {
  constructor(name, serialNumber) {
    super(name, serialNumber);
    this.vacation = 20;
    this.location = "corner office";
  }

  hire(employee) {
    // create new employee in the system
  }

  fire(employee) {
    // delete the employee in the system
  }
}

class PartTime extends Employee {
  constructor(name, serialNumber) {
    super(name, serialNumber, false);
    this.location = "open workspace";
  }
}
