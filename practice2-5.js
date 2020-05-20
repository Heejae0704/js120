function createInvoice(services) {
  let phone, internet;
  if (!services || (!services.phone && services.phone !== 0)) {
    phone = 3000;
  } else phone = services.phone;
  if (!services || (!services.internet && services.internet !== 0)) {
    internet = 5500;
  } else internet = services.internet;

  return {
    phone: phone,
    internet: internet,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      payments.forEach((payment) => this.payments.push(payment));
    },

    amountDue() {
      let totalPayments = this.payments.reduce((accu, curr) => {
        return accu + curr.total();
      }, 0);

      return this.total() - totalPayments;
    },
  };
}

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,

    total() {
      return this.amount || this.phone + this.internet;
    },
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue()); // this should return 0
