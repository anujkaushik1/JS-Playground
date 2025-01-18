const { parentPort } = require("worker_threads");

parentPort.on("message", ({ start, end, thread }) => {
  let startTime = new Date().getTime();
  let numOfPrime = 0;

  for (let primeToCheck = start; primeToCheck <= end; primeToCheck++) {
    if (primeToCheck < 2) {
      continue;
    }

    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(primeToCheck); ++i) {
      if (primeToCheck % i == 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      numOfPrime++;
    }
  }
  console.log(
    "Thread Execution Completed: ",
    thread,
    '  processed values: ', end - start,
    "   time:   ",
    (new Date().getTime() - startTime)/1000 + ' secs'
  );

  parentPort.postMessage(numOfPrime);
});

