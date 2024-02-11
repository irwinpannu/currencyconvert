let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"
let dropdowns = document.querySelectorAll(".dropdown select")
let button = document.querySelector("form button")
let fromcurrency = document.querySelector(".from select")
let tocurrency = document.querySelector(".to select")

for (let select of dropdowns) {
    for (let crrcode in countryList) {
        let newoption = document.createElement("option")
        newoption.innerText = crrcode
        newoption.value = crrcode
        if (select.name === "from" && crrcode == "USD") {
            newoption.selected = "selected"
        }
        else if(select.name === "to" && crrcode == "INR"){
            newoption.selected = "selected"
        }
        select.append(newoption)
    }
    select.addEventListener("change", (evt)=> {flag(evt.target)})
}
let flag = (element)=>{
    let crrcode = element.value
    let countrycode = countryList[crrcode]
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc
}
button.addEventListener("click", async(event)=> {
    event.preventDefault() // To stop it from reloading the page
    let amountInput = document.querySelector(".amount input")
    let amountValue = amountInput.value
    console.log(amountValue)
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1
        amountInput.value = "1"
    }
    console.log(fromcurrency.value, tocurrency.value)
    const baseURL = `${url}/${fromcurrency.value.toLowerCase()}/${tocurrency.value.toLowerCase()}.json`
    try{
       let response = await fetch(baseURL)
       let data = await response.json()
       console.log(data)
       let rate = data[tocurrency.value.toLowerCase()]
       let finalAmount = amountValue * rate
       console.log(finalAmount)
       document.querySelector(".msg").innerText = `${amountValue} ${fromcurrency.value} = ${finalAmount} ${tocurrency.value}`
    }
    catch(error){
        console.error("error!!!", error)
    }
})