
var idCount = 1;
function submitEvent(){
    
    const form = document.querySelector(".new_item");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const classname = ["item_id", "item_name", "item_price", "item_stock", "item_desc"];
        
        const result = document.querySelector(".inventory_page");
        const err = document.querySelector("#new_item_err");
        
        let flag = true;
        
        const arrData = [];
        arrData.push(idCount);
        arrData.push(e.target.new_item_title.value);
        arrData.push(e.target.new_item_price.value);
        arrData.push(e.target.new_item_stock.value);
        arrData.push(e.target.new_item_desc.value);
        
        let errMsg = [];

        for(i of arrData){
            if(!i){
                errMsg.push("You must fill out all the information.");
                flag = false;
                break;
            }
        }

        if(Number(arrData[2]) < 0 ){
            errMsg.push("An item price cannot be negative.");
            flag = false;
        }
        if(Number(arrData[3]) < 0){
            errMsg.push("An item stock cannot be negative.");
            flag = false;
        }
        if(flag){
            err.textContent = "";
            const p = document.querySelector(".item_list");

            let table = document.querySelector("table");
            
            const tr = document.createElement("tr");
            for(let i = 0; i < 5; i++){
                const td = document.createElement('td');
                td.textContent = `${arrData[i]}`;
                td.setAttribute("class", classname[i]);
                td.setAttribute("id",`${arrData[i]}${idCount}`);
                if(td.getAttribute("class") == "item_stock"){
                    const decrement = document.createElement("button");
                    decrement.addEventListener("click",event=>{
                        event.preventDefault();
                        td.textContent = (Number(td.textContent) - 1).toString();
                        td.prepend(decrement);
                    })
                    td.prepend(decrement);
                    const increment = document.createElement("button");
                    increment.addEventListener("click", event =>{
                        event.preventDefault();
                        td.textContent = (Number(td.textContent) + 1).toString();
                        td.append(increment);
                    })
                    td.append(increment);
                }
                tr.appendChild(td);
                
            }
            const removeB = document.createElement("td");
            const button = document.createElement("button");
            const buttonText = document.createTextNode("REMOVE");
            button.appendChild(buttonText);
            button.addEventListener("click", event=>{
                tr.remove();
            });
            removeB.appendChild(button);
            tr.appendChild(removeB);

            try{
                table.prepend(tr);
            }catch{
                table = document.createElement("table");
                table.prepend(tr);
                p.append(table);
            }
            
            idCount++;
        }
        else{
            let temp = "";
            for(i of errMsg){
                temp += i;
                temp += `\n\n`;
            }
            err.textContent = temp;
            flag = true;
        }
                
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