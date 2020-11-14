
//Accessing the different elements in the game 
let welcome=document.querySelector('#welcome');
let categoryContainer=document.querySelector('.category-container');
let backbtn=document.querySelector('.back');
let movies=document.querySelector('#movies');
let tv=document.querySelector('#tv');
let celebrities=document.querySelector('#celebrities');
let sportsteams=document.querySelector('#sportsteams');
let animals=document.querySelector('#animals');
let videogames=document.querySelector('#videogames');
let cities=document.querySelector('#cities');
let food=document.querySelector('#food');
let music=document.querySelector('#music');
let gameheading=document.querySelector('.selectedgenre');
let letteroptions= document.querySelector('.letter-options');  
let letteroptionboxes=document.querySelectorAll('.letters');
let guessedword=document.querySelector('.guessed-word');
let livesbox=document.querySelector('.lives-box');
let tryagainbox=document.querySelector('.try-again-box');
let lives=document.getElementById('lives');
let tryagain=document.querySelector('.try-again-box p');
let endscreen=document.querySelector('.endscreen');
let endscreenMsg=document.querySelector('#endscreen-msg');
let reset=document.querySelector('#reset');


let countcorrectguesses=0; 
let alreadyguessedChar=[]; //array to hold already guessed chars
let finished;
let guessWord; //stores the word that is supposed to guessed
let guessword_arr; //guessWord is split into an array and stored here
let selectedgenre;
let randInt=Math.round(Math.random()*53);

/* At any time a user can only click on one category meaning that only one of the event
  listeners attached to the categories can be activated */ 

movies.addEventListener('click',(event)=>{
    selectedgenre="MOVIES";
    //Home page --> Game page
    GoToGame();
    //new value of randInt is used to retrieve a randomly selected movie fromm the array moviesdata
    guessWord=moviesdata[randInt];
    game();
});

tv.addEventListener('click',(event)=>{
    selectedgenre="TV SHOWS";
    GoToGame();
    guessWord=tvdata[randInt];
    game();
});

sportsteams.addEventListener('click',(event)=>{
    selectedgenre="SPORTS TEAMS";
    GoToGame();
    guessWord=sportsteamsdata[randInt];
    game();
});

celebrities.addEventListener('click',(event)=>{
    selectedgenre="CELEBRITIES";
    GoToGame();
    guessWord=celebritiesdata[randInt];
    game();
});

cities.addEventListener('click',(event)=>{
    selectedgenre="FAMOUS CITIES"
    GoToGame();
    guessWord=citiesdata[randInt];
    game();
});

animals.addEventListener('click',(event)=>{
    selectedgenre="ANIMALS";
    GoToGame();
    guessWord= animalsdata[randInt];
    game();
});

videogames.addEventListener('click',(event)=>{
    selectedgenre="VIDEO GAMES";
    GoToGame();
    guessWord=videogamesdata[randInt];
    game();
});

food.addEventListener('click',(event)=>{
    selectedgenre="FOOD";
    GoToGame();
    guessWord=fooddata[randInt];
    game();
});

music.addEventListener('click',(event)=>{
    selectedgenre="MUSIC";
    GoToGame();
    guessWord=musicdata[randInt];
    game();
});


//is used both when going from home page to game page and clicking the try again button
function GoToGame(){
    //home page elements are made invisible
    welcome.style.display="none";
    categoryContainer.style.display="none";

    //game page elements are displayed
    backbtn.style.display="block";
    gameheading.innerHTML= selectedgenre;
    gameheading.style.display="block";
    letteroptions.style.display="block";
    guessedword.style.display="block";
    tryagainbox.style.display="block";
    livesbox.style.display="block";

    //every times function is fired new value of randInt is generated
    randInt=Math.round(Math.random()*53);

    //values of following variables are reset
    finished=false;
    alreadyguessedChar=[];
    countcorrectguesses=0;

    //number of lives are reset
    Lives("Reset"); 
    lives.textContent= Lives("Return");

    //letter boxes wiped out during last game are reset
    letteroptionboxes.forEach((ele)=>{
        if(ele.style.backgroundColor=="white"){
            ele.style.backgroundColor="black";
            ele.style.color="white";
        }
    });
}


//is used when going from game page to home page
function ReturnToHome(){
    //display home page elements
    welcome.style.display="block";
    categoryContainer.style.display="block";

    //game page elements are made invisible
    backbtn.style.display="none";
    gameheading.style.display="none";
    letteroptions.style.display="none";
    guessedword.style.display="none";
    tryagainbox.style.display="none";
    livesbox.style.display="none";
    guessedword.innerHTML="";
    endscreen.style.display="none";
}


/*splits guessWord into an array and passes each element of the array 
along with its index to createBoxes()*/
function game(){
    guessword_arr= guessWord.toUpperCase().split("");
    for(let i=0;i<guessword_arr.length;i++){
        createBoxes(i.toString(),guessword_arr[i]);
    }
}


//creates empty divs and appends them to guessedword 
function createBoxes(_charindex,_char){
    let div= document.createElement('div');
    //guessed-word-box has been styled in the style.css file
    div.className="guessed-word-box";
    if(_char==" "){
        div.style.backgroundColor="black";
    }
    else{
        //_charindex is the index of _char in the guessword_arr 
        div.id=_charindex ;
    }
    guessedword.appendChild(div);
}


//returns to home page
backbtn.addEventListener('click',()=>{
    ReturnToHome();
});


//reloads the game but with a new word
tryagain.addEventListener('click', ()=>{
    //guessedword div is emptied to remove boxes from previous game
    guessedword.innerHTML="";
    endscreen.style.display="none";
    GoToGame();
    
    //a new word is generated as per the value of selected genre
    switch(selectedgenre){
        case "MOVIES": guessWord=moviesdata[randInt];break;
        case "TV SHOWS": guessWord=tvdata[randInt];break;
        case "SPORTS TEAMS": guessWord=sportsteamsdata[randInt];break;
        case "CELEBRITIES": guessWord=celebritiesdata[randInt];break;
        case "FAMOUS CITIES": guessWord=citiesdata[randInt];break;
        case "ANIMALS": guessWord=animalsdata[randInt];break;
        case "FAMOUS FOODS": guessWord=fooddata[randInt];break;
        case "VIDEO GAMES": guessWord=videogamesdata[randInt];break;
        case "MUSIC": guessWord=musicdata[randInt];break;
    }
    game();
});


reset.addEventListener('click',()=>{
    window.location.reload();
});


//IIFE returns a function and assigns it to Lives 
let Lives = (function(){
    let lives=10;
    return function(command){    
        if(command=="Decrease"){ lives-=1 }
        else if(command=="Return"){ return lives }
        else if(command=="Reset"){ lives=10 }
    }
})();


//main function
letteroptions.addEventListener('click',(e)=>{
    let temp= e.target.id;
    let indexofcharmultiple=[]; //stores the indexes of chosenChar in guessword_arr

    //check if temp is valid and assign it to chosenChar
    if(letters.indexOf(temp)>=0){
        var chosenChar=temp;
    }

    let regex=new RegExp(chosenChar, 'g');

    //check if chosenChar is present in guessWord
    if(guessword_arr.indexOf(chosenChar)>=0 && Lives("Return")>0){
        let indexbegin=0;
        let numOfChosenChar=guessWord.toUpperCase().match(regex).length; //number of times chosenChar appears in the guessWord 
        
        //update countcorrectguesses only if the chosenChar has not been guessed before
        if(alreadyguessedChar.indexOf(chosenChar)<0){
        countcorrectguesses+=numOfChosenChar;
        }
        alreadyguessedChar.push(chosenChar);

        //find indexes of chosen char in guessword_arr and store in array 
        for(let i=0;i<numOfChosenChar;i++){
            indexofcharmultiple.push(guessword_arr.indexOf(chosenChar,indexbegin));
            indexbegin=guessword_arr.indexOf(chosenChar,indexbegin)+1;
        }

        //select the guessed-word-boxes and compare their id's with the indexes of chosen char in guessword_arr
        let temparr=document.querySelectorAll('.guessed-word-box');
        let count=0;
        [].map.call(temparr,(ele)=>{
            if(ele.id==indexofcharmultiple[count]){
                ele.innerText=chosenChar;
                count++;
            }
        });
    }
    //if chosenChar is not present in guessWord
    else if(chosenChar!=undefined && Lives("Return")>0 && e.target.style.backgroundColor != "white" && finished!=true){
        e.target.style.backgroundColor = "white";
        Lives("Decrease");
        lives.textContent=Lives("Return");
    }

    //Now we check if game has finished

    //if guessword has no spaces and it has been completely guessed
    if(guessword_arr.indexOf(" ")==-1 ){
        if(countcorrectguesses==guessword_arr.length){
            endscreenMsg.textContent="YOU DID IT! PLAY ONE MORE TIME? OR GO BACK TO THE HOME SCREEN(CLICK ON THE BACK BUTTON)";
            endscreen.style.display="block";
            finished=true;
        }
    }
    //if guessword has spaces and it has been completely guessed
    else if ((countcorrectguesses+guessWord.match(/\s/g).length)==(guessword_arr.length)){
        endscreenMsg.textContent="YOU DID IT! PLAY ONE MORE TIME? OR GO BACK TO THE HOME SCREEN(CLICK ON THE RESET BUTTON)";
        endscreen.style.display="block";
        finished=true;
    }
    //if the lives have finished  
    if(Lives("Return")==0){
        endscreenMsg.textContent="Sorry! Better Luck Next Time";
        endscreen.style.display="block";
        finished=true;
    }
});

/*----------------  OUR DATABASE  ------------------*/

let letters= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

let moviesdata=['The Godfather','The Shawshank Redemption',"Schindlers List",'Raging Bull','Casablanca','Citizen Kane','Gone with the Wind','The Wizard of Oz','Sherlock Holmes','Vertigo','Psycho','On the Waterfront','Forrest Gump','Angry Men','West Side Story','Star Wars','A Space Odyssey','Chinatown','Some Like It Hot','Ben Hur','Apocalypse Now','Gladiator','Titanic',"Following","Memento", "Insomnia", "Batman Begins", "The Prestige", "The Dark Knight", "Inception","The Dark Knight Rises",'Interstellar',"Dunkirk", "Tenet","Boxcar Bertha","Mean Streets","Taxi Driver","The King of Comedy","After Hours","The Color of Money","Goodfellas","Cape Fear","The Age of Innocence","Casino","Kundun Buena","Bringing Out the Dead","Gangs of New York","The Aviator","The Departed","Shutter Island","Hugo","The Wolf of Wall Street","Silence","The Irishman"]	

let tvdata=[ 'Breaking Bad','Game of Thrones','Friends','The Wonder Years','Seinfeld','House of Cards','Lost','Westworld','Stranger Things','The X-Files','Better Call Saul','Narcos','Daredevil','Family Guy','The Simpsons','The Wire','Rome','Rick and Morty','Homeland','Viking','The Punisher','The Boys','Two and a Half Men','Fargo','American Crime Story','Dexter','The Walking Dead','MacGyver','True Detective','The Umbrella Academy','Mr Robot','Boardwalk Empire','Prison Break','Taboo','House','The Big Bang Theory','South Park','Buffy the Vampire Slayer','Jessica Jones','Big Little Lies','The Strain','The Office','Everybody Loves Raymond','Law and Order','Black Mirror','Crime Scene Investigation','The Flintstones','American Horror Story','Baywatch','The Following','Futurama','Penny Dreadful','Agents of SHIELD'];

let sportsteamsdata=['real madrid','barcelona','machester city','stoke city','paris saint germain','bayern munich','liverpool','athletico madrid','la galaxy','marseille','redbull leipsig','dynamo zagreb','la lakers','bosten celtics','cleveland caveliers','golden state warriors','toronto raptors','dallas maveriks','milwaukee bucks','houston rockets','los angeles clippers','chicago bulls','san antonio spurs','denver nuggets','indiana pacers','new york knicks','sacremento kings','new england patriots','kansas city chiefs','pittsburg steelers','las vegas raiders','denver broncos','baltimore ravens','buffalo bills','new york jets','cleveland browns','jacksonville jaguars ','tennessee titans','miami dolphins','houston texans',"ajax","bournemouth","seville","real sociedad","napoli","red bull salsburg","dortmund",'boca juniors','riverplate','southhampton','valencia','montpellier','arsenal'];

let celebritiesdata=['Jennifer aniston','taylor swift','george clooney','julia roberts','robert downey jr','miley cyrus','britney spears','jennifer lawrence','oprah winfrey','brad pitt','emma stone','natalie portman','demi moore','emma charlotte watson','will smith','lindsay lohan','scarlet johansson','chris hemsworth','angelina jolie','tom hanks','beyonce','alec baldwin','mila kunis','ashton kucher','katy perry','tom cruise','rachel mcadams','jenna fischer','leonardo di caprio','amanda seyfried','reese witherspoon','ben affleck','justin bieber','selena gomez','dwayne johnson','jennifer lopez','charlie sheen','ellen degenres','steven spielberg','christopher nolan','david beckham','cristiano ronaldo','leonal messi','denzel washington','chadwick boseman','megan fox','johnny depp','justin timberlake','catherine zeta jones','al pacino','robert de niro','matt damon','jimmy fallon','priyanka chopra'];

let citiesdata=['amsterdam','athens','atlantic city','ankara','baltimore','beijing','bangkok','berlin','brussels','berne','budapest','buenos aires','cairo','canberra','cannes','cape town','chicago','cologne','copenhagen','damascus','dubai city','dublin','florence','geneve','hague','ha noi','havana','helsinki','hong kong','honolulu','istanbul','jakarta','jerusalem','kuala lampur','lisbon','london','los angeles','luxembourg','madrid','manilla','melbourne','mexico city','milan montreal','moscow','mumbai','munich','nazareth','new york','sydney','trinidad and tabago','chicago','barbados','bora bora'];

let animalsdata=['amur leopard','black rhino','bornean orangutan','cross river gorilla','eastern lowland gorilla','hawksbill turtle','javan rhino','orangutan','saola','sumatran orangutan','sumatran elephant','sumatran rhino','sunda tiger','vaquita','western lowland gorilla','yangtse finless porpoise','african wild dog','asian elephant','black footed ferret','blue whale','bluefin tuna','bonobo','bornean elephant','chimpanzsee','fin whale','galapagos penguin','ganges river dolphin','green turtle','hectors dolphin','humphead wrasse','indian elephant','indus river dolphin','irrawaddy dolphin','mountain gorilla','north atlantic right whale','red panda','sea lions','sea turtles','bigeye tuna','giant tortoise','white lion','anaconda','dugong','great white shark','hippopotamus','leatherback turtle','great one horned rhinoceros','snow leopard','southern rockhopper penguin','albacore tuna','beluga','plains bison','arctic fox'];

let fooddata=['kabuli pulao','couscous','meat pie','weiner schnitzel','plov','fish and rice','moules frites','belizean rice and beans','cevapi','feijoada','poutine','pastel de choclo','peking duck','gallo pinto','ropa vieja','frikadellar','ceviche','fish and chips','chicken tikka masala','succotash','crepe','khachapuri','sauerbraten','moussaka','goulash','biryani','tandoori chicken','masala dosa','nasi goreng','butter chicken','chelo kebab','irish stew','falafel','lasagna','polenta','aloco','japanese curry','japanese sushi','ramen','kibbeh','nasi lemak','dholl puri','barbaguian','mamaliga','tagine','dal bhaath','stamppot','pavlova','gallo pinto','kimchi','ceviche','chicken adobo','bigos'];

let videogamesdata=['pokemon go','borderlands two','divinity original sin two','dishonoured','final fantasy seven','assassins creed four','monkey island two','burnout three','fallot two','undertale','super mario world','the legend of zelda','portal two','super metroid','tetris','half life teo','red dead redemption','super mario sixty four','grand theft auto five','castlevania','halo two','street fighter two','portal','chrono trigger','the last of us','metal gear solid three','minecraft','sid meiers civilization four','bioshock','the witcher three','god of war','shadow of the colossus','resident evil four','metroid prime','bloodborne','fallout new vegas','world of warcraft','starcarft','diablo two','left four dead two','eathbound','counter strike','ms pack man','baldurs gate two','overwatch','uncharted two','batman arkham city','rise of the tomb raider','call of duty modern warfare','splinter cell chaos theory','donkey kong','rock band','spelunky'];

let musicdata=['the twist','mack the knife','uptown funk','how do i live','party rock anthem','i gotta feeling','macarena','shape of you','you light up my life','hey jude','closer','we belong together','unbreak my heart','bette davis eyes','tonights the night','you were meant for me','i do it for you','i will make love to you','le freak','how deep is your love','eye of the tiger','we found love','just want to be your everything','every breath you take','somebody that i used to know','despacito','rolling in the deep','tossin and turning','the battle of new orleans','one sweet day','truly madly deeply','lets get it on','another one bites the dust','how you remind me','shadow dancing','call me maybe','blurred lines','candle in the wind','i will always love you','end of the road','let me love you','tik tok','gold digger','all about that bass','the boy is mine','i love rock n rolln','moves like jagger','ebony and ivory','thats what freinds are for','upside down','just the way you are','i heard it through the grapevine','youre still the one','billie jean','all night long','waiting for a girl like you','family affair'];

