
const userInputEl = document.getElementById("user-input")
const inputFromEl = document.getElementById("user-input-from")
const inputToEl = document.getElementById("user-input-to")
const publishBtn = document.getElementById("Publish-Btn")
const endrosmentEl = document.getElementById("endorsement-El")


let endrosment 
let fromID 
let toID 
let clicks = "1.45k"
let newEl
publishBtn.addEventListener("click", function () 
{
        endrosment = userInputEl.value
        fromID = inputFromEl.value
        toID = inputToEl.value
        comments()
        clearInput()


})



function comments ()
{
    newEl = document.createElement("li")
    newEl.innerHTML = `
                        <strong>To ${fromID} </strong> 
                        <br><br>
                        ${endrosment}
                        <br> 
                        <strong>From ${toID}</strong>  <span><button>❤️</button> ${clicks} </span> 
                        
                        `
    if(endrosment)
    {    
        endrosmentEl.append(newEl)
    }

    newEl.addEventListener("click",function(){
        clicks++
    })
    
    
}



function clearInput (){
    userInputEl.value = ""
    inputFromEl.value = ""
    inputToEl.value = ""
}

