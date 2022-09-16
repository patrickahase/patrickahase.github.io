function filterCategory(filterSelection, filterBy){
    // filter selection is category
    // filter by is thing to match
    let itemsToFilter = Array.from(document.getElementsByClassName("RecipeCardWrapper"));
    for(let listItem of itemsToFilter){
        if(listItem.dataset[filterSelection] === filterBy){
            listItem.style.display = "flex";
        } else {
            listItem.style.display = "none";
        }
    }
}
function filterAll(){
    let itemsToFilter = Array.from(document.getElementsByClassName("RecipeCardWrapper"));
    for(let listItem of itemsToFilter){
        listItem.style.display = "flex";
    }
}

