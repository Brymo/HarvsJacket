const upgradePanel = document.getElementById("upgrades");
const clickPanel = document.getElementById("clickPanel");
const bigIndicator = document.getElementById("bigness");
const rog = document.getElementById("rog");
const state = document.getElementById("stateName");

const gameData = getGameData();


const tools = gameData.tools;
const states = gameData.states;

class GameState{

    constructor(states,tools){
        this.bigness= 0;
        this.bps = 0; 
        this.states = states.slice().sort((stateA, stateB) => {return stateA.threshold > stateB.threshold});
        this.tools = tools;
        this.lastState = this.states[0].name;
        this.speed = 10;
        this.tickCount = 0;
    }

    applyBps(incr){
        this.bps += incr;
    }

    applyBigness(incr){
        this.bigness += incr;
    }

    tick(){
        this.bigness += this.bps / this.speed;
        this.tickCount = (this.tickCount + 1) % 10000000;
    }

    setLastState(str){
        this.lastState = str;
    }

    getState(){

        for(let i = 0; i < this.states.length; i++){
            if(this.bigness < this.states[i].threshold){
                return this.states[i];
            }
        }
        return this.states[this.states.length-1];
    }

    buyTool(toolName){
        const incremented = this.tools.map((tool)=>{
            const clone = Object.assign({}, tool);
            if(tool.name.toUpperCase() === toolName.toUpperCase()){
                clone.count = clone.count + 1;
            }
            return clone;
        });
        this.tools = incremented;
    }

    getCountForTool(toolName){
        const tool = this.tools.filter((tool)=>{
            return tool.name.toUpperCase() === toolName.toUpperCase()
        })[0];
        return tool ? tool.count : null;
    }
}

const gameState = new GameState(states,tools);

const toolsWithExpensers = tools.map((tool)=>{
    const tempTool = Object.assign({},tool);
    tempTool.expenser = (gameState)=>{
        if(gameState.bigness >= tool.cost){
            gameState.applyBigness(tool.cost*-1);
            gameState.applyBps(tool.value);
            gameState.buyTool(tool.name);
        }
    }
    return tempTool;
});

toolsWithExpensers.forEach((tool)=>{
    const nameDiv = document.createElement("div");
    nameDiv.innerText = tool.name;
    nameDiv.className = "name";

    const descriptionDiv = document.createElement("div");
    descriptionDiv.innerText = tool.description;
    descriptionDiv.className = "description";

    const costDiv = document.createElement("div");
    costDiv.innerText = tool.cost;
    costDiv.className = "cost";

    const bpsDiv = document.createElement("div");
    bpsDiv.innerText = tool.value;
    bpsDiv.className = "bps";

    const countDiv = document.createElement("div");
    countDiv.innerText = tool.count;
    countDiv.className = "count";

    const toolDiv = document.createElement("div");
    toolDiv.className = "tool"
    toolDiv.appendChild(nameDiv);
    toolDiv.appendChild(descriptionDiv);
    toolDiv.appendChild(costDiv);
    toolDiv.appendChild(bpsDiv);
    toolDiv.appendChild(countDiv);

    toolDiv.addEventListener("click", ()=>{tool.expenser(gameState)});

    upgradePanel.appendChild(toolDiv);

});



setInterval(()=>{
    gameState.tick();
    bigIndicator.innerText = gameState.bigness.toFixed(2);

    const newState = gameState.getState();
    state.innerText = newState.name;
    
    if(newState.name != gameState.lastState){
        gameState.setLastState(newState.name);
        rog.src = newState.image;
    }

    const tools = document.getElementsByClassName("tool");
    for(let i = 0; i < tools.length | 0; i++){
        const name = tools[i].getElementsByClassName("name")[0].innerText;
        const countElem = tools[i].getElementsByClassName("count")[0];
        countElem.innerText = gameState.getCountForTool(name);
    };

    if(gameState.tickCount % 200 === 0){
        const factElem = document.getElementById("facts");
        factElem.innerText = randomFact();
    }

},100)

rog.addEventListener("click",()=>{
    gameState.applyBigness(1);
    bigIndicator.innerText =  gameState.bigness.toFixed(2);
})




function getGameData(){
    const gameData = {   
        "tools":[
            {
                "name":"Milk",
                "description":"For strong bones...",
                "value":1,
                "cost":20,
                "count":0
            },
            {
                "name":"Rice",
                "description":"A growth staple...",
                "value":10,
                "cost":300,
                "count":0
            },
            {
                "name":"Duck",
                "description":"Their sacrifice makes you strong...",
                "value":120,
                "cost":2000,
                "count":0
            },
            {
                "name":"Gym Membership",
                "description":"Muscle Up BOIIII...",
                "value":600,
                "cost":200000,
                "count":0
            },
            {
                "name":"Roids",
                "description":"We've gone too far...",
                "value":40000,
                "cost":8888888888,
                "count":0
            }
        ],
        "states":[
            {
                "name":"Baby Roger",
                "threshold":420,
                "image":"a.jpg"
            },{
                "name":"Xiao Hai Rog",
                "threshold":4200,
                "image":"b.jpg"
            },{
                "name":"Teen Rog",
                "threshold":420000,
                "image":"c.jpg"
            }, {
                "name":"Big Rog",
                "threshold":42000000,
                "image":"d.jpg"
            }, {
                "name":"Genghis Khan",
                "threshold":4200000000,
                "image":"e.jpg"
            }
        ]

    }

    return gameData;
   
}

function randomFact(){

    const pick = Math.floor(Math.random()*1000000) % 90;

    const facts = [
        "'China is commonly known as the People’s Republic of China.'",
        "'The origin of the word “China” derives from the Qin dynasty. The first emperor of the Qin dynasty was Qin Shi Huang (260-210 BC).'",
        "'Throughout the century, the name of the capital of China has changed. It has been known as Dadu, Yanjing, and Beiping. Peking or Beijing means “Northern Capital”.'",
        "'China is considered to be the oldest civilization with some historians marking 6000 BC as the beginning of the Chinese civilization. Also, it has the world’s longest used written language.'",
        "'As of July 2012, China has the largest population in the world with over 1.3 billion people.'",
        "'China is the third largest country by area at 9,706,961 sq km (3,747,879 sq miles).'",
        "'China belongs to the continent of Asia. Bordering countries are Afghanistan, Bhutan, Burma, India, Kazakhstan, North Korea, Kyrgyzstan, Laos, Mongolia, Nepal, Pakistan, Russia, Tajikistan, and Vietnam.'",
        "'China is also called the Flowery Kingdom, and many of the country’s flowers and fruits, such as the orchid and orange, are now being grown all over the world.'",
        "'One in every five people in the world is Chinese. China’s population is four times larger than that of the US.'",
        "'The highest mountain in the world, which is 29,028 feet tall, is named after the first surveyor of India, Sir George Everest. The Chinese people call Mount Everest Qomolangma, which means “Mother Goddess of the Earth.”China photo'",
        "'China’s national banner was adopted in 1949 and was first flown in Tiananmen Square, which is the world’s biggest public gathering place, on October 1, 1949, the day when the People’s Republic of China was established. The color red in the banner symbolizes revolution, the big star symbolizes communism, and all the little stars represent the Chinese population.'",
        "'The summit of Mt. Everest, the highest mountain in the world, marks the border between China and Nepal.'",
        "'There are many different languages that are spoken in China, including Mandarin, Wu, Yue, Minbei, Xiang, Minnan, Xiang, Hakka, and Gan.'",
        "'The capital city of China is Beijing, while Shanghai is the most populated city. Other major cities are Chongqing, Guangzhou, and Shenzhen.'",
        "'Forty-seven percent of the population live in urban areas.'",
        "'Every year, China experiences typhoons and also suffers from floods, earthquakes, tsunamis, and droughts.'",
        "'The Yangtze River in China is the fourth longest river in the world and reaches 5,797 km (3,602 miles) in length. Also, the Yellow River is the sixth longest, stretching 4,667 km (2,900 miles). Yangtze River'",
        "'China has the second largest economy in the world, right after the USA.'",
        "'In 2003, China became the third country in the world to successfully send a person to space.'",
        "'The Great Wall of China is the largest man-made structure in the world, extending 8,850 km (5,500 miles).'",
        "'The popular giant panda is found near the Yangtze River in China. Panda in China'",
        "'The 2008 Summer Olympic Games in Beijing were hosted by China. The 2008 Olympic Games in Beijing were the most expensive in the history. They were estimated to cost $40 billion.'",
        "'October 1 is celebrated by the Chinese as a national day in honor of establishing the People’s Republic of China.'",
        "'The national anthem of China is called “Yiyonggjun Jinxingqu,” which means March of the Volunteers, and was written in 1935 by the poet Tian Han and composed by the artist Nie Er, honoring those who went to the front in battle with the Japanese invaders in northeast China in the 1930s.'",
        "'Fortune cookies are not actually a traditional Chinese custom. They were invented by an employee in the Key Heong noodle factory in San Francisco. Chinese fortune cookies'",
        "'Cricket battling is a popular form of entertainment in China, and many Chinese people keep crickets as pets.'",
        "'China has only one time zone.'",
        "'Many historians think that soccer began in China around 1000 BC.'",
        "'Ping-pong was not invented in China, even though it is one of China’s most popular games. It started in Britain, where it’s called table tennis.'",
        "'Stamp collecting is the number one hobby in China.'",
        "'China has a dwarf theme park known as Kingdom of the Little People.'",
        "'In ancient China, tickling was a form of torture performed on nobility because the recovery was quick and no marks were left.'",
        "'Giant pandas (or bear cats) date back a few million years. They were considered as symbols of might and bravery.'",
        "'Instead of black, white is the Chinese color for grieving and funerals.'",
        "'The custom of tying feet, also called golden lilies, which were seen as a very sexual thing, started among the female performers and members of the Chinese court during the Song dynasty.'",
        "'The celebration of the Chinese New Year lasts 15 days. Chinese New Year'",
        "'Zhai Zhigang made the first walk in space by a Chinese astronaut on September 27, 2008.'",
        "'The wealthy used to grow the nails of their little fingers very long, which was a sign of their rank. In order to protect their nails, they often wore gold and silver nail guards.'",
        "'The Three Gorges Hydroelectric Dam is the world’s largest dam.'",
        "'The Chinese New Year, also known as the Lunar New Year, is the most important celebration in China. The Chinese believe that every person on turns one year older on New Year, so that day is thought to be everybody’s birthday.'",
        "'For the Chinese, red symbolizes happiness and is used at Chinese festivals and many other celebrations, such as birthdays and weddings.'",
        "'In ancient China, the lotus was considered a symbol of purity. The peony, or king of flowers, symbolized the spring; the narcissus was believed to bring good fortune; and the chrysanthemum symbolizes long life. Lotus flower'",
        "'The Chinese have their own Bigfoot, Yeren, or “wild man,” who is rumored to live in the mountainous forested regions of the Hubei Province.'",
        "'There are currently 32 million more males than females in China.'",
        "'Traditionally, Chinese babies wear kaidangku, or open-crotch pants, instead of diapers.'",
        "'The first known Homo erectus, the Peking Man, who lived between 300,000 and 550,000 years ago, was found in China. It is thought that he knew how to control fire.'",
        "'During the first half of the 20th century, Shanghai was the only city in the world to accept Jews that were escaping the Holocaust without an entry visa.'",
        "'Chinese mathematics have made early contributions to the field, including a place value system.'",
        "'Chinese lanterns are a symbol of long life.'",
        "'In China, every year is represented by one of 12 animals.'",
        "'The 12 animals are: rat, ox, tiger, rabbit, dragon, snake, horse, goat, monkey, rooster, dog, and p'",
        "'The mortar that was used to bind the stones of the Great Wall was made with sticky rice.'",
        "'In the Tang dynasty, those with an education had to greet and say goodbye to each other in poetic verse.'",
        "'China’s Grand Canal is the world’s longest and oldest canal.'",
        "'The bat is a traditional symbol of good luck and is often depicted in designs for textiles, porcelain,and other artworks.'",
        "'Pearl S. Buck was the first American woman to win the Nobel Prize for her books about China, most notably The Good Earth. A bestselling Chinese-American author is Amy Tan.'",
        "'All of China’s railways lines put together could loop around the earth twice. Railway in China'",
        "'The Chinese word for civilization (wen) is pronounced the same as the word for pattern, script, or calligraphy.'",
        "'The carp is a symbol of perseverance and It resembles a dragon, the greatest symbol of power in China.'",
        "'In some parts of China, pigtails were associated with a female’s marital status. A young girl would wear two pigtails, and when she married, she would wear just one.'",
        "'In ancient China, mirrors were thought to protect their owners from evil. A person who had been terrified by a ghost could be protected by looking in the mirror.'",
        "'The Chinese developed a theory of three levels of heaven, which are Heaven, Earth, and man.'",
        "'China is home to a cluster of ancient rock columns, known as the Stone Forest.'",
        "'The horse originated in Central Asia and became very significant in China. A horse is thought to be associated with yang, the masculine symbol.'",
        "'The cicada (katydid) has the longest life span of any insect (up to 17 years) and sheds its skin, so for the Chinese, it is a symbol of regeneration and rebirth.'",
        "'Throughout Chinese history, concubinage has been practiced by wealthy men who could afford it. Chinese emperors had enormous harems with hundreds of concubines.'",
        "'In Chinese legend, the phoenix is the most important bird, and it represents the empress’s feminine power.'",
        "'In Western culture, the the dragon is considered an evil creature, while in Chinese mythology, it is the first among the four greatest creatures, along with the phoenix, tiger, and It is commonly associated with the emperor.'",
        "'It is thought that the gate to a house facing south brings good luck.'",
        "'Green bean-flavoured ice pops can be bought in China.'",
        "'The world’s best pencil graphite, which was yellow, was from China. In China, the color yellow is connected with royalty, so American pencil producers began painting their pencils yellow to show they contained high-quality Chinese graphite.'",
        "'The best-known traditional festivals in China are: Chinese New Year, the Lantern Festival, the Qingming (Tomb Sweeping) Festival, Double Seven Festival, and the Winter Solstice.'",
        "'Red is considered to be a lucky color, and Chinese brides often wear red to their weddings.'",
        "'China has the oldest calendar in the world. This lunar calendar has twelve zodiac signs and takes sixty years to complete.'",
        "'In 1996, China produced 600,000 tons of mushrooms, becoming the world’s leading producer. The country has 60% of the world’s mushroom varieties.'",
        "'Famous Chinese and Chinese-American actors include Jackie Chan, Lucy Liu, Bruce Lee, Chow Yun, Jet Li, and Zhang Ziyi.'",
        "'The thirteenth floor is usually left out from hotels, buildings, and vehicle licence plates, and the number four is not used in phone numbers.'",
        "'The Chinese invented toilet paper, and it was used for emperors only.'",
        "'The Chinese invented kites around 3,000 years ago. They were used to frighten enemies in battle. It was thought that they would bring bad luck if they were purposely let go.'",
        "'In 130 AD, Zhang Heng invented the first instrument for monitoring earthquakes, and it could detect and indicate the direction of the earthquake.'",
        "'China invented icecream. This occurred when the Chinese packed a soft milk and rice mixture in the snow.'",
        "'A civil servant, Su Song, built the first mechanical clock between 1088 and 1092 AD.'",
        "'The bicycle was introduced to China by two American travelers, Allen and Sachtleben, and is now the primary mode of transportation for millions of Chinese. Also, China is the leading bicycle producer.'",
        "'The Chinese were the first to invent the waterwheel to harness water.'",
        "'China was the first country in the world to use an iron plow.'",
        "'The Chinese were first to discover that blood circulates throughout the body and that the heart pumps the blood.'",
        "'The Chinese were using the decimal system around two thousand years before the first known use in European mathematics. Also, the Chinese were the first to use a place for zero.'",
        "'As the Chinese population grew, people had to preserve cooking fuel by chopping food into small pieces so it would cook faster. This eliminated the need for knives; then, chopsticks were invented.'",
        "'Chinese invented and first used the crossbow.'",
        "'The Chinese were the first in the world to use chemical and gas weapons, two thousand years before Europe.'",
        "'Tea was discovered by the Chinese emperor Shennong when a tea leaf fell into his boiling water.'",
        "'Martial arts in China were developed from ancient farming and hunting methods.'",
        "'According to a Chinese legend, silk was discovered circa 3000 BC by Lady Xi Ling Sui. When a silk worm cocoon dropped into her hot tea, fine threads from the cocoon untangled in the hot water and silk was born. silk'",
        "'The Romans knew China as Serica, which means Land of Silk. The Chinese strongly kept the secrets of silk making.'",
        "'The oldest piece of paper in the world was found in China. Chinese paper was so long lasting that it was sometimes used for clothing and even as body armor.'",
        "'The Chinese were the first in the world to use stirrups.'",
        "'In 1974, farmers digging in the Shaanxi Province discovered the tomb of Qin (259-210 BC), the first emperor who formed China.'",
        "'Suspension bridges were invented in China before they were even known in the West.'",
        "'Porcelain originated in China. It is a very specific kind of ceramic that is produced using the highest temperatures of a kiln.'",
        "'During the Three Kingdoms era, the Chinese invented the hot air balloon.'",
    ]

    return facts[pick];

}