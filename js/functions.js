var todos = [];
var  item_index = -1;//init to 1 because display() updates to correct value
//localStorage.setItem("todos", JSON.stringify(todos));

window.onload = function todo_load() { 
    var storedTodos = JSON.parse(localStorage.getItem("todos"));
    display_list(storedTodos); 
} 

//functions
function display_list(todos){
    localStorage.setItem("todos", JSON.stringify(todos));

    var storedTodos = JSON.parse(localStorage.getItem("todos"));

    var target_element = document.querySelector('#todo_list');
        var todo_list= todos.length;
       
        var x=0;
        target_element.innerHTML= todo_list>0? todos.map(function(todo){
                                    item_index++
                                    x++;//sentinel update before return statement
                                    var temp_id ='item_'+item_index.toString();
                                    return '<li class="items" id="item_'+item_index+'"><a>'+todo[x,0]+'<input type="button" id="mark_as_done'+item_index+'" class="item_button"  onclick="mark_as_done('+item_index+')" value="Done"/>'+'<button class="item_button" onclick="delete_item('+item_index+')">Remove</button>' +'</a></li>';    
                                }).join('')
                                
        :'<li>No items in list</li>';
        
        for( var i=0;i<todos.length;i++){
                                                var temp_id ='item_'+item_index.toString();

            todos[i][1]=='done'? document.getElementById('item_'+i).style.textDecoration = 'line-through':null;
            todos[i][1]=='done'? document.getElementById("mark_as_done"+i).value = "Unmark":null;
            todos[i][1]=='done'? document.getElementById(temp_id).style.listStyleType = "inherit":null;
            
        }
      
        item_index=-1;
}

function add_item(){
    var input=document.getElementById('user_input').value
    var storedTodos = JSON.parse(localStorage.getItem("todos"));

    if(input){
        storedTodos.push([input,'not_done'])
        document.getElementById('user_input').value=''; 
        display_list(storedTodos);
    }else alert('input cannot be empty')
    console.log(localStorage);
}

function delete_item(item_index){
    var storedTodos = JSON.parse(localStorage.getItem("todos"));

    storedTodos.splice(item_index,1);
     item_inde=0;
     display_list(storedTodos);

}

function mark_as_done(item_index){
    var storedTodos = JSON.parse(localStorage.getItem("todos"));
    var temp_id ='item_'+item_index.toString();
    var state = document.getElementById("mark_as_done"+item_index).value;


    switch(state) {
        case "Done":
            storedTodos[item_index][1]="done";
            document.getElementById(temp_id).style.textDecoration = 'line-through';
            document.getElementById(temp_id).style.listStyleType = "inherit";
            document.getElementById("mark_as_done"+item_index).value = "Unmark";
          break;
        case "Unmark":
            todos[item_index][1]="not_done";
            document.getElementById(temp_id).style.textDecoration = 'none';
            document.getElementById(temp_id).style.listStyleType = "circle";
            document.getElementById("mark_as_done"+item_index).value = "Done";
          break;
        default:
      }
      localStorage.setItem("todos", JSON.stringify(storedTodos));

}

function search(){
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search_input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("todo_list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

}