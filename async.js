// sync async
// const fs=require('fs')
import * as fs from 'node:fs';
function createFile(pathname){
    fs.writeFile(pathname,"hello akhil!",(error)=>{
        if(error){
            console.log('error file');
            
        }
        console.log('file created');
        
    });
}
function deleteFile(pathname){
    fs.deleteFile(pathname,(error)=>{
        if(error){
            console.log('error file');
            
        }
        console.log('file delete');
        
    });
}
createFile('./text')
deleteFile('./text')
// console.log("first");
// setTimeout(() => {
//     console.log('Second');
    
// },0);
// console.log("Third");