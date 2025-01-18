const { Worker } = require("worker_threads");
const os = require("os");

const size = 99999990;

let numOfPrime = 0;
let onlineWorkerThreads = 0;

let startTime = 0;

function spwanThread(start, end, thread) {
  const worker = new Worker("./my_worker.js");
  

  worker.on("message", (countOfPrimes) => {
    numOfPrime += countOfPrimes;

    onlineWorkerThreads++;

    if (onlineWorkerThreads == os.cpus().length) {
      console.log(
        "total primes = ",
        numOfPrime,
        "  total time taken = ",
        (new Date().getTime() - startTime)/1000 + "secs"
      );
    }
  });

  worker.on("error", (err) => {
    console.error("Error:", err);
  });

  worker.postMessage({ start, end, thread });
}

function main() {
  startTime = new Date().getTime();
  const batchSize = Math.floor(size / os.cpus().length);
  let start = 1;
  let end = batchSize;

  for (let thread = 1; thread <= os.cpus().length; ++thread) {
    spwanThread(start, end, thread);

    start = end + 1;
    end = batchSize * (thread + 1);
  }

  if (size % os.cpus().length != 0) {
    console.log(start, "=====", size);
  }
}

// function main2(start, end, thread) {
//   let startTime = new Date().getTime();
//   let numOfPrime = 0;

//   for (let primeToCheck = start; primeToCheck <= end; primeToCheck++) {
//     if (primeToCheck < 2) {
//       continue;
//     }

//     let isPrime = true;
//     for (let i = 2; i <= Math.sqrt(primeToCheck); ++i) {
//       if (primeToCheck % i == 0) {
//         isPrime = false;
//         break;
//       }
//     }

//     if (isPrime) {
//       numOfPrime++;
//     }
//   }
//   console.log(
//     "Main Thread Execution Completed: ",
//     thread,
//     "  processed values: ",
//     end - start,
//     "   time:   ",
//     (new Date().getTime() - startTime) / 1000 + " secs"
//   );
//   console.log(numOfPrime);
// }

main();

// main2(1, size, 1)


WORKER THREADS =>
  
Thread Execution Completed:  1   processed values:  9999998    time:    2.896 secs
Thread Execution Completed:  2   processed values:  9999998    time:    4.796 secs
Thread Execution Completed:  3   processed values:  9999998    time:    5.811 secs
Thread Execution Completed:  4   processed values:  9999998    time:    6.616 secs
Thread Execution Completed:  5   processed values:  9999998    time:    6.943 secs
Thread Execution Completed:  6   processed values:  9999998    time:    7.457 secs
Thread Execution Completed:  7   processed values:  9999998    time:    7.853 secs
Thread Execution Completed:  8   processed values:  9999998    time:    8.27 secs
Thread Execution Completed:  9   processed values:  9999998    time:    8.697 secs
Thread Execution Completed:  10   processed values:  9999998    time:    8.762 secs
total primes =  5761455   total time taken =  8.807secs


MAIN THREAD =>
Main Thread Execution Completed:  1   processed values:  99999989    time:    40.978 secs
total primes = 5761455   total time taken =  40.978 secs
