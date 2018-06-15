
var postContainer = document.getElementsByClassName('post-container')[0];
postContainer.addEventListener('click', handleContainerClick);

var addJobStub = document.getElementById('add-post-stub');
if (addJobStub) addJobStub.addEventListener('click',expandForm);

var addJobForm = document.getElementById('add-post-form');

var addJobCloseButton = document.getElementById('add-post-close-button');
if (addJobCloseButton) addJobCloseButton.addEventListener('click',closeForm);

var submitPostButton = document.getElementById('submit-post-button');
if (submitPostButton) submitPostButton.addEventListener('click',submitPost);

var acceptOfferButton = document.getElementById('accept-offer-button');
acceptOfferButton.addEventListener('click',acceptOffer);


const JOB_URL_TEMPLATE = "\contract\\";

function submitPost(event){
  console.log("submitPost");
  handleModalAcceptClick();
  closeForm();
}

function acceptOffer(event) {
  console.log('clicked');
  var nameFrom = prompt("Please enter your name","John's Wayne");
  var emailFrom = prompt("Please enter your email","jway@aol.com");
  var message = prompt("Please enter message for contractor","Shakira");
  var emailTo = prompt("Please enter contractor email","shakeit@boom.net");

  // if (person == null || person == "") {
  //     txt = "User cancelled the prompt.";
  // } else {
  //     txt = "Hello " + person + "! How are you today?";
  // }

    var acceptData = JSON.stringify({
      nameFrom: nameFrom,
      emailFrom: emailFrom,
      message: message,
      emailTo: emailTo
    });
    var request = new XMLHttpRequest();
    // request.onload = function () {
    //     if (request.readyState === request.DONE) {
    //         if (request.status === 200) {
    //           var commentContainer = event.target.parentNode.parentNode;
    //           commentContainer.insertAdjacentHTML('beforeBegin',request.responseText);
    //         }
    //     }
    // };
    request.open("POST", "/acceptJob");
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(acceptData);
}

function generateContractURL(contract) {
  var RegExCrit = new RegExp('class="post" id="(.*)"');
  var job_id =  RegExCrit.exec(contract)[1];
  var job_url = JOB_URL_TEMPLATE + job_id;
  var alertMessage = "Copy this URL for access to your job post -- >\n\n" + job_url;

  alert(alertMessage);
  location.href = job_url;
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
              generateContractURL(request.responseText);
              postContainer.insertAdjacentHTML('afterBegin',request.responseText);
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
    commentTextBox.value = '';
  } else {
    alert("Comment must have a body!");
  }
}

function removePost(event) {
  var job = event.target.parentNode.parentNode;
  var jobID = job.id;
  var request = new XMLHttpRequest();
  request.onload = function () {
    if(request.readyState === request.DONE) {
      if( request.status === 200 ){
        alert("Job Removed!");
        location.href = '/';
      }
    }
  };
  var url = /removeJob/ + jobID;
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send();
}

function handleContainerClick(event) {

  if(event.target.classList.contains('create-response-button')) {
    addCommentEvent(event);

  }
  if(event.target.classList.contains('close-post') ) {
    removePost(event);
  }

}
