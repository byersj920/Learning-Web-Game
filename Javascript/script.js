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

const updateButtonStyles = () => {
    // Dwarf Button
    if (goldCount >= dwarfCost) {
        dwarfButton.classList.add('affordable');
    } else {
        dwarfButton.classList.remove('affordable');
    }

    // Pickaxe Purchase Button
    if (goldCount >= pickaxeCost) {
        pickaxePurchaseButton.classList.add('affordable');
    } else {
        pickaxePurchaseButton.classList.remove('affordable');
    }

    // Mining Speed Upgrade Button
    if (goldCount >= speedUpgradePrice) {
        miningSpeedUpgradeButton.classList.add('affordable');
    } else {
        miningSpeedUpgradeButton.classList.remove('affordable');
    }
};

const createDwarfMiningFunction = () => {
    return () => {
        goldCount += pickAxeCount;
        goldCountElement.textContent = goldCount;
        updateButtonStyles();
    };
};

const startDwarfMining = (dwarfId) => {
    setInterval(dwarfMiningFunctions[dwarfId], dwarfMiningRate);
};

const dwarfMiningFunctions = {};

rockButton.addEventListener('click', function() {
    goldCount += 1;
    goldCountElement.textContent = goldCount;
    updateButtonStyles();
});

dwarfButton.addEventListener('click', function(){
    if (goldCount >= dwarfCost){
        goldCount = goldCount - dwarfCost;
        goldCountElement.textContent = goldCount;
        dwarfCount++;
        dwarfCountElement.textContent=dwarfCount;
        dwarfCost = Math.ceil((dwarfCost*1.5));
        dwarfCostElement.textContent = dwarfCost;
        const newDwarfId = `dwarf${dwarfCount}`;
        dwarfMiningFunctions[newDwarfId] = createDwarfMiningFunction(newDwarfId);
        startDwarfMining(newDwarfId);
    }
    updateButtonStyles();
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
    updateButtonStyles();
});

miningSpeedUpgradeButton.addEventListener('click', function(){
    if (goldCount >= speedUpgradePrice){
        goldCount = goldCount - speedUpgradePrice;
        goldCountElement.textContent = goldCount;
        dwarfMiningRate = dwarfMiningRate - (dwarfMiningRate*0.05);
        currentMiningSpeed.textContent = Math.ceil(dwarfMiningRate);
        speedUpgradePrice = Math.ceil(speedUpgradePrice*1.5);
        speedUpgradePriceCostElement.textContent = speedUpgradePrice;
        Object.keys(dwarfMiningFunctions).forEach((dwarfId) => {
            clearInterval(dwarfId);
            startDwarfMining(dwarfId);
        });
    }
    updateButtonStyles();
});
