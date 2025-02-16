import os, { totalmem } from "node:os";
import chalk from 'chalk';
function monitor() {
  // taking one snapshot

  const oldCpus = os.cpus();
  // taking second snapshot
  setTimeout(() => {
    const newCpus = os.cpus();
    const usage = newCpus.map((cpu, i) => {
      return {
        core: i,
        usage: calculateCpu(oldCpus[i], newCpus[i]) + "%",
      };
    });

    // used memory
    const useMemory = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024);
    console.clear();
    console.log(chalk.blue('System stats...'));
    
    console.table(usage);
    console.log(`Memory Used`, 
        useMemory>5? chalk.redBright(`Memory Used ${useMemory.toFixed(2)} GB / ${ (totalmem / (1024 * 1024 * 1024)).toFixed(2)}GB`):chalk.greenBright(`Memory Used ${useMemory.toFixed(2)} GB / ${ (totalmem / (1024 * 1024 * 1024)).toFixed(2)}GB`)
    )
    // console.log(
    //   `Memory Used ${useMemory.toFixed(2)} GB / ${ (totalmem / (1024 * 1024 * 1024)).toFixed(2)}GB` );
  }, 1000);
}

function calculateCpu(oldCpus, newCpus) {
  const oldTotal = Object.values(oldCpus.times).reduce((a, b) => a + b);

  const newTotal = Object.values(newCpus.times).reduce((a, b) => a + b);

  const idle = newCpus.times.idle - oldCpus.times.idle;

  const Total = newTotal - oldTotal;
  const usedCPU = Total - idle;

  return ((100 * usedCPU) / Total).toFixed(1);
}
setInterval(monitor, 1000);
