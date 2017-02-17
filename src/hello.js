// function sayHello(){
// 	return 'Hello, world!';
// }

function sayHello(to) {
    return _.template("Hello, <%= name %>!")({name: to});
}

function testUndefined1() {
    var a = "a";
    if(a!==b){
        return "true";
    }
    else{
        return "false";
    }
}
// console.log(testUndefined1());
function testUndefined2() {
    var a = "a";
    var b;
    if(a!==b){
        return "true";
    }
    else{
        return "false";
    }
}
// console.log(testUndefined2());

function digest() {
    var ttl = 10;
    var dirty = true;
    while (dirty){
        console.log(ttl);
        if(!(ttl--)){    //负数为false
            dirty = false;
        }
    }

}
digest();

