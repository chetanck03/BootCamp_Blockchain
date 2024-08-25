// Promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Operation Successful!");
    }, 1000);
  });
  
  myPromise.then(result => {
    console.log(result); // "Operation Successful!"
  }).catch(error => {
    console.error(error);
  });

// async & await

async function fetchData() {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchData();

