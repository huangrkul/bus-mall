# Bus-Mall
Class 201 Week 3 Project

## User Story - User
**As a user, I would like to display three random products by chance so that the viewers can pick a favorite.**
- Create a constructor function that creates an object associated with each product, and has the following properties:
- Name of the product
- Filepath of image
- Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
- Attach an event listener to the section of the HTML page where the images are going to be displayed.
- Once the users ‘clicks’ a product, generate three new products for the user to pick from. Confirm that these products are not duplicates from the immediate previous selection.

**As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.**
- Add onto your constructor function a property to hold the number of times a product has been clicked.
- After every selection by the viewer, update the newly added property to reflect if it was clicked.

**As a user, I would like to track how many times a product has appeared in a voting session so that I can track analytics on each piece of data.**
- Add an additional property to your constructor function that tracks the number of times the product has been shown.
- Update this new property every time the product is shown as one of the three options on the screen for the viewer to choose.

**As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.**
- By default, the user should be presented with 25 rounds of voting before ending the session.
- Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

**As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.**
- Create a prototype property attached to the product object that keeps track of all the products that are currently being considered.
- After voting rounds have been completed, remove the event listeners on the products
- Display the list of all the products followed by the votes received and number of times seen for each. Example: Banana Slicer had 3 votes and was seen 5 times

**As a user, I would like my data to persistently track totals between page refreshes, so that I can keep track of the aggregate number of votes.**
- Implement local storage into your current application
- Make sure the data persists across both browser refreshes and resets

## User Story - Marketing Manger
**As a marketing manager, I would like a visual representation of how many times a product was clicked so that I can visually analyze the results.**
- Using ChartJS (imported from CDN), display the vote totals in a bar chart. (hint: don’t forget about the <canvas> tags)
- Place the bar chart in the section located beneath your three product images
