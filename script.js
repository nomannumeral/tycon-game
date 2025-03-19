const dayElement = document.getElementById("day");
const moneyElement = document.getElementById("money");
const inventoryElement = document.getElementById("inventory");
const buySuppliesButton = document.getElementById("buy-supplies");
const setPriceButton = document.getElementById("set-price");
const upgradeStandButton = document.getElementById("upgrade-stand");
const nextDayButton = document.getElementById("next-day");
const logElement = document.getElementById("log");

let day = 1;
let money = 10.00;
let inventory = 10;
let pricePerCup = 1.00;
let standLevel = 1;
let customerMultiplier = 1;

// Buy supplies
buySuppliesButton.addEventListener("click", () => {
  if (money >= 5) {
    money -= 5;
    inventory += 10;
    updateStats();
    addLog("You bought 10 cups of lemonade.");
  } else {
    addLog("Not enough money to buy supplies!");
  }
});

// Set price
setPriceButton.addEventListener("click", () => {
  const newPrice = parseFloat(prompt("Set the price per cup (current: $" + pricePerCup + "):"));
  if (!isNaN(newPrice) && newPrice > 0) {
    pricePerCup = newPrice;
    addLog("Price set to $" + pricePerCup.toFixed(2) + " per cup.");
  } else {
    addLog("Invalid price!");
  }
});

// Upgrade stand
upgradeStandButton.addEventListener("click", () => {
  if (money >= 50) {
    money -= 50;
    standLevel++;
    customerMultiplier += 0.5;
    updateStats();
    addLog("You upgraded your stand! Customers are more likely to buy.");
  } else {
    addLog("Not enough money to upgrade the stand!");
  }
});

// Next day
nextDayButton.addEventListener("click", () => {
  const customers = Math.floor(Math.random() * 20 * customerMultiplier); // Random number of customers
  const sales = Math.min(customers, inventory); // Cannot sell more than inventory
  const revenue = sales * pricePerCup;

  money += revenue;
  inventory -= sales;
  day++;
  updateStats();

  addLog(`Day ${day - 1}: Sold ${sales} cups for $${revenue.toFixed(2)}.`);

  // Random events
  if (Math.random() < 0.2) {
    const event = Math.random();
    if (event < 0.5) {
      addLog("It's a hot day! More customers are buying lemonade.");
      customerMultiplier += 0.2;
    } else {
      addLog("It's raining... Fewer customers are buying lemonade.");
      customerMultiplier -= 0.2;
    }
  }

  // Check for game over
  if (money < 0) {
    addLog("You ran out of money! Game over.");
    disableButtons();
  }
});

// Update stats display
function updateStats() {
  dayElement.textContent = day;
  moneyElement.textContent = money.toFixed(2);
  inventoryElement.textContent = inventory;
}

// Add a message to the log
function addLog(message) {
  const logEntry = document.createElement("p");
  logEntry.textContent = message;
  logElement.appendChild(logEntry);
  logElement.scrollTop = logElement.scrollHeight; // Auto-scroll to the bottom
}

// Disable buttons on game over
function disableButtons() {
  buySuppliesButton.disabled = true;
  setPriceButton.disabled = true;
  upgradeStandButton.disabled = true;
  nextDayButton.disabled = true;
}

// Initialize the game
updateStats();