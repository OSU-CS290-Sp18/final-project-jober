
var postContainer = document.getElementsByClassName('post-container')[0]
postContainer.addEventListener('click', handleContainerClick);

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

function generateContractURL(contract) {

}


function clearAllJobRequestText() {
  document.getElementsByClassName('add-post post-title')[0].value = '';
  document.getElementsByClassName('add-post post-price')[0].value = '';
  document.getElementsByClassName('add-post post-author')[0].value = '';
  document.getElementsByClassName('add-post post-description')[0].value = '';
}

function newJobRequestHasText() {
  if( document.getElementsByClassName('add-post post-title')[0].value &&
      document.getElementsByClassName('add-post post-price')[0].value &&
      document.getElementsByClassName('add-post post-author')[0].value &&
      document.getElementsByClassName('add-post post-description')[0].value) {
        return true;
      }
  return false;
}


function packageJobSubmittal() {
  var requestBody = JSON.stringify({
    title: document.getElementsByClassName('add-post post-title')[0].value,
    price: document.getElementsByClassName('add-post post-price')[0].value,
    author: document.getElementsByClassName('add-post post-author')[0].value,
    description: document.getElementsByClassName('add-post post-description')[0].value
  });
  return requestBody;
}

function handleModalAcceptClick() {

  if(newJobRequestHasText()) {
    var request = new XMLHttpRequest();
    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                postContainer.insertAdjacentHTML('beforeBegin',request.responseText);
            }
            else {
              alert('Error! Job submittion failed!');
            }
        }
    };
    request.open("POST", "/submitJob");
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(packageJobSubmittal());
    clearAllJobRequestText();
  } else {
    alert("All textboxes must be filled!");
  }
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


function getContractID(event) {
  return event.target.parentNode.parentNode.parentNode.id;
}

function addCommentEvent(event) {
  var commentTextBox = event.target.parentNode.getElementsByClassName('create-response-input')[0];
  if(commentTextBox.value) {

    getContractID(event);
    var commentData = JSON.stringify({
      text: commentTextBox.value,
      contract_id: getContractID(event)
    });
    var request = new XMLHttpRequest();
    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
              var commentContainer = event.target.parentNode.parentNode;
              commentContainer.insertAdjacentHTML('beforeBegin',request.responseText);
            }
        }
    };
    request.open("POST", "/submitComment");
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(commentData);
    clearAllJobRequestText();
  } else {
    alert("Comment must have a body!");
  }

}

function handleContainerClick(event) {

  if(event.target.classList.contains('create-response-button')) {
    addCommentEvent(event);
    
  }

}