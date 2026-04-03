import { addOrder } from "./Loyalty.js"; // ✅ move to top

let currentState = welcoming;

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput() {
  currentState = welcoming;
}

function welcoming() {
  let aReturn = [];
  currentState = ordering;

  aReturn.push("Welcome to Fast Bites.");
  aReturn.push("Our menu includes Burger and Pizza. What would you like?");

  return aReturn;
}

function ordering(sInput) {
  let aReturn = [];
  let input = sInput.toLowerCase();

  if (input.startsWith('b')) {
    aReturn.push("You selected Burger.");
    aReturn.push("What size would you like? Small or Large?");
  }
  else if (input.startsWith('p')) {
    aReturn.push("You selected Pizza.");
    aReturn.push("What size would you like? Small or Large?");
  }
  else if (input.startsWith('s') || input.startsWith('l')) {
    aReturn.push("Great choice.");
    aReturn.push("Would you like to add toppings like cheese or bacon?");
  }
  else {
    aReturn.push("Would you like to add a drink to your order?");

    // ✅ Loyalty logic here
    const result = addOrder();

    if (result.free) {
      aReturn.push("🎉 This is your 10th order — it's FREE!");
    } else {
      aReturn.push(`✅ Order placed! You now have ${result.count}/10 points.`);
    }

    aReturn.push("Your fast food order is being prepared!");

    currentState = welcoming;
  }

  return aReturn; // ✅ make sure this exists
}