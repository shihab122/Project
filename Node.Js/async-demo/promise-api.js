const p = Promise.resolve({ id: 1 });
p.then(user => console.log(user.id));

// Callstack Error
const q = Promise.reject(new Error('Reason for reject'));
q.then(user => console.log(user.id)).catch(error => console.log(error));

// Simple Error
const r = Promise.reject('Reason for reject');
r.then(user => console.log(user.id)).catch(error => console.log(error));

// Run two Async operation at the same time
const p1 = new Promise(resolve => {
  console.log(`Async operation 1....`);
  resolve(1);
});

const p2 = new Promise(resolve => {
  console.log(`Async operation 2...`);
  resolve(2);
});

const p3 = new Promise((resolve, reject) => {
  console.log(`Async operation 3...`);
  reject(new Error('Operation 3 failed to execute'));
});

// It will print both promise when all async function executed
Promise.all([p1, p2])
  .then(result => console.log(`Result: ${result}`))
  .catch(error => console.log(`Error: ${error.message}`));

// If any process rejected then it will go to catch
Promise.all([p1, p3])
  .then(result => console.log(`Result: ${result}`))
  .catch(error => console.log(`Error: ${error.message}`));

// It will print one operation output which operation finished first
Promise.race([p1, p2])
  .then(result => console.log(`Result: ${result}`))
  .catch(error => console.log(`Error: ${error.message}`));
