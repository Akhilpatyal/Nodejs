import os, { totalmem } from "node:os"; // Importing OS module to access system info
import chalk from 'chalk'; // Importing Chalk module for colored console output

function monitor() {
    // Taking first snapshot of CPU usage
    const oldCpus = os.cpus();
    
    // Taking second snapshot after 1 second
    setTimeout(() => {
        const newCpus = os.cpus();
        
        // Calculating CPU usage for each core
        const usage = newCpus.map((cpu, i) => {
            return {
                core: i, // Identifies the CPU core number
                usage: calculateCpu(oldCpus[i], newCpus[i]) + "%", // Calculates and formats CPU usage
            };
        });
        
        // Calculating used memory in GB
        const useMemory = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1024);
        
        console.clear(); // Clears the console for a fresh output each time
        console.log(chalk.blue('System stats...')); // Displaying a title in blue
        
        console.table(usage); // Displaying CPU usage in a table format
        
        // Displaying memory usage with color-coded warning if usage is high
        console.log(`Memory Used`,
            useMemory > 5 ? 
            chalk.redBright(`Memory Used ${useMemory.toFixed(2)} GB / ${ (totalmem / (1024 * 1024 * 1024)).toFixed(2)}GB`) :
            chalk.greenBright(`Memory Used ${useMemory.toFixed(2)} GB / ${ (totalmem / (1024 * 1024 * 1024)).toFixed(2)}GB`)
        );
    }, 1000); // Delays execution by 1 second to compare CPU snapshots
}

function calculateCpu(oldCpus, newCpus) {
    // Summing up all time values for old and new CPU snapshots
    const oldTotal = Object.values(oldCpus.times).reduce((a, b) => a + b);
    const newTotal = Object.values(newCpus.times).reduce((a, b) => a + b);
    
    // Calculating idle and total differences
    const idle = newCpus.times.idle - oldCpus.times.idle;
    const Total = newTotal - oldTotal;
    
    // Calculating percentage of CPU used
    const usedCPU = Total - idle;
    return ((100 * usedCPU) / Total).toFixed(1); // Returning formatted CPU usage percentage
}

// Running monitor function every second to update system stats
setInterval(monitor, 1000);
