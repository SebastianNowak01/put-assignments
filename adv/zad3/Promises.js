function fetchData(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.status + ": " + xhr.statusText);
      }
    };
    xhr.onerror = function () {
      reject("Request failed");
    };
    xhr.send();
  });
}

window.onload = function () {
  fetchData("https://jsonplaceholder.typicode.com/posts")
    .then(function (response) {
      console.log("Data received:", response);
      // Here you can use the response data as needed
    })
    .catch(function (error) {
      console.error("Error:", error);
      // Handle errors here
    });
};
