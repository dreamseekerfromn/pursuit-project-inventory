
var idCount = 0;
function submitEvent(){
    
    const form = document.querySelector(".new_item");

    form.addEventListener("submit", e => {
        e.preventDefault();
        //let todo = e.target.todo.value;
        const result = document.querySelector(".inventory_page");
        const err = document.querySelector("#new_item_err");
        const arrData = [];
        arrData.push(idCount);
        arrData.push(e.target.new_item_title.value);
        arrData.push(e.target.new_item_price.value);
        arrData.push(e.target.new_item_stock.value);
        arrData.push(e.target.new_item_desc.value);
        
        const p = document.querySelector(".item_list");

        const table = document.createElement("table");
        //const item = `<tr><td>${idCount}</td><td>${itemN}</td><td>${itemP}</td><td>${itemS}</td><td>${itemD}</td></tr>`;

        for(let i = 0; i < 5; i++){
            const td = document.createElement('td');
            td.textContent = `${arrData[i]}`;
            table.appendChild(td);
        }

        p.append(table);
        idCount++;
        /*if(!todo){
        err.textContent = "Error! To do cannot be empty!";
        }
        else{
            err.textContent = "";
            const li=document.createElement("li");
            li.setAttribute("class", "todo_list");
            li.textContent = todo;
            li.addEventListener("click", event => {    
                if(li.style.textDecoration == "line-through"){
                    li.style.textDecoration = null;
                }
                else{
                    li.style.textDecoration = "line-through";
                }
            })
            result.appendChild(li);
        }*/
        
        form.reset();
    });
}

submitEvent();