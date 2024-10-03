'use strict';

console.log('with =>>>>>>>>>>>>>>>');


function main(){
    console.log(this);
}
 
window.main()  //global
main();  // undefined



