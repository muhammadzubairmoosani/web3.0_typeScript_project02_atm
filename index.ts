import inquirer from "inquirer";

type InitialQuestions = {
  pin: number;
  account_type: string;
  transaction_type: string;
};

const questions = [
  {
    type: "password",
    name: "pin",
    message: "Enter your PIN code",
  },
  {
    type: "list",
    name: "account_type",
    message: "Please select your account type",
    choices: ["Savings", "Currrent"],
    when: (ans: any) => ans.pin,
  },
  {
    type: "list",
    name: "transaction_type",
    message: "Please select a transaction",
    choices: ["Fast Cash", "Cash Withdraw", "Balance Inquiry"],
    when: (ans: any) => ans.account_type,
  },
];

const doTransaction = (balance: number, amount: number) => {
  if (balance > amount) {
    console.log("\nPlease wait...\nyour transaction is in process\n");

    setTimeout(() => {
      console.log(
        `\nTransaction successful!\nYour current balance is: Rs.${
          balance - amount
        }\n=> Please take your card\n `
      );
    }, 3000);
  } else {
    console.log("Insuficient balance!");
  }
};

const initialQuestions: InitialQuestions = await inquirer.prompt(questions);

const { transaction_type, pin } = initialQuestions;

if (pin) {
  let amount = { withdrawal_amount: 0 };
  const balance = Math.floor(Math.random() * 1000000);

  if (transaction_type === "Fast Cash") {
    amount = await inquirer.prompt([
      {
        type: "list",
        name: "withdrawal_amount",
        message: "Please select withdrawal amount",
        choices: [1000, 3000, 5000, 10000, 25000, 50000],
      },
    ]);
    doTransaction(balance, amount.withdrawal_amount);
  } else if (transaction_type === "Cash Withdraw") {
    amount = await inquirer.prompt([
      {
        type: "input",
        name: "withdrawal_amount",
        message: "Please enter amount",
        validate: (input) => {
          if (isNaN(input) || input <= 0) {
            return "Invalid number";
          }
          if (input === "") {
            return "Value is required!";
          }

          return true;
        },
      },
    ]);
    doTransaction(balance, amount.withdrawal_amount);
  } else if (transaction_type === "Balance Inquiry") {
    console.log(`Available balance: ${balance}`);
  }
}
