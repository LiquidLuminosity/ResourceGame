// game.js
const game = document.getElementById("game");
const resources = document.getElementById("resources");
const store = document.getElementById("store");

let playerResources = 100; // The player starts with 100 resources
let playerFood = 50; // The player starts with 50 food

// Create an array of buildings the player can purchase
const buildings = [
  {
    name: "Farm",
    cost: 50,
    productionRate: 10, // Produces 10 food per second
    resourceType: "food",
  },
  {
    name: "Mine",
    cost: 100,
    productionRate: 5, // Produces 5 resources per second
    resourceType: "resources",
  },
];

// Add buttons for each building to the store
for (const building of buildings) {
  const button = document.createElement("button");
  button.textContent = `${building.name} (${building.cost} resources)`;
  button.addEventListener("click", () => {
    if (building.resourceType === "resources" && playerResources < building.cost) {
      alert("Not enough resources to purchase this building!");
      return;
    }
    if (building.resourceType === "food" && playerFood < building.cost) {
      alert("Not enough food to purchase this building!");
      return;
    }

    // Deduct the cost of the building from the player's resources
    if (building.resourceType === "resources") {
      playerResources -= building.cost;
    } else {
      playerFood -= building.cost;
    }

    // Add the building to the game grid
    const buildingElement = document.createElement("div");
    buildingElement.classList.add("building", building.name.toLowerCase());
    game.appendChild(buildingElement);

    // Start producing resources for the player
    setInterval(() => {
      if (building.resourceType === "resources") {
        playerResources += building.productionRate;
      } else {
        playerFood += building.productionRate;
      }
    }, 1000); // Produce resources every second
  });
  store.appendChild(button);
}

// Update the resource display every second
setInterval(() => {
  resources.textContent = `Resources: ${playerResources} Food: ${playerFood}`;
}, 1000);
