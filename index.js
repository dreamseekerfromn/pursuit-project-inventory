
var idCount = 0;
function submitEvent(){
    
    const form = document.querySelector(".new_item");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const classname = ["item_id", "item_name", "item_price", "item_stock", "item_desc"];
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
        const tr = document.createElement("tr");
        for(let i = 0; i < 5; i++){
            const td = document.createElement('td');
            td.textContent = `${arrData[i]}`;
            td.setAttribute("class", classname[i])
            tr.appendChild(td);
        }
        const removeB = document.createElement("td");
        const button = document.createElement("button");
        const buttonText = document.createTextNode("REMOVE");
        button.appendChild(buttonText);
        button.addEventListener("click", event=>{
            tr.remove();
        });
        tr.appendChild(button);
        table.appendChild(tr);
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

function reset(){
    const form = document.querySelector(".new_item");
    const reset = document.querySelector("#new_item_reset");
    reset.addEventListener("click",e => {
        form.reset();
    })
}

reset();