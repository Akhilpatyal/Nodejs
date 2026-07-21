const fs =require ("fs");
const path =require ("path");

// i want to create a folder 
// 1 i have to define the path
const folder=path.join(__dirname,'txt');

// 2 i have to check if the folder exists\
if(!fs.existsSync(folder)){
fs.mkdirSync('txt');
console.log(`folder is created!`);
}
else{
    console.log('Already available');
    
}