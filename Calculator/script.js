let display = document.querySelector("#display")

function AddtoDisplay(input){
    display.value +=input  
}

function clearScreen(){
    display.value = ''
}

function calc(){
    try{
        display.value = eval(display.value)
    }
    catch(error){
        display.value='Error'
    } 
}

function backSpace(){
    display.value=display.value.toString().slice(0,-1)
}
    
