const rockButton = document.getElementById('rockButton');
const goldCountElement = document.getElementById('goldCount');
const dwarfCostElement = document.getElementById('dwarfCost');
const dwarfButton = document.getElementById('purchaseDwarf');
const dwarfCountElement = document.getElementById('dwarfCounter');
const pickaxePurchaseButton = document.getElementById('pickaxePurchase');
const pickaxeCountDisplay = document.getElementById('pickaxeCounter');
const pickaxeCostElement = document.getElementById('pickaxeCost')
const miningSpeedUpgradeButton = document.getElementById('upgradeMiningSpeed');
const speedUpgradePriceCostElement = document.getElementById('upgradeSpeedCost');
const currentMiningSpeed = document.getElementById('dwarfMiningSpeed');

let goldCount = 0;
let dwarfCost = 20;
dwarfCostElement.textContent= dwarfCost;
let dwarfCount = 0;
let dwarfMiningRate = 1000;
let pickaxeCost = 30;
pickaxeCostElement.textContent= pickaxeCost;
let pickAxeCount = 1;
let speedUpgradePrice = 40;
speedUpgradePriceCostElement.textContent= speedUpgradePrice;
let speedUpgradeCount = 0;



const createDwarfMiningFunction = (dwarfId) => {
    return () => {
        goldCount += pickAxeCount;
        goldCountElement.textContent = goldCount;
    };
};

const startDwarfMining = (dwarfId) => {
    setInterval(dwarfMiningFunctions[dwarfId], dwarfMiningRate);
};

const dwarfMiningFunctions = {}; // Object to store dwarf mining functions

rockButton.addEventListener('click', function() {
    goldCount += 1;
    goldCountElement.textContent = goldCount;
});

dwarfButton.addEventListener('click', function(){
    if (goldCount >= dwarfCost){
        goldCount = goldCount - dwarfCost;
        goldCountElement.textContent = goldCount;
        dwarfCount++;
        dwarfCountElement.textContent=dwarfCount;
        dwarfCost = Math.ceil((dwarfCost*1.5));
        dwarfCostElement.textContent = dwarfCost;
        
        // Create a mining function for the new dwarf
        const newDwarfId = `dwarf${dwarfCount}`;
        dwarfMiningFunctions[newDwarfId] = createDwarfMiningFunction(newDwarfId);
        startDwarfMining(newDwarfId);
    }
});

pickaxePurchaseButton.addEventListener('click', function(){
    if (goldCount >= pickaxeCost){
        goldCount = goldCount - pickaxeCost;
        goldCountElement.textContent = goldCount;
        pickAxeCount++;
        pickaxeCountDisplay.textContent=pickAxeCount;
        pickaxeCost = Math.ceil(pickaxeCost*1.5);
        pickaxeCostElement.textContent = pickaxeCost;
    }
});

miningSpeedUpgradeButton.addEventListener('click', function(){
    if (goldCount >= speedUpgradePrice){
        goldCount = goldCount - speedUpgradePrice;
        goldCountElement.textContent = goldCount;
        dwarfMiningRate = dwarfMiningRate - (dwarfMiningRate*0.05);
        currentMiningSpeed.textContent = Math.ceil(dwarfMiningRate);
        speedUpgradePrice = Math.ceil(speedUpgradePrice*1.5);
        speedUpgradePriceCostElement.textContent = speedUpgradePrice;
        
        // Restart mining for all dwarfs with the updated rate
        Object.keys(dwarfMiningFunctions).forEach((dwarfId) => {
            clearInterval(dwarfId);
            startDwarfMining(dwarfId);
        });
    }
});
