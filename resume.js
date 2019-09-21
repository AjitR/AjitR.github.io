var cmd_list = [];
var cmd_index = 0;
var available_cmd = [
    "about", 
    "education",
    "projects",
    "experience",
    "skills",
	"achievements",	
    "contact", 
    "download", 
    "help", 
    "clear",
    "ls",
  ];

var cmd = document.getElementById("command");

cmd.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    run_command();
  }
    else if(event.keyCode === 38) {
        event.preventDefault();
    cycle_command("up");
  }
    else if(event.keyCode === 40) {
        event.preventDefault();
    cycle_command("down");
  }
    else if(event.keyCode === 32 && event.ctrlKey) {
        event.preventDefault();
    tab_completion();
  }
});

function run_command(){
    var cmd = document.getElementById("command");    
    var input = cmd.value.toLowerCase();
    var output;
    
    if(input != ''){
            var element = document.getElementById(input);
      
            if(available_cmd.indexOf(input) < 0)
        element = document.getElementById('error'); 

      if(input == 'download'){
        window.open('resume.pdf', '_blank');
      }

      else if(input == 'clear'){
        clear_console();
        return;
      }

            output = element.cloneNode(true);
      output.style = "display:block";
    }

        var cmd_output = document.createElement("div");
    var container = document.createElement("div");

            cmd_output.appendChild(container);
        container.innerHTML = `<span style = "color:#3ffb57">ajit@rajurkar $</span> ` + input;

    if(input != ''){
      cmd_output.appendChild(output);
            cmd_list.push(input);
    }

        var element = document.getElementById("executed_commands");
    element.appendChild(cmd_output);

        cmd.value = "";
    cmd_index = cmd_list.length - 1;

        var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

function cycle_command(direction){
  if(direction === "up"){
    if(cmd_index > 0)
      cmd_index -= 1;
  }
  else if(direction === "down"){
    if(cmd_index < cmd_list.length - 1)
      cmd_index += 1;
  }

      
    var cmd = document.getElementById("command");
  cmd.value = cmd_list[cmd_index];
}

function tab_completion(){
    var cmd = document.getElementById("command");    
  var input = cmd.value;
  
  for (index = 0; index < available_cmd.length; index++) { 
    if(available_cmd[index].startsWith(input)){
      cmd.value = available_cmd[index];
      break;
    }
  }
}

function clear_console(){
  document.getElementById("executed_commands").innerHTML = "";
  document.getElementById("command").value = "";
}


$("html").click(function(){
  $("#command").focus();

})