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