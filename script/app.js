
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_K3nXYueXRl-7g7XUgP13XeBp2pVfrJk",
    authDomain: "sandwich-a4c06.firebaseapp.com",
    databaseURL: "https://sandwich-a4c06.firebaseio.com",
    projectId: "sandwich-a4c06",
    storageBucket: "",
    messagingSenderId: "721551398901"
  };
  firebase.initializeApp(config);
  var firestore = firebase.firestore();

  const docRef = firestore.doc("samples/sandwichData");
  const outputHeader = document.querySelector("#hotDogOutput");
  const inputTextField = document.querySelector("#latestHotDogStatus");
  const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");

  //Fonction that save data from the input field in the firestore cloudDB
  saveButton.addEventListener("click", function() {
    const textToSave = inputTextField.value;
    console.log("What i'm going to save " + textToSave + " to Firestore");
    docRef.set({
      hotDogStatus: textToSave
    }).then((result) => {
      console.log("status saved!")
    }).catch((err) => {
      console.log("got an error", error)
    });
  })

  //Fonction that load data from firestore cloudDB when you click on load button
  loadButton.addEventListener("click", function () {
    docRef.get().then(function(doc) {
      if (doc.exist) {
        const myData = doc.data();
        outputHeader.innerText = "hot dog status: " + myData.hotDogStatus;
      }
    }).catch(function(error) {
      console.error("Error writing document: ", error);
    });
  })

  getRealTimeUpdates = function() {
    docRef.onSnapshot(function (doc) {
      if (doc && doc.exist) {
        const myData = doc.data();
        outputHeader.innerText = "hot dog status: " + myData.hotDogStatus;
    }});
  }

  getRealTimeUpdates ();