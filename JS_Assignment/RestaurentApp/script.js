let table = [
    {
        id: 1,
        name: "Table 1",  
        totalItems: Array.from(new Map([])), //[item_id,quantity] new Map([[1,2], [2,3]])
        cost: 0,
    },
    {
        id: 2,
        name: "Table 2",
        totalItems: Array.from(new Map([])),
        cost: 0,
    },
    {
        id: 3,
        name: "Table 3",
        totalItems: Array.from(new Map([])),
        cost: 0,
    },
  ]
  
  let items = [
    {
        id: 1,
        name: "Chicken Biryani",
        description: "",
        price: 300,
    },
    {
        id: 2,
        name: "French Fries",
        description: "",
        price: 400,
    },
    {
        id: 3,
        name: "Chicken Tikka",
        description: "",
        price: 250,
    },
    {
        id: 4,
        name: "Burger",
        description: "",
        price: 270,
    },
    {
        id: 5,
        name: "Egg Roll",
        description: "",
        price: 80,
    },
    {
        id: 6,
        name: "Chicken Roll",
        description: "",
        price: 80,
    },
    
  
  ]
  
  /* Storing Data into Local Storage */
  
  if (!localStorage.getItem("tables")) {
    localStorage.setItem("tables", JSON.stringify(table));
  }
  if (!localStorage.getItem("items")) {
    localStorage.setItem("items", JSON.stringify(items));
  }
  
  
  displayTables();
  displayItems();
  
  // Function to display Table card
  function displayTables() {
  
    if (document.querySelectorAll('.table-card').length != 0) {
        let menu = document.querySelectorAll('.table-card');
        for (let i = 0; i < menu.length; i++) {
            menu[i].remove();
        }
    }
  
    let table_data = JSON.parse(localStorage.getItem("tables"));
  
  
    let tbl_div = window.parent.document.querySelector('.table-cards');
    for (let i = 0; i < table.length; i++) {
        let tbl = `<div class="table-card" onclick="table_details(${table_data[i].id});" id="table${i}" ondragover="dragOver(event)" ondrop="drop(event)">
        <div class="card-body tbl-card">
            <h3 class="card-title">Table-${table_data[i].id}</h3>
            <div class="tbl-detail">
                <p id="price-area">Total Cost : ${table_data[i].cost} </p>
                <p id="items-area">Total Items : ${table_data[i].totalItems.length}</p>
            </div>
        </div>
        </div>`;
        tbl_div.insertAdjacentHTML("beforeend", tbl);
    }
  }
  
  
  // function to display item 
  function displayItems() {
  
    let items_data = JSON.parse(localStorage.getItem("items"));
  
    let items_div = window.parent.document.querySelector('.Menu-Cards');
  
    for (let i = 0; i < items.length; i++) {
        let tbl = `<div class="item-card" draggable="true" id="item${i}" ondragStart= "dragStart(event)" ondragEnd="dragEnd(event)">
        <div class="card-body">
            <h3 class="card-title">${items_data[i].name}</h3>
            <p class="card-text">${items_data[i].description}</p>
            <p class="">&#8377;${items_data[i].price}</p>
        </div>
        
    </div>`;
  
        items_div.insertAdjacentHTML("beforeend", tbl);
    }
  }
  
  var dragItems = document.querySelectorAll(".item-card");
  
  let count = 0;
  for (var i = 0; i < dragItems.length; i++) {
      dragItems[i].addEventListener("dragstart", dragStart);
      dragItems[i].addEventListener("dragend", dragEnd);
      
  }
  
  function dragStart(event) {
    
    event.dataTransfer.setData("text/plain", event.target.id); //// Set the data that is  being dragged
  }
  
  function dragEnd(event) {
  }
  
  function dragOver(event) {
      event.preventDefault();
  }
  
  function drop(event) {
    console.log("dropped called");
    event.preventDefault();
    console.log("dropped : "+event.target.id);
    let data = event.dataTransfer.getData("text/plain");
    let droppedElement = document.getElementById(data);
    event.currentTarget.style.border = "none";
    let item_id = parseInt(droppedElement.id.replace("item", ""));   // doubt
    let table_idx = parseInt(event.currentTarget.id.replace("table", "")); //doubt
  
  
  
    let table_data = JSON.parse(localStorage.getItem("tables"));
    let map_data = new Map(table_data[table_idx].totalItems);
  
    table_data[table_idx].cost += items[item_id].price;
  
  
    if (map_data.has(item_id)) {
        let val = map_data.get(item_id);
        map_data.set(item_id, val + 1);
    }
    else {
        map_data.set(item_id, 1);
    }
  
    table_data[table_idx].totalItems = Array.from(map_data);
    localStorage.setItem("tables", JSON.stringify(table_data));
    console.log("idx : "+table_idx);
    updateTable(table_idx);
    console.log("sjd vskjv ");
  }
  
  function updateTable(table_idx) {
    console.log("update : "+table_idx);
    let table_data = JSON.parse(localStorage.getItem("tables"))[table_idx];
    console.log("table data : "+table_data);
    let table_cont = document.querySelector(`#table${table_idx}`);
    console.log("table_cont "+table_cont);
    let price_area = table_cont.querySelector('#price-area');
    let items_area = table_cont.querySelector('#items-area');
    price_area.innerHTML = `Total Cost : ${table_data.cost}`;
  
    items_area.innerHTML = `Total Items : ${table_data.totalItems.length}`;
  
    console.log("endsksjj s");
  }
  
  
  
  
  // Applying search functionality on Table-Card
  
  const searchBox = document.getElementById("search-box");
  const tableCards = document.querySelectorAll(".table-card");
  console.log("tabklecard :" +tableCards);
  searchBox.addEventListener("input", searchTable);
  
  function searchTable() {
    const query = searchBox.value.toLowerCase();
  
    tableCards.forEach((item) => {
      const name = item.querySelector("h3").textContent.toLowerCase();
      if (name.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  
  // Applying search functionality on Items
  
  const searchInput = document.querySelector(".menu-search input");
  const menuItems = document.querySelectorAll(".item-card");
  
  searchInput.addEventListener("input", updateMenu);
  
  function updateMenu() {
    const query = searchInput.value.toLowerCase();
    menuItems.forEach((item) => {
      const name = item.querySelector("h3").textContent.toLowerCase();
      if (name.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  
  
  /* Model and details will into the model will show after clickng on table card */
  
  function table_details(num) {
    let myModal = new bootstrap.Modal(document.getElementById('tableModal'), {
        keyboard: true
    });
    myModal.show();
    updateDetails(num);
  }
  
  function updateDetails(num) {
    let table_data = JSON.parse(localStorage.getItem("tables"));
  
    let tble_modal = document.querySelector(`#tableModal`);
    tble_modal.classList.add(`table_modal${num - 1}`);
    let modal_title = tble_modal.querySelector(`.modal-title`);
    let bill_modal_body = tble_modal.querySelector('.bill_modal_body');
  
    let modalContent = tble_modal.querySelector('.modal-content');
    modalContent.setAttribute("id", `table${num - 1}`)
    let table_body = bill_modal_body.querySelector('.table-body');
  
    modal_title.innerHTML = `Table - ${num} | Order Details`;
    if (table_body) {
        table_body.innerHTML = "";
    }
  
    if (table_data[num - 1].totalItems.length < 1) {
        table_body.innerHTML = "<p>No Items Found!</p>";
    }
  
    let total_items = new Map(table_data[num - 1].totalItems);
    let idx = 1;
    for (let key of total_items.keys()) {
        let table_tr = document.createElement('tr');
  
        let sno_td = document.createElement('td');
        sno_td.innerHTML = idx;
        table_tr.appendChild(sno_td);
  
        let item_td = document.createElement('td');
        item_td.innerHTML = items[key].name;
        table_tr.appendChild(item_td);
  
  
        let price_td = document.createElement('td');
        price_td.innerHTML = items[key].price;
        table_tr.appendChild(price_td);
  
        let qty_td = document.createElement('td');
        let quantity_input = document.createElement('input');
        quantity_input.setAttribute('min', 1);
        quantity_input.setAttribute('type', "number");
        quantity_input.setAttribute("id", "item_qty");
        quantity_input.setAttribute("class", `table${num - 1}`);
        quantity_input.setAttribute("onchange", `quantity_change(${items[key].id},this.value, this.className)`);
        quantity_input.value = total_items.get(key);
        qty_td.appendChild(quantity_input);
        table_tr.appendChild(qty_td);
  
        let delete_td = document.createElement('td');
        let del_btn = document.createElement('button');
        del_btn.setAttribute("id", "del_btn");
        del_btn.setAttribute("onclick", `del_btn(${table_data[num - 1].id}, ${items[key].id})`);
        del_btn.textContent = "delete";
        delete_td.appendChild(del_btn);
  
  
        table_tr.appendChild(delete_td);
  
        table_body.appendChild(table_tr);
  
        idx++;
    }
  
  }
  
  /* Updating details After deleting items from Total Items Modal*/
  function del_btn(table_id, item_id) {
    table_id--;
    item_id--;
  
    let table_data = JSON.parse(localStorage.getItem("tables"));
  
    let map_items = new Map(table_data[table_id].totalItems);
    if (table_data[table_id].cost > 0) {
        table_data[table_id].cost -= items[item_id].price * (map_items.get(item_id));
    }
  
    map_items.delete(item_id);
    table_data[table_id].totalItems = Array.from(map_items);
    localStorage.setItem("tables", JSON.stringify(table_data));
    updateTable(table_id);
    updateDetails(table_id + 1);
  }
  
  /* update cost and other details on change of quantity  */
  function quantity_change(item_id, item_qty, table_no) {
    let table_data = JSON.parse(localStorage.getItem("tables"));
    table_no = parseInt(table_no.replace("table", ""));
    let map_data = new Map(table_data[table_no].totalItems);
    map_data.set(item_id - 1, item_qty);
    let new_cost = calculateCost(map_data);
    table_data[table_no].totalItems = Array.from(map_data);
    table_data[table_no].cost = new_cost;
    localStorage.setItem("tables", JSON.stringify(table_data));
    updateTable(table_no);
  }
  
  /* Calculate new cost after change in order details.*/
  function calculateCost(map_data) {
    let new_cost = 0;
    for (let [key, val] of map_data.entries()) {
        new_cost += (items[key].price * val);
    }
    return new_cost;
  }
  
  /* open Modal to Generate the Final Bill*/
  let bill_generate_btn = document.querySelector('#generate_bill_btn');
  
  bill_generate_btn.addEventListener('click', (e) => {
  
      var myModal = new bootstrap.Modal(document.getElementById('generate_bill_Modal'), {
          keyboard: true
      })
      myModal.show();
  
      const generate_bill_Modal = document.getElementById('generate_bill_Modal');
  
      
      const name = generate_bill_Modal.querySelector('#generate_bill_ModalLabel');
  
      let table_data = JSON.parse(localStorage.getItem("tables"));
  
      let parentModal = e.target.parentNode.parentNode.parentNode;
  
      let parentModalId = parentModal.querySelector('.modal-content').id;
  
      let table_no = parseInt(parentModalId.replace("table", ""));
      generate_bill_Modal.classList.add(`bill_modal${table_no}`);
      name.innerText = `Table ${table_no + 1} Bill`;
  
      let total_items = new Map(table_data[table_no].totalItems);
  
      if (total_items.size == 0) {
          generate_bill_Modal.querySelector(`tbody`).innerHTML = "";
      }
      else {
          generate_bill_Modal.querySelector(`tbody`).innerHTML = "";
      }
  
      let modal_body = generate_bill_Modal.querySelector(`tbody`);
  
      let idx = 1;
      for (let [key, value] of total_items.entries()) {
          let table_tr = document.createElement('tr');
          let sno_td = document.createElement('td');
          sno_td.innerText = idx++;
          table_tr.appendChild(sno_td);
  
          let item_td = document.createElement('td');
          item_td.innerText = items[key].name;
          table_tr.appendChild(item_td);
  
          let qty_td = document.createElement('td');
          qty_td.innerText = value;
          table_tr.appendChild(qty_td);
  
          let cost_td = document.createElement('td');
          cost_td.innerText = items[key].price * value;
          table_tr.appendChild(cost_td);
  
          modal_body.appendChild(table_tr);
      }
  
      let total_cost = document.createElement('p');
      total_cost.innerText = "Total Cost : " + table_data[table_no].cost;
  
      modal_body.appendChild(total_cost);
  
      table_data[table_no].cost = 0;
      table_data[table_no].totalItems = Array.from(new Map([]));
      localStorage.setItem("tables", JSON.stringify(table_data));
  
      let close_btn = generate_bill_Modal.querySelector('#close_btn');
      close_btn.setAttribute("onclick", `updateTable(${table_no})`);
  
      let close_btn1 = generate_bill_Modal.querySelector('#close_btn1');
      close_btn1.setAttribute("onclick", `updateTable(${table_no})`);
  
      let table_cont = document.querySelector(`#table${table_no}`);
  });
  
  
  // Highlighting the table whose detail is shown
  let tableModal = document.querySelector('#tableModal');
  tableModal.addEventListener('hidden.bs.modal', () => {
      let table_no = parseInt(tableModal.classList[2].replace("table_modal", ""));
      let table = document.querySelector(`#table${table_no}`);
      tableModal.classList.remove(`table_modal${table_no}`);
      table.style.backgroundColor = "white";
      table.style.color = "black";
  });
  
  tableModal.addEventListener('shown.bs.modal', () => {
      let table_no = parseInt(tableModal.classList[2].replace("table_modal", ""));
      let table = document.querySelector(`#table${table_no}`);
      table.style.color = "#ff2121";
  });
  
  
  // hghlighting the table whose Bill Modal is shown
  const generate_bill_Modal = document.getElementById('generate_bill_Modal');
  generate_bill_Modal.addEventListener('hidden.bs.modal', () => {
      let table_no = parseInt(generate_bill_Modal.classList[2].replace("bill_modal", ""));
      let table = document.querySelector(`#table${table_no}`);
      generate_bill_Modal.classList.remove(`bill_modal${table_no}`);
      table.style.backgroundColor = "white";
      table.style.color = "black";
  });
  
  generate_bill_Modal.addEventListener('shown.bs.modal', () => {
      let table_no = parseInt(generate_bill_Modal.classList[2].replace("bill_modal", ""));
      let table = document.querySelector(`#table${table_no}`);
      table.style.color = "#ff2121";
  });
  