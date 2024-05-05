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
let earnedGold = 0;
let dwarfCost = 100;
let dwarfCount = 0;
let dwarfMiningRate = 1000;
let pickaxeCost = 50;
let pickAxeCount = 1;
let speedUpgradePrice = 75;

const generateGold = () =>{
    earnedGold = Math.ceil(Math.random() * 20);
    goldCount += earnedGold;
    goldCountElement.textContent = goldCount;
};

const dwarfMining = () => {
    goldCount += (dwarfCount*pickAxeCount);
    goldCountElement.textContent = goldCount;
};

setInterval(dwarfMining, dwarfMiningRate);

rockButton.addEventListener('click', function() {generateGold();});

dwarfButton.addEventListener('click', function(){
    if (goldCount >= dwarfCost){
        goldCount = goldCount - dwarfCost;
        goldCountElement.textContent = goldCount;
        dwarfCount++;
        dwarfCountElement.textContent=dwarfCount
        dwarfCost = Math.ceil((100*1.5)*dwarfCount);
        dwarfCostElement.textContent = dwarfCost;
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
    }
});