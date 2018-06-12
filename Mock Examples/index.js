var addJobStub = document.getElementById('add-post-stub');
addJobStub.addEventListener('click',expandForm);
var addJobForm = document.getElementById('add-post-form');
var addJobCloseButton = document.getElementById('add-post-close-button')
addJobCloseButton.addEventListener('click',closeForm);

function expandForm(event){
  if (addJobForm.classList.contains("hidden")) {
    addJobForm.classList.remove('hidden');
    addJobStub.classList.add('hidden');
  }
}
function closeForm(event){
  if (!addJobForm.classList.contains("hidden")) {
    addJobForm.classList.add('hidden');
    addJobStub.classList.remove('hidden');
  }
}
var cufname = document.getElementById('create-user-firstname');
var culname = document.getElementById('create-user-lastname');
var cuemail = document.getElementById('create-user-username');
var cupasswd = document.getElementById('create-user-password');
var cupasswdconf = document.getElementById('create-user-confpassword');

var cubutton = document.getElementById('create-user-button');
cubutton.addEventListener('click',createAccount);

function createAccount(event){

}


/*
var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++){
  textareas[i].addEventListener('keyup',textAreaAdjust);
  console.log(textareas[i].placeholder);
}
function textAreaAdjust(event) {
  console.log(1);
  event.style.height = "1px";
  event.style.height = (-10+event.scrollHeight)+"px";
}
*/
