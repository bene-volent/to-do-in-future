// Handy Functions

String.prototype.toTitleCase = function () {
    return this.toLowerCase()
        .split(" ")
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
};

let categories = ["Default"];

let tasks = {};

function refreshCatOptions(){
    let categorySelector = document.querySelector('#category-dropdown')
    categories.forEach((val,index)=>{
        let option = document.createElement("option")
        option.value = index+1;
        option.text = val
        categorySelector.add(option)
    })
}

const newCategory = document.querySelector(".new-category");

newCategory.addEventListener("click", function (e) {
    e.preventDefault();
    if (newCategory.dataset.state === "close") {
        newCategory.dataset.state = "open";
    } else {
        newCategory.dataset.state = "close";
        document.querySelector("#new-cat").value = "";
    }
});

document.querySelector(".new-cat-add").addEventListener("click", (e) => {
    e.preventDefault();

    let text = document.querySelector("#new-cat").value.toTitleCase();
    if (
        text.length === 0 ||
        categories.includes(text) ||
        newCategory.dataset.state === "close"
    ) {
        newCategory.dataset.state = "close";
        document.querySelector("#new-cat").value = ''
        return;
    }

    categories.push(text);

    const option = document.createElement("option");
    option.value = categories.length;
    option.text = text;
    option.setAttribute("class", "category-item");

    document.querySelector("#category-dropdown").add(option);
    newCategory.dataset.state = "close";
    document.querySelector("#new-cat").value =''
});

document.querySelector("#task-submit").addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.getElementById("task-title").innerHTML.toTitleCase();
    if (title.length === 0) {
        return;
    }
    const description = document.getElementById("task-description").innerHTML;
    const categoryIndex =
        document.getElementById("category-dropdown").selectedIndex;

    if (tasks[categories[categoryIndex]] === undefined) {
        tasks[categories[categoryIndex]] = {};
    }
    if (tasks[categories[categoryIndex]][title] !== undefined) {
        return;
    }
    const currentdate = new Date();
    const currentDateTime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes();

    tasks[categories[categoryIndex]][title] = {
        description,
        categoryIndex,
        currentDateTime,
    };
});

function readFromJSON(json) {
    tasks = JSON.parse(json);
    categories = Object.keys(tasks)
    refreshCatOptions()
    
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}