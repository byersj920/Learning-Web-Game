const rockButton = document.getElementById('rockButton');
const goldCountElement = document.getElementById('goldCount');

let goldCount = 0;
let earnedGold = 0;

const generateGold = () =>{
    earnedGold = Math.ceil(Math.random() * 20);
    goldCount += earnedGold;
    goldCountElement.textContent = goldCount;
}

rockButton.addEventListener('click', function() {
    generateGold();
    console.log("Wow! You mined " + earnedGold + " gold. Your current gold count is: " + goldCount);
});
