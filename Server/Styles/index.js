
var addJobStub = document.getElementById('add-post-stub');
addJobStub.addEventListener('click',expandForm);

var addJobForm = document.getElementById('add-post-form');

var addJobCloseButton = document.getElementById('add-post-close-button');
addJobCloseButton.addEventListener('click',closeForm);

var submitPostButton = document.getElementById('submit-post-button');
submitPostButton.addEventListener('click',submitPost);

function submitPost(event){
  console.log("submitPost");
  handleModalAcceptClick();
  closeForm();
}

function packageJobSubmittal() {
  var requestBody = JSON.stringify({
    author_id: 'af35d2c452887b038',
    title: document.getElementsByClassName('add-post post-title')[0].value,
    price: document.getElementsByClassName('add-post post-price')[0].value,
    author: document.getElementsByClassName('add-post post-author')[0].value,
    description: document.getElementsByClassName('add-post post-description')[0].value
  });
  return requestBody;
}

function handleModalAcceptClick() {
  var request = new XMLHttpRequest();
  request.open("POST", "/submitJob");
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(packageJobSubmittal());
}

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
