// Gets the form, ordered list and the clear button
const form = document.querySelector('#form');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear-btn');
let count = 1;
let str = "\u2713"; // unicode for tick symbol
const doneText = '- completed ';

form.addEventListener('submit', addItem); 

function addItem(e) {
    // prevents the form from submitting and refreshing the page
    e.preventDefault();

    const newItem = document.querySelector('#add-item').value;

    // Creates a new list item
    if (count > 0) {

        const addItem = document.querySelector('#add-item').value;

        if (addItem === '') {
            alert('Please add an item.');
            return;
        }

        // Creates the delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerText = '❌';

        // Creates the done button
        const doneButton = document.createElement('button');
        doneButton.className = 'done-btn';
        doneButton.innerText = 'Done';

        // Creates a list element that increases in increments of 1 when items are added to it by the user
        const listElement = document.createElement('li');
        listElement.className = 'listInput';
        listElement.innerText = count + '. ' + newItem;

        // Creates a container for each item submitted by the user that contains the actual item along with its position in the queue (count), a delete button and a done button.
        const container = document.createElement('div');
        container.className = 'listLineContainer';
        container.appendChild(listElement);
        container.appendChild(deleteButton);
        container.appendChild(doneButton);

        // Allows the delete button to remove the item it is paired with
        deleteButton.addEventListener('click', function() {
            container.remove();
            // Update count value of remaining containers (reorders the list when removing an item from it)
            const containers = document.querySelectorAll('.listLineContainer');
            containers.forEach(function(container, index) {
                const listElement = container.querySelector('.listInput');
                listElement.innerText = (index + 1) + '. ' + listElement.innerText.slice(listElement.innerText.indexOf(' '));
            });
            count--;
            // Allows a toast message to appear once an item has been deleted for 3 seconds that notifies the user that the item has been deleted
            const deleteToast = document.getElementById('deleteToast');
            deleteToast.classList.add('show');
            setTimeout(() => {
                deleteToast.classList.remove('show');
            }, 3000);
        }); 

        // Replaces both the delete and the done button with the doneTextElement which contains the doneText + str variables
            doneButton.addEventListener('click', function() {
            const doneTextElement = document.createElement('span');
            doneTextElement.className = 'doneText';
            doneTextElement.innerText = doneText + str;
            container.replaceChild(doneTextElement, deleteButton);
            container.replaceChild(doneTextElement, doneButton);
        });

        // Adds everything that is created in the container to the list
        itemList.appendChild(container);
        
    } 

    count++;

    // Resets the input field
    document.querySelector('#add-item').value = '';
}

clearBtn.addEventListener('click', clearList);

// Gives the clear list button a function
function clearList() {
    count = 0;
    itemList.innerHTML = '';
    // Allows a toast message to appear once the list has been cleared to let the user know that it was successfully cleared
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}  
