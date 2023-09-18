// Access the firebase DB
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Initiliazing the App
const appSettings = {
   databaseURL: "https://scrimba-john-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)

// Creating the DB
const endorsmentsInDb = ref(database, "endorsements")
const fromInDb = ref(database, "fromID")
const toInDb = ref(database, "toID")

// Accessing the DOM elements
const userInputEl = document.getElementById("user-input")
const inputFromEl = document.getElementById("user-input-from")
const inputToEl = document.getElementById("user-input-to")
const publishBtn = document.getElementById("Publish-Btn")
const endrosmentEl = document.getElementById("endorsement-El")

// Global variable to get user input
let endorsment 
let fromID 
let toID 
let clicked_istrue = false

//Global variable to read data from the DB
let commentsData
let fromData
let toData

// Displaying the old data to the user
resultfromDB () 

//Publish Button action


    publishBtn.addEventListener("click", function () 
    {
        console.log(clicked_istrue)

        if ( !clicked_istrue)
        {
                endorsment = userInputEl.value
                fromID = inputFromEl.value
                toID = inputToEl.value
                if(endorsment === "" || fromID === "" || toID === "")
                {
                    alert("Error: All fields must be filed")
                    return
                }   
                comments()
                clearInput()
                clicked_istrue = true;
                pushtoDB ()
                
        } else
        {
        
        
        alert("You can only comments once")
        clearInput()
        }
            

    })




//Reading the value from the DB 
function resultfromDB () 
{
    
    {
        onValue (fromInDb, function (snapshot)
            {
            fromData = Object.values(snapshot.val())
    
            })
        onValue (toInDb, function (snapshot)
            {
                toData = Object.values(snapshot.val())
                
            })
        onValue(endorsmentsInDb, function (snapshot)
        {
            commentsData = Object.values(snapshot.val())
            // Displaying the read value in the DOM
            if(clicked_istrue)
            {
                for( let i = 0; i < commentsData.length-1; i++)
                {
                    
                    endrosmentEl.innerHTML += `<li>
                                                <strong>${fromData[i]}</strong>
                                                <br><br>
                                                ${commentsData[i]}
                                                <br><br>
                                                <strong>${toData[i]}</strong>
                                                </li>
                                            `
                    
                }
             }
             else
             {
                for( let i = 0; i < commentsData.length; i++)
                {
                    
                    endrosmentEl.innerHTML += `<li>
                                                <strong>${fromData[i]}</strong>
                                                <br><br>
                                                ${commentsData[i]}
                                                <br><br>
                                                <strong>${toData[i]}</strong>
                                                </li>
                                            `
                    
                }
             }
        })
    }

}

// Displaying the comments entered
function comments ()
{
    
    endrosmentEl.innerHTML = `
                <li style="background-color:#28A9F1 ">
                <strong>${fromID}</strong>
                <br><br>
                ${endorsment}
                <br><br>
                <strong>${toID}</strong>
                </li>
            `
    
    

}
// Pushing the data to DB

function pushtoDB ()
{
    push(fromInDb, fromID)
    push(toInDb, toID)
    push(endorsmentsInDb, endorsment)
    
    
}

// Clearing the use input//
function clearInput ()
{
    userInputEl.value = ""
    inputFromEl.value = ""
    inputToEl.value = ""
}


