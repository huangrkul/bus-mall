# Bus-Mall
Class 201 Week 3 Project

Bus Mall is a web app that allows a user to vote for a product out of three randomly generated ones.  Each vote will trigger three more products (but unique from previous set) to be displayed for the user to vote.  Once user voted 25 times, the session will end and the total number of votes / viewed per product will be displayed below in the form of list and bar chart.

Configurable Setting:
- Number of displayed product.
- Number of rounds per session.

## Day 1 branch - lab11-busmall
- Implemented dynamic products display so it can be any number of images.
- All products currently / previously displayed do not repeat.
- Views and Clicked products are tracked and displayed at the end as a list.
- Default 25 rounds of tries have been implemented.
- After 25 rounds, the products will no longer be clickable.

## Day 2 branch - lab12-chartjs
- Implement chart for BusMall using chart.js
- Refactored the code so that empty list and chart will be generated at the start.
- Once user is done with the app, the list and chart will be populated accordingly.
- Added additional styling across the page.
- Added product image preload in init() to prevent flickering during image swap (caused by image load).

## Day 3 branch - lab13-localstorage
- Enable localStorage to keep data persistent.
- Added ability to parse data from localStorage and re-instantiate from constructor function.
- Added vote again and clear data button.