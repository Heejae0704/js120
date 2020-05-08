function createInvoice(services) {

  const invoice = {
    payments: []
  };

  if (services && services.phone !== undefined) {
    invoice.phone = services.phone;
  } else {
    invoice.phone = 3000;
  }

  if (services && services.internet !== undefined) {
    invoice.internet = services.internet;
  } else {
    invoice.internet = 5500;
  }

  invoice.total = function() {
    return this.phone + this.internet;
  };

  invoice.addPayment = function(payment) {
    this.payments.push(payment);
  };

  invoice.addPayments = function(payments) {
    payments.forEach(payment => this.payments.push(payment));
  };

  invoice.amountDue = function() {
    const totalToPay = this.total();
    const paidTotal = this.payments.reduce((accu, curr) => {
      return accu + curr.total();
    },0);
    return totalToPay - paidTotal;
  }

  return invoice;
}

function createPayment(services) {
  // implement the factory function here
  const payment = {};

  if (services && services.amount !== undefined) {
    payment.amount = services.amount;
  }

  if (services && services.phone !== undefined) {
    payment.phone = services.phone;
  } else {payment.phone = 0}

  if (services && services.internet !== undefined) {
    payment.internet = services.internet;
  } else {payment.internet = 0}

  payment.total = function() {
    if (this.amount !== undefined) {
      return this.amount;
    } else {
      return this.phone + this.internet;
    }
  };
  return payment;
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());