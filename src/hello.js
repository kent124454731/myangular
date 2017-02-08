// function sayHello(){
// 	return 'Hello, world!';
// }

function sayHello(to) {
    return _.template("Hello, <%= name %>!")({name: to});
}