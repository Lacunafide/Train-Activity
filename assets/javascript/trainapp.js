var config = {
    apiKey: "AIzaSyBEl7RJfAzb1wxOjpx1JPWoLRjUcsXdP5U",
    authDomain: "train-activity-d0e51.firebaseapp.com",
    databaseURL: "https://train-activity-d0e51.firebaseio.com",
    projectId: "train-activity-d0e51",
    storageBucket: "train-activity-d0e51.appspot.com",
    messagingSenderId: "1073097811332"
};
firebase.initializeApp(config);
var database = firebase.database();

//--button adds values to temp variables
$('#addTrain').on("click", function() {

    var trainName = $("#trainName").val().trim();
    var destination = $("#destInput").val().trim();
    var firstTrain = moment($("#firstTrainTime").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency").val().trim();
    var newTrain = {
        name: trainName,
        place: destination,
        ftrain: firstTrain,
        freq: frequency
    }
    database.ref().push(newTrain);
    console.log(newTrain.name);
    $("#trainName").val("");
    $("#destInput").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
    return false;
});
//--- adds new trains to the database
database.ref().on("child_added", function(childSnapshot) {
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrain = childSnapshot.val().ftrain;
    var frequency = childSnapshot.val().freq;
    var firstTimeConverted = moment(firstTrain, "HH:mm");
    var currentTime = moment().format("HH:mm");

    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

    var timeRemainder = timeDiff % frequency;

    var minToTrain = frequency - timeRemainder;

    var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
    $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});