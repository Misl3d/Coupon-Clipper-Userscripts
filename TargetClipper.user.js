// ==UserScript==
// @name         Target
// @namespace    http://tampermonkey.net/
// @version      2024-09-18
// @description  Target Circle Coupon Clipper
// @author       Misl3d
// @match        *://www.target.com/circle/deals
// ==/UserScript==
// jshint esversion: 6

function runSelect(event) {
  event.preventDefault();

// Select all elements with the data-test attribute equal to 'offer-grid-card'.
var gridCards = document.querySelectorAll('[data-test="offer-grid-card"]');
console.log(gridCards.length + ' coupons found');
var clicked = 0;

// Iterate over each grid card.
for (var card of gridCards) {
    // Find the button inside the card that contains the text "Apply".
    var applyButton = Array.from(card.querySelectorAll('button')).find(btn => btn.textContent.includes('Apply'));

    // If the button is found, click it.
    if (applyButton) {
        applyButton.click();
        clicked++;
    }
}

console.log(clicked + ' coupons clicked');

}

function insertButton(btn, nextBtn) {
  function waitForSite() {
    var targetelem = document.getElementsByClassName('sc-38c8f230-0 hCgzsm');
    if (targetelem !== null && targetelem[0] !== undefined) {
      clearInterval(waitForSiteTimer);
      targetelem[0].parentNode.insertBefore(btn, targetelem[0]);
      if (nextBtn) {
        targetelem[0].parentNode.insertBefore(nextBtn, btn.nextSibling);
      }
    }
  }

  // Wait for site to finish loading before inserting button.
  var waitForSiteTimer = setInterval(waitForSite, 100);
}

function init() {
  // Make a new button for our action.
  var newbutton = document.createElement('button');
  newbutton.name = 'load_all_to_card';
  newbutton.id = 'load_all_to_card';
  newbutton.style.cssText = 'background-color: #fff; color: #E82A24; font-weight: 700; border: solid #E82A24; padding: 6px 10px; cursor: pointer; margin: 5px';

  newbutton.addEventListener('mouseenter',
    () => {
      newbutton.style.color = '#fff';
      newbutton.style.backgroundColor = '#E82A24';
    }
  );

  newbutton.addEventListener('mouseleave',
    () => {
      newbutton.style.color = '#E82A24';
      newbutton.style.backgroundColor = '#fff';
    }
  );

  newbutton.appendChild(document.createTextNode('Load All To Card'));
  newbutton.addEventListener('click', runSelect);

  // Create a new button for "Load All"
  var loadAllButton = document.createElement('button');
  loadAllButton.name = 'load_all';
  loadAllButton.id = 'load_all';
  loadAllButton.style.cssText = 'background-color: #fff; color: #000; font-weight: 700; border: solid #000; padding: 6px 10px; cursor: pointer; margin: 5px';

  loadAllButton.addEventListener('mouseenter',
    () => {
      loadAllButton.style.color = '#fff';
      loadAllButton.style.backgroundColor = '#000';
    }
  );

  loadAllButton.addEventListener('mouseleave',
    () => {
      loadAllButton.style.color = '#000';
      loadAllButton.style.backgroundColor = '#fff';
    }
  );

  loadAllButton.appendChild(document.createTextNode('Load All'));
  loadAllButton.addEventListener('click', LoadAll); // Assuming LoadAll is defined elsewhere

  insertButton(newbutton, loadAllButton);
}

init();


function LoadAll() {
    'use strict';

    // Function to simulate a click on the button
    function clickLoadMoreButton() {
        var buttons = document.querySelectorAll('button');
        buttons.forEach(function(button) {
            if (button.textContent.trim().toLowerCase() === 'load more') {
                button.click();
                return false;
            }
        });
    }

    // Click the "Load More" button initially
    clickLoadMoreButton();

    // Set interval to click the "Load More" button repeatedly
    var intervalId = setInterval(clickLoadMoreButton, 1000);

    // Check if there are no more "Load More" buttons on the page, if so, clear the interval
    var checkExist = setInterval(function() {
        var loadMoreButtons = document.querySelectorAll('button');
        var loadMoreExists = false;
        loadMoreButtons.forEach(function(button) {
            if (button.textContent.trim().toLowerCase() === 'load more') {
                loadMoreExists = true;
            }
        });
        if (!loadMoreExists) {
            clearInterval(intervalId);
            clearInterval(checkExist);
            window.scrollTo(0, 2100);
            alert("No more 'Load More' buttons found.");

        }
    }, 3000); // Delay added here, change the delay as per your requirement
}

