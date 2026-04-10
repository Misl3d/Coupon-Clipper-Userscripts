// ==UserScript==
// @name         Target
// @namespace    http://tampermonkey.net/
// @version      2026-04-10
// @description  Target Circle Coupon Clipper
// @author       Misl3d
// @match       https://www.target.com/deals/all*
// @updateURL    https://github.com/Misl3d/Coupon-Clipper-Userscripts/raw/main/TargetClipper.user.js
// @downloadURL  https://github.com/Misl3d/Coupon-Clipper-Userscripts/raw/main/TargetClipper.user.js
// ==/UserScript==
// jshint esversion: 6

function init() {
    var btn = document.createElement('button');
    btn.id = 'clip_all';
    btn.textContent = 'Clip All';
    btn.style.cssText = `
        background-color: #fff;
        color: #E82A24;
        font-weight: 700;
        border: solid #E82A24;
        padding: 6px 10px;
        cursor: pointer;
        margin: 5px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
    `;

    btn.addEventListener('mouseenter', () => {
        btn.style.color = '#fff';
        btn.style.backgroundColor = '#E82A24';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.color = '#E82A24';
        btn.style.backgroundColor = '#fff';
    });

    btn.addEventListener('click', ClipAll);
    document.body.appendChild(btn);
}

init();

function ClipAll() {
    'use strict';

    const btn = document.getElementById('clip_all');
    btn.textContent = 'Loading...';
    btn.disabled = true;

    function clickLoadMoreButton() {
        const buttons = document.querySelectorAll('button');
        for (const button of buttons) {
            if (button.textContent.trim().toLowerCase().includes('load more')) {
                button.click();
                return true;
            }
        }
        return false;
    }

    clickLoadMoreButton();

    var intervalId = setInterval(clickLoadMoreButton, 2000);

    var missingCount = 0;
    var checkExist = setInterval(function () {
        const buttons = document.querySelectorAll('button');
        const loadMoreExists = Array.from(buttons).some(b =>
            b.textContent.trim().toLowerCase().includes('load more')
        );

        if (!loadMoreExists) {
            missingCount++;
            if (missingCount >= 3) {
                clearInterval(intervalId);
                clearInterval(checkExist);
                window.scrollTo(0, 2100);

                btn.textContent = 'Clipping...';

                var gridCards = document.querySelectorAll('[data-test="offer-card"]');
                console.log(gridCards.length + ' coupons found after full load');
                var clicked = 0;

                for (var card of gridCards) {
                    var applyButton = Array.from(card.querySelectorAll('button')).find(b => b.textContent.includes('Apply'));
                    if (applyButton) {
                        applyButton.click();
                        clicked++;
                    }
                }

                console.log(clicked + ' coupons clipped');
                btn.textContent = clicked + ' Clipped!';
                btn.disabled = false;
            }
        } else {
            missingCount = 0;
        }
    }, 3000);
}
