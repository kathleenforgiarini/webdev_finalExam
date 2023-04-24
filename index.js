const inventories = JSON.parse(localStorage.getItem('inventories')) || [
    {
        id: 10,
        name: "TR2 trail running shoes – Men",
        quantity: 0,
    },
    {
        id: 20,
        name: "TR2 trail running shoes – Women",
        quantity: 5,
    },
    {
        id: 30,
        name: "Marathon Running Vest",
        quantity: 1,
    },
    {
        id: 40,
        name: "Men’s Trail Running Jacket – Khaki",
        quantity: 2,
    },
    {
        id: 50,
        name: "Trail running bottle holder belt",
        quantity: 0,
    },
    {
        id: 60,
        name: "RUN500 invisible running socks X2",
        quantity: 7,
    },
    {
        id: 70,
        name: "Easynet 3m Badminton net Orange",
        quantity: 0,
    },
    {
        id: 80,
        name: "Badminton Racket - BR 500 Black/Yellow",
        quantity: 0,
    },
    {
        id: 90,
        name: "BS190 Badminton Shoe - Men",
        quantity: 2,
    },
    {
        id: 100,
        name: "Backcountry Skis with Bindings and Skins",
        quantity: 3, 
    }
];

localStorage.setItem('inventories', JSON.stringify(inventories));

function tabInventory() {
    const tbody = document.querySelector("#tabInventory tbody");
    tbody.innerHTML = "";
    inventories.forEach(element => {
        if (element.quantity > 0){ // get only items in stock
            const tr = document.createElement('tr');

            const id = document.createElement('td');
            id.textContent = element.id;
    
            const name = document.createElement('td');
            name.textContent = element.name;
    
            const quantity = document.createElement('td');
            quantity.textContent = element.quantity;
    
            tr.appendChild(id);
            tr.appendChild(name);
            tr.appendChild(quantity);
    
            tbody.appendChild(tr);
    
        }
    });
}
tabInventory()


function selectPurchaseItems() {
    const itemSelected = document.querySelector('#selectItem');

    inventories.forEach(element => {
        const option = document.createElement('option');
        option.value = element.id;
        option.text = element.name;
        itemSelected.appendChild(option);
    });
}
selectPurchaseItems()

const purchaseForm = document.querySelector('#purchaseForm');
purchaseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const itemSelected = document.querySelector('#selectItem').value;
    const quantity = document.querySelector('#quantity').value;

    inventories.forEach(element => {
        if (element.id == itemSelected) {
            element.quantity += parseFloat(quantity); // I need the parseFloat because it was concatenating
        }
    });
    localStorage.setItem('inventories', JSON.stringify(inventories));

    tabInventory()
    selectSaleItems()

    purchaseForm.reset();
});


function selectSaleItems() {
    const itemSaleSelected = document.querySelector('#selectSaleItem');
    itemSaleSelected.innerHTML = "";
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select an item';
    defaultOption.selected = true;
    itemSaleSelected.appendChild(defaultOption);

    inventories.forEach(element => {
        if (element.quantity > 0) {
            const option = document.createElement('option');
            option.value = element.id;
            option.text = element.name;
            itemSaleSelected.appendChild(option);
        }
    });
}
selectSaleItems()

const saleForm = document.querySelector('#saleForm');
saleForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const itemSelected = document.querySelector('#selectSaleItem').value;
    const quantity = document.querySelector('#saleQuantity').value;

    inventories.forEach(element => {
        if (element.id == itemSelected) {
            element.quantity -= parseFloat(quantity);
        }
    });

    localStorage.setItem('inventories', JSON.stringify(inventories));

    tabInventory();
    selectSaleItems()
    saleForm.reset();
});