"use strict";
/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    // console.log(games[i]);
    // create a new div element, which will become the game card
    const div = document.createElement("div");
    // add the class game-card to the list
    div.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    // about each game
    div.innerHTML = `<img class='game-img' src='${games[i].img}'>
        <h2>${games[i].name}</h2>
        <p>${games[i].description}</p>
        `;

    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    // console.log(div);
    // console.log(div.textContent);
    // append the game to the games-container
    gamesContainer.appendChild(div);
  }
}
// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
console.log("Hello World");

// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributors = GAMES_JSON.reduce((contribution, game) => {
  return contribution + game.backers;
}, 0);
console.log(totalContributors); //19187

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributors.toLocaleString("en-US")}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((ammountAccum, game) => {
  return ammountAccum + game.pledged;
}, 0);
console.log(totalRaised);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const numOfGames = GAMES_JSON.length;
console.log(numOfGames);
gamesCard.innerHTML = `${numOfGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => {
    // console.log(game.name);
    // console.log(game.pledged);
    // console.log(game.goal);
    return game.pledged < game.goal;
  });
  //   console.log(unfundedGames);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
  // console.log(unfundedGames);
}
// filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const fundedGames = GAMES_JSON.filter((game) => {
    // console.log(game.name);
    // console.log(game.pledged);
    // console.log(game.goal);
    return game.pledged >= game.goal;
  });
  //   console.log(unfundedGames);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(fundedGames);
}
// filterFundedOnly();

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}
// showAllGames();

// add event listeners with the correct functions to each button
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
// -----------
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);
// -----------
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);
// -----------

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numOfUnfunded = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
}).length;

// console.log(numOfUnfunded); // 7
// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
A total of $${totalRaised.toLocaleString("en-US")} has been raised for ${
  GAMES_JSON.length
} games. Currently, ${numOfUnfunded} remains unfunded. We need your help to fund these amazing Games!`;

// console.log(displayStr);
// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement("p");

paragraph.innerHTML = displayStr;

descriptionContainer.appendChild(paragraph);

// console.log(paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topOne, topTwo, ...rest] = sortedGames;
console.log(sortedGames);
console.log(topOne.name);
console.log(topTwo.name);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("h4");
topGameElement.innerHTML = `${topOne.name}`;
firstGameContainer.appendChild(topGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("h4");
secondGameElement.innerHTML = `${topTwo.name}`;
secondGameContainer.appendChild(secondGameElement);

// Extra Credit: Allow the user to click on a Game Card Which Will perform a google Search w/ the name of that game

// 1) Select the parent element of the game Cards
document
  .getElementById("games-container")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // Determine which event originated the event
    console.log(e.target);

    // Find the Closest Parent that has the class of "game-card"
    const gameCard = e.target.closest(".game-card");

    if (gameCard) {
      const h2Element = gameCard.querySelector("h2");
      if (h2Element) {
        // Log the content of the h2 element
        const h2ElementText = h2Element.textContent;
        console.log(h2ElementText);

        // When the h2 belonging to the card is identified, open it in a google search in a separate window
        window.open(`https://www.google.com/search?q=${h2ElementText}`);
      }
    }
  });

const btnHeaderOurSearch = document.getElementById("our-game-header-button");

btnHeaderOurSearch.addEventListener("click", function (e) {
  console.log("Clicked");
  const gamesContainer = document.querySelector(".games-list");
  gamesContainer.scrollIntoView({
    behavior: "smooth",
  });
});
