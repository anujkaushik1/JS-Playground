
console.log('withoutttt =>>>>>>>>>>>>>>>');
// function main(){
//     console.log(this);
// }

// main()  // global


const obj = {
    a: 10,
    x: function(){
        const y = function(){
            console.log(this);
        }

        y();   // global
    }
}


obj.x()


const obj2 = {
    a: {
        k : function(){
            console.log(this);
        },
        mynameisakey: 'h'
    }
}

obj2.a.k()  // {k:, mynameiskey: }


console.log('---------------------------------------------------');

const obj3 = {
    x: function(){
        const y  = () => {
            console.log(this);  // {x, name}
        }

        y()
    },
    name: "world"
}

obj3.x()


console.log('-------------------------------------------');


const obj4 = {
    x: () => {
        const y  = () => {
            console.log(this);  // global
        }

        y()
    },
    name: "world"
}

obj4.x()