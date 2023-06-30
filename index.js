/* a global variable to handle id, to prevent malfunctioning w/ falsey value, it must start w/ 1 */ 
var idCount = 1;

/**
 * submitEvent()
 * ------------------------
 * interacting w/ the submit button in the form
 */
function submitEvent(){
    
    const form = document.querySelector(".new_item");

    /** an event handling for form */
    form.addEventListener("submit", e => {
        e.preventDefault();

        /* declaring some variables & quries */
        const classname = ["item_id", "item_name", "item_price", "item_stock", "item_desc"];
        const err = document.querySelector("#new_item_err");
        let flag = true;
        let errMsg = [];
        const arrData = [];

        /* receive data from the form */
        arrData.push(idCount);
        arrData.push(e.target.new_item_title.value);
        arrData.push(e.target.new_item_price.value);
        arrData.push(e.target.new_item_stock.value);
        arrData.push(e.target.new_item_desc.value);
        
        /* empty data checking */
        for(i of arrData){
            if(!i){
                errMsg.push("You must fill out all the information.");
                flag = false;
                break;
            }
        }

        /* checking for negative numbers */
        if(Number(arrData[2]) < 0 ){
            errMsg.push("An item price cannot be negative.");
            e.target.new_item_price.value = 0;
            flag = false;
        }
        if(Number(arrData[3]) < 0){
            errMsg.push("An item stock cannot be negative.");
            e.target.new_item_stock.value = 0;
            flag = false;
        }

        if(flag){
            /* erase error msg block */
            err.textContent = "";
            err.setAttribute("style","display:none;")

            /* queries */
            const p = document.querySelector(".item_list");
            let table = document.querySelector("table");

            /* create a table row for the data */
            const tr = document.createElement("tr");

            /* create td & events */
            for(let i = 0; i < 5; i++){
                const td = document.createElement('td');
                const spanText = document.createElement('span');
                spanText.setAttribute('class', classname[i]);
                spanText.textContent = `${arrData[i]}`;
                td.appendChild(spanText);
                td.setAttribute("class", classname[i]);
                td.setAttribute("id",`${classname[i]}${idCount}`);

                if(spanText.getAttribute("class") == 'item_desc'){
                    spanText.className = "item_desc_span";
                    const urlImage = document.createElement('img');
                    urlImage.setAttribute("src",e.target.url.value);
                    const platform = document.createElement('span');
                    platform.className = 'item_platform';
                    platform.textContent = e.target.platform.value;
                    td.prepend(urlImage);
                    td.append(platform);
                }

                /* this big block of codes are belong to stock field */
                if(td.getAttribute("class") == "item_stock"){
                    /* empty text content, we need bunch of spans */
                    spanText.textContent = "";
                    td.setAttribute("value", arrData[i]);

                    /* inStock, Out of Stock status */
                    const status = document.createElement("span");
                    const statusTd = document.createElement("td");
                    statusTd.className = `status`;
                    status.className = `status${idCount}`;
                    statusTd.appendChild(status);
                    tr.appendChild(statusTd);

                    /* number of stock & increment , decrement events */
                    //const stock = document.createElement("span");
                    spanText.textContent = td.getAttribute("value");
                    spanText.className = 'stock';

                    /* update the status */
                    (Number(td.getAttribute("value")) > 0) ? status.textContent = "in Stock" : status.textContent = "Out of Stock";
                    const decrement = document.createElement("span");
                    decrement.textContent = "-";
                    decrement.className = 'stock';
                    td.setAttribute("value", `${arrData[i]}`);

                    /* decrement block start */
                    decrement.addEventListener("click",event=>{
                        event.preventDefault();
                        if(td.getAttribute("value") != 0){
                            td.setAttribute("value", (Number(td.getAttribute("value"))-1).toString());
                            (Number(td.getAttribute("value")) > 0) ? status.textContent = "in Stock" : status.textContent = "Out of Stock";
                            spanText.textContent = td.getAttribute("value").toString();
                        }
                        td.prepend(decrement);
                        td.append(increment);
                    })

                    td.prepend(decrement);
                    /* decrement block end */

                    /* increment event block start */
                    const increment = document.createElement("span");
                    increment.textContent = "+";
                    increment.className = 'stock';

                    increment.addEventListener("click", event =>{
                        event.preventDefault();
                        td.setAttribute("value", (Number(td.getAttribute("value"))+1).toString());
                        (Number(td.getAttribute("value")) > 0) ? status.textContent = "in Stock" : status.textContent = "Out of Stock";
                        spanText.textContent = td.getAttribute("value").toString();
                        td.prepend(decrement);
                        td.append(increment);
                    })

                    td.append(increment);
                    /* increment block end */
                }
                tr.appendChild(td);
            }

            /* remove button block */
            const removeB = document.createElement("td");
            const button = document.createElement("button");
            const buttonText = document.createTextNode("REMOVE");
            button.appendChild(buttonText);
            button.addEventListener("click", event=>{
                tr.remove();
            });
            removeB.appendChild(button);
            tr.appendChild(removeB);

            /* creating the table */
            try{
                document.querySelector(".tr_head").insertAdjacentElement("afterend",tr);    
            }catch{
                table = document.createElement("table");
                if(!document.querySelector(".tr_head")){
                    const trHead = document.createElement('tr');
                    trHead.className = "tr_head";
                    const thProp = ['id', 'Item Name','Price', 'Stock', "", 'Item Description', ""];
                    for(let i = 0; i < 7; i++){
                        const th = document.createElement('th');
                        th.textContent = thProp[i];
                        trHead.appendChild(th);
                    }
                    table.prepend(trHead);
                }
                
                table.append(tr);
                p.append(table);
            }
            
            /* reset the form & increase the id counter by 1 */
            idCount++;
            form.reset();
        }
        else{
            /* error message block */
            errHandler(errMsg);
            flag = true;
        }
    });

    /**
     * errHandler ()
     * -------------------------------------
     * A basic error handling function to spread all the error messages to the html page.
     * 
     * @param {string []} err - an array of strings to show the errors
     */
    function errHandler(err){
        console.log(err)
        const error = document.querySelector("#new_item_err");
        error.textContent = "";
        const ul = document.createElement("ul");
        for(let str of err){
            const li = document.createElement("li");
            li.textContent = str;
            ul.appendChild(li);
        }
        error.appendChild(ul);
        error.setAttribute("style", "display: block;");
    }
}

submitEvent();

/**
 * reset()
 * --------------------------------------
 * a function to handle reset button in the form.
 */
function reset(){
    const form = document.querySelector(".new_item");
    const reset = document.querySelector("#new_item_reset");
    reset.addEventListener("click",e => {
        form.reset();
    })
}

reset();



/*
function tdClickEvent(){
    let td = document.getElementsByTagName('td');
    for(let index = 0; index < td.length; index++){
        
        td[index].addEventListener("click", change, false);
            
    }
    function change(){
        if(this.firstChild.nodeType !== 3) {      
            return;
        }
        let doc = document.createDocumentFragment();
        let input = document.createElement("input");
        input.value = this.textContent;
        this.removeChild(this.firstChild);
        doc.appendChild(input);
        this.appendChild(doc);
        
        this.addEventListener("onsubmit", event => {
            event.preventDefault();
            let docType = document.createDocumentFragment();
            let tdTemp = document.createElement("td");
            tdTemp.value = event.target.value;
            this.removeChild(this.firstChild);
            docType.appendChild(tdTemp);
            this.appendChild(docType);
        })
    }
}
        

tdClickEvent();*/