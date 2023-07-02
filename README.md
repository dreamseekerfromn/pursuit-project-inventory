# Pursuit Inventory Project

## Object
A mocking webpage for game inventory management which is created during Pursuit Module 2.

## Details About This Project
This project is just mock page so currently, it does not contain any database (no MongoDB, jquery, sql and etc).
This project was built w/ pure javascript, HTML5 w/ DOM manipulation.
Since it is just a mock page, an item accepts only 5 fields; name, price, description, image url, platform, and description.
For the URL field, the user must type whole url includes https:// (does not accept http://) but for the url, used basic html attribute to check validity.

All the error messages will be placed in the <p> tag which has a class name "err".

Image url can be null, but all other fields must be filled.

## Stretch Goal That Was Made in This Project
A simple transition effect is added to the table row. When hovering the mouse to a table, the indicated item row will show some hidden properties w/ 0.5 sec transition effect.
Also, a user typed negative values for price & stock, it will automatically change to 0.

Footer w/ fixed position is added too.

Hovering on certain buttons will change cursor to pointer.

## ToDo
The first goal must be adopting db to make this project actual funtional inventory page.
The second goal is adding more events to change the values directly by clicking the data.
Also, the event handling code should be optimized.
