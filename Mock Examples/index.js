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
