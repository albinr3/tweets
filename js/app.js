//Variables
const form = document.querySelector("#formulario");
const tweetList = document.querySelector("#lista-tweets");
let tweetsArray = [];

eventlisteners();

//eventlisteners
function eventlisteners() {
    //save the tweets
    form.addEventListener("submit", addTweets);

    //load the tweets
    document.addEventListener("DOMContentLoaded", loadLocal);

};



//functions

function addTweets(e) {
    e.preventDefault();

    //textarea where user write
    const tweet = document.querySelector("#tweet").value;
    if(tweet === "") {
        showError("No puede ir vacio");
        return; //prevent more code lines get ejecuted
    }

    const tweetObj = {
        id : Date.now(),
        tweet //we does not use the value, because is the key and the value is the same, we can use only the key. 
    };

    //add tweet to the list
    tweetsArray = [...tweetsArray, tweetObj];
    
    //write the HTML
    createHtml(tweetsArray);

    //add tweets to localstorage
    addToLocalStorage(JSON.stringify(tweetsArray));

    //reset the form after add a new tweet
    form.reset();

};

//show an error in the html
function showError(error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = error;
    errorMessage.style.color = "white";
    errorMessage.style.backgroundColor = "red";
    errorMessage.style.textAlign = "center";
    form.appendChild(errorMessage);

    //delete the error after 3.5 sec
    setTimeout( () => errorMessage.remove(), 3500);
};

//create html
function createHtml(tweetlist) {

    if(tweetlist.length > 0) {
        clearHtml();
        tweetlist.forEach(element => {
            //adding a delete button
            const deleteBtn = document.createElement("a");
            deleteBtn.classList.add("borrar-tweet");
            deleteBtn.textContent = "X";

            //delete tweets
            deleteBtn.onclick = () => deleteTweet(element.id);



            //adding the tweet
            const tweet = document.createElement("li");
            tweet.textContent = element.tweet;
            tweetList.appendChild(tweet);

            //adding the btn to the tweet
            tweet.appendChild(deleteBtn);
            
        });

        }
};

//clear html
function clearHtml() {
    while(tweetList.firstChild) {
        tweetList.removeChild(tweetList.firstChild);
    }
};

//add tweets to localstorage

function addToLocalStorage(element) {
    localStorage.setItem("tweets", element);
};

//load tweets, from the localstorage and create the html
function loadLocal() {
   tweetsArray = JSON.parse(localStorage.getItem("tweets")) || []; //if tweets does not exist, it make an empty array
   createHtml(tweetsArray);
};

//delete a tweet from localstorage
function deleteTweet(id) {
    tweetsArray = tweetsArray.filter( tweet => tweet.id !== id); //get all the tweets except the one you delete and update the array

    //update the html
    createHtml(tweetsArray);

    //update tweets to localstorage
    addToLocalStorage(JSON.stringify(tweetsArray));
};