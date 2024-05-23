let myLeads = []; //to store values saved by user

const inputEl = document.getElementById("input-el");
const saveEl = document.getElementById("save-btn");
const ulEl = document.getElementById("ul-el");
let saveTab = document.getElementById("tab");
let dltButton = document.getElementById("dlt-btn");

saveEl.addEventListener("click", function () {
  let userText = inputEl.value;
  myLeads.push(userText);
  render(myLeads);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
});

const LeadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));   
if (LeadsFromStorage) {
  myLeads = LeadsFromStorage;
  render(myLeads);
}


saveTab.addEventListener("click", function () {
  console.log("Hehheeheheh")
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    render(myLeads);    
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    
  });
});


function render(leads) {  
  let listItems = [];
  for (i = 0; i < leads.length; i++) {
    listItems += `
    <li>
    <a target = '_blank' href= '${leads[i]}'> ${leads[i]} </a>
    </li>
    `;
  }
  ulEl.innerHTML = listItems;
}


dltButton.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
