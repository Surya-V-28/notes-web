


const firebaseConfig = {
    apiKey: "AIzaSyDJpIn-9WJYwAEAoserkLa0ibH5zdDJhHA",
    authDomain: "notes-77bd6.firebaseapp.com",
    projectId: "notes-77bd6",
    storageBucket: "notes-77bd6.appspot.com",
    messagingSenderId: "30545681784",
    appId: "1:30545681784:web:ef40725aaf25553b6dbc8d",
    measurementId: "G-JBXL2ZNRY7"
    //////////////////////////////////
  };
firebase.initializeApp(firebaseConfig);


async function register(){
    var newmail = document.getElementById("newuser").value;
    var loc = document.getElementById("lociation").value;
    var name = document.getElementById("name").value;
    var time = Date();
    var newmailpassword = document.getElementById("newmailpassword").value;
    document.getElementById("lociation").value ="";
    document.getElementById("newmailpassword").value ="";
    alert("connecting to sever");
    await  firebase.auth().createUserWithEmailAndPassword(newmail,newmailpassword);
    document.getElementById("newuser").value  ="";
    document.getElementById("name").value ="";
   await firebase.firestore().collection("profile").doc(newmail).set({
        "name":name,
         "lociation" :loc,
         "email" :newmail,
         "time" :time
    });
    alert("created new account successfully, Hurry!!. now you can login"); 

}

firebase.auth().onAuthStateChanged(async  function (user) {
    var name1;
    let  email1;
    if (user != null) {
        console.log("logged in");
        var users = firebase.auth().currentUser;
        if (users != null) {
            const email_id1 = users.email;
            useruid = firebase.auth().currentUser.useruid;
            emailD = firebase.auth().currentUser.email;
            const cityRef = firebase.firestore().collection('profile').doc(email_id1);
            const doc = await cityRef.get();
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                email1 = doc.data()['email'];
                name1 = doc.data()['name'];
                time = doc.data()['time'];
                console.log("logged in");
            }
        }
    }
    else {
        console.log("logged out");
        //document.getElementById("logoutbutton").style.display = 'none';
        window.location.href = "signin.html";
    }
});

function logins() {

    var email = document.getElementById("email").value;
    var encode = window.btoa(email);
    var password = document.getElementById("Password").value;
    //window.alert("Working Fine" + email + "   "+password);
    document.getElementById("email").value = "";
    document.getElementById("Password").value= "";
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.alert("succesfully conneet the mail");
            // ...
            localStorage.setItem("mailID",encode);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            window.alert("error" + errorMessage);
        });

}


function logout() {
    firebase.auth().signOut().then(function () {
        window.alert("sign out sucessfully");
    }).catch(function (error) {
        window.alert("Error" + error.message);
    });
    localStorage.setItem("mailID",'');
    window.location.href = "signin.html";
}

/* Read the data for the insert button  in the real time database */
var nameD, ageD, emailD, timeD;


function inserts() {
    nameD = document.getElementById("nameOfTheUser").value;
    ageD = document.getElementById("ageOfTheUser").value;
    emailD = firebase.auth().currentUser.email;
    timeD = Date();
    firebase.database().ref("student/" + ageD).set({
        nameofperson: nameD,
        ageoftheperson: ageD,
        emailoftheperson: emailD,
        timeofjoined: timeD
    }).catch(function (error) {
        {
            window.alert("error" + error.message);
        }
    });
    document.getElementById("nameOfTheUser").value = "";
    document.getElementById("ageOfTheUser").value = "";
    document.getElementById('emailId').value = "";
    window.alert("Profile Added");
}


/* Update the data to real time database */

function updates() {
    nameD = document.getElementById("nameOfTheUser").value;
    ageD = document.getElementById("ageOfTheUser").value;
    emailD = firebase.auth().currentUser.email;
    timeD = Date();
    firebase.database().ref("student/" + ageD).update({
        nameofperson: nameD,
        ageoftheperson: ageD,
        emailoftheperson: emailD,
        timeofjoined: timeD
    }).catch(function (error) {
        {
            window.alert("error" + error.message);
        }
    });
    document.getElementById("nameOfTheUser").value = "";
    document.getElementById("ageOfTheUser").value = "";
    document.getElementById('emailId').value = "";
    window.alert("Profile updated");
}

/* delete the data formt he real time database*/
function deletes() {
    nameD = document.getElementById("nameOfTheUser").value;
    ageD = document.getElementById("ageOfTheUser").value;
    emailD = firebase.auth().currentUser.email;
    timeD = Date();
    firebase.database().ref("student/" + ageD).remove().catch(function (error) {
        {
            window.alert("error" + error.message);
        }
    });
    document.getElementById("nameOfTheUser").value = "";
    document.getElementById("ageOfTheUser").value = "";
    document.getElementById('emailId').value = "";
    window.alert("Profile deleted");
}

/* Read the data form the real time database */
function reads() {
    ageD = document.getElementById("ageOfTheUser").value;
    firebase.database().ref("student/" + ageD).on("value", function (snap) {
        document.getElementById("nameOfTheUser").value = snap.val().nameofperson;
        document.getElementById('emailId').value = snap.val().emailoftheperson;
        document.getElementById("ageOfTheUser").value = snap.val().ageoftheperson;
    }).catch(function (error) {
        window.alert("error" + error.message);
    });
}

/* Read the data for the firebase firestore */
function addfirestore() {
    nameD = document.getElementById("nameOfTheUser").value;
    ageD = document.getElementById("ageOfTheUser").value;
    emailD = firebase.auth().currentUser.email;
    timeD = Date();
    var firestores = firebase.firestore().collection("student");
    firestores.add({
        nameofperson: nameD,
        ageoftheperson: ageD,
        emailoftheperson: emailD,
        timeofjoined: timeD
    }).catch(function (error) {
        window.alert("error" + error.message);
    });
}

/* add the notes to forestore for the new notes */
var note, author, timeofpost;
function addthenote() {
    var titleofnotes = window.prompt("Enter the title of notes","Add the title")
    note = document.getElementById('NoteOfThePost').value;
    author =window.atob(localStorage.getItem("mailID"));
    time = Date()
    var firestores = firebase.firestore().collection("Posts");
    firestores.add({
        content: note,
        author: author,
        title:titleofnotes,
        timeofpost: time
    }).catch(function (error) {
        window.alert("error" + error.message);
    });
    window.alert("Sucessfully notes posted");
    document.getElementById('NoteOfThePost').value = "";

}

/* Profile for the user add */
var useruid;
function UserProfile() {
    useruid = firebase.auth().currentUser.useruid;
    emailD = firebase.auth().currentUser.email;
    var firestores = firebase.firestore().collection("profile");
    firestores.doc(emailD).set({
        name: "",
        email: emailD,
        lociations: "none",
        time: Date(),
    }).catch(function (error) {
        window.alert("Error" + error.message);
    });
}

/* edilt the profile of a user */
function ediltprofie() {
    //console.log("emailidin edilt "+ email1);
    document.getElementById("profile-name").style.display = "none";
    document.getElementById("loc").style.display = "none";
    document.getElementById("submitbutton").style.display = "block";
    document.getElementById("ediltbutton").style.display = "none";
    document.getElementById("inputediltname").style.display = "block";
    document.getElementById("inputediltloc").style.display = "block";
    document.getElementById("inputediltname").value = name1;
    document.getElementById("inputediltloc").value = locs;
}
/* submit button after the edilt profile */
function submitprofie() {
    var name = document.getElementById("inputediltname").value;
    var lociation = document.getElementById("inputediltloc").value;
    var firestores = firebase.firestore().collection("profile");
    firestores.doc(emailD).set({
        name: name,
        email: emailD,
        lociation: lociation,
        time: Date(),
    }).catch(function (error) {
        window.alert("Error" + error.message);
    });
    document.getElementById("inputediltloc").value = locs;
    document.getElementById("profile-name").innerHTML = name;
    document.getElementById("loc").innerHTML = locs;
    document.getElementById("profile-name").style.display = "block";
    document.getElementById("loc").style.display = "block";
    document.getElementById("submitbutton").style.display = "none";
    document.getElementById("ediltbutton").style.display = "block";
    document.getElementById("inputediltname").style.display = "none"
    document.getElementById("inputediltloc").style.display = "none"
}

/* move to profile page */
async function movetoprofile() {
    // var mail = firebase.auth().currentUser.email;
    document.getElementById("inputediltname").style.display = "none";
    document.getElementById("inputediltloc").style.display = "none";
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user != null) {
            var users = firebase.auth().currentUser;
            if (users != null) {
                emailD = firebase.auth().currentUser.email;
                const cityRef = firebase.firestore().collection('profile').doc(emailD);
                const doc = await cityRef.get();
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    email1 = doc.data()['email'];
                    name1 = doc.data()['name'];
                    time = doc.data()['time'];
                    locs = doc.data()['lociation'];
                    document.getElementById("profile-name").innerText = name1;
                    document.getElementById("loc").innerHTML = locs;
                }
            }
        }
        else {
            console.log("logged out");
            
            //  document.getElementById("logoutbutton").style.display = 'none';

        }
    });
    alert("Loading");
}

function check() {
    useruid = firebase.auth().currentUser.users;
    console.log("UserUid" + useruid);

}

 async function mynotespage() {
    //console.log(email_id1);
     var rmail = localStorage.getItem("mailID");
     var decode = window.atob(rmail);
    //console.log("this is passed email  "+rmail);
   const fr = firebase.firestore().collection("Posts");
   const snaps = await fr.where("author",'==',decode).get();
   if(snaps.empty){
       console.log("no data exists");

   }else {
    snaps.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        var teet = doc.data()['content'];
        console.log("this is time " +  doc.data()["timeofpost"]);
        appendDataChild("myAllNotes",teet,doc.data()['author'],doc.id,doc.data()["title"],doc.id,doc.data()["timeofpost"]);
       
      });
   }
   
 }

 function tableAddData(id, data,author,docid) {
     var tables = document.getElementById(id).insertRow(1);
     var y  = tables.insertCell(0);
     y.innerHTML = data;
}
function captionAddinTable(id, author ){
     document.getElementById(id).createCaption().innerHTML = author;
}

function appendDataChild(id,data,author,docid,title,timeofpost) {
    //console.log(title);
    console.log("this is time in appendchild " +  timeofpost);
    appendTheTitleofNotes(id,title,timeofpost);
    var node = document.createElement('p');
    var textnode = document.createTextNode(data);
    node.appendChild(textnode);
    document.getElementById(id).appendChild(node);
}

function appendTheTitleofNotes(id,title,times) { 
   var timenode = document.createElement("h6");
   var DataTime = document.createTextNode("24/10/22");
   timenode.appendChild(DataTime);
   document.getElementById(id).appendChild(timenode);
    var titletoadd = document.createElement("h2");
    var dataTitle = document.createTextNode(title);
    titletoadd.appendChild(dataTitle);
    document.getElementById(id).appendChild(titletoadd);
}

/* social page where user can interacrt  with each other */

async function socials() {
    var mail =  localStorage.getItem("mailID");
    var fmail = window.atob(mail);
    var snapsocial  = await firebase.firestore().collection("Posts").where("author", '!=',fmail).get();
    if(snapsocial.empty){
        console.log("no data exists");
    }else {
        snapsocial.forEach(doc =>{
           sociallayoutdoc(doc.id,doc.data()['content'],doc.data()['title'],doc.data()['author'])
        });
    }
}

async function sociallayoutdoc(id,contents,titles,hoster) {
    var node = document.createElement("h6");
    var name ;
     await firebase.firestore().collection('profile').doc(hoster).get().then((snsap)=> {
             name =snsap.data()['name'];
         }); 
    var author =document.createTextNode("author :"+ name+" ( "+hoster+") ");
    node.appendChild(author);
    document.getElementById('socials').appendChild(node);
    var node2 = document.createElement("p");
    var  content = document.createTextNode(contents);
    node2.appendChild(content);
    var node1 = document.createElement("h4");
    var title = document.createTextNode(titles);
    node1.appendChild(title);
    document.getElementById('socials').appendChild(node1);
    document.getElementById('socials').appendChild(node2);
    var node3 = document.createElement('h5');
    var comment =document.createTextNode("Add a comment to "+ hoster);
    node3.appendChild(comment);
    document.getElementById('socials').appendChild(node3);

}




