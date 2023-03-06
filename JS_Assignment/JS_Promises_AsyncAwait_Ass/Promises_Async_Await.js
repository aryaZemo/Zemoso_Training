

// Question : - 

// function getData(uId) {
//     setTimeout(() => {
//     console.log("Fetched the data!");
//     return "skc@gmail.com";
//     }, 4000);
//     }
    
//     console.log("start");
//     var email = getData("skc");
//     console.log("Email id of the user id is: " + email);
//     console.log("end");

// How do you solve this problem. How can we wait for till the function execution is completed,
 //    so that we can have correct email at line 10?



// Solution :- Using call Back

function getData(uId, callback) {
    setTimeout(() => {
        console.log("Fetched the data!");
        callback("skc@gmail.com");
    }, 4000);
}

console.log("start");
getData("skc", function(email) {
console.log("Email id of the user id is: " + email);
});
console.log("end");



// Solution 2 :- Using Promises and Async Await.

function getData(uId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetched the data!");
            resolve("skc@gmail.com");
        }, 4000);
    });
}

async function getEmail() {
    console.log("start");
    var email = await getData("skc");
    console.log("Email id of the user id is: " + email);
    console.log("end");
}

getEmail();
