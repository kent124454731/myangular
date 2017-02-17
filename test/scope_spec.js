// /* jshint globalstrict: true */ /* global Scope: false */


describe('Scope', function () {
    "use strict";
    // it('can be constructed and used as an object', function () {
    //     var scope = new Scope();
    //     scope.aProperty = 1;
    //
    //     expect(scope.aProperty).toBe(1);
    // });

});

describe('digest', function () {
    "use strict";
    var scope;
    beforeEach(function () {
        scope = new Scope();
    });

    /**
     * Watching Object Properties: $watch And $digest
     */
    // it('calls the listener function of a watch on first $digest', function () {
    //     var watchFn = function () {
    //         return 'wat';
    //     };
    //     var listenerFn = jasmine.createSpy("a");
    //     // var listenerFn = function () {
    //     //     return 1;
    //     // };
    //     scope.$watch(watchFn, listenerFn);
    //     // var lis2 = jasmine.createSpy("b");
    //     // scope.$watch(watchFn(),lis2)
    //     scope.$digest();
    //     expect(listenerFn).toHaveBeenCalled();
    // });

    /**
     * Checking for Dirty Values
     */
    // it("calls the watch function with the scope as the argument", function () {
    //     var watchFn = jasmine.createSpy();
    //     var listenerFn = function () {
    //     };
    //     scope.$watch(watchFn, listenerFn);
    //     scope.$digest();
    //     expect(watchFn).toHaveBeenCalledWith(scope);
    // });

    /**
     * Checking for Dirty Values
     */
    // it("calls the listener function when the watched value changes", function() {
    //     scope.someValue = 'a';
    //     scope.counter = 0;
    //     scope.$watch(
    //         function(scope) { return scope.someValue; },   //调用此方法，然后返回scope.someValue
    //         function(newValue, oldValue, scope) { scope.counter++; }
    //     );
    //     expect(scope.counter).toBe(0);
    //     scope.$digest();
    //     expect(scope.counter).toBe(1);
    //     scope.$digest();
    //     expect(scope.counter).toBe(1);
    //     scope.someValue = 'b';
    //     expect(scope.counter).toBe(1);
    //     scope.$digest();
    //     expect(scope.counter).toBe(2);
    //     //仅观察someValue的改变，而不观察someValue2的改变
    //     scope.someValue2 = 'c';
    //     expect(scope.counter).toBe(2);
    // });


    /**
     * Initializing Watch Values
     */
    // it("calls listener when watch value is first undefined", function() {
    //     scope.counter = 0;
    //     scope.$watch(
    //         function(scope) { return scope.someValue; },
    //         function(newValue, oldValue, scope) { scope.counter++; });
    //     scope.$digest();
    //     expect(scope.counter).toBe(1);
    // });


    /**
     * Initializing Watch Values
     */
    // it("calls listener with new value as old value the first time", function() {
    //     scope.someValue = 123;
    //     var oldValueGiven;
    //     scope.$watch(
    //         function(scope) { return scope.someValue; },
    //         function(newValue, oldValue, scope) { oldValueGiven = oldValue; }
    //     );
    //     scope.$digest();
    //     expect(oldValueGiven).toBe(123);
    //     scope.someValue = 124;
    //     scope.$digest();
    //     scope.someValue = 125;
    //     scope.$digest();
    //     expect(oldValueGiven).toBe(124);
    // });


    /**
     * Getting Notified Of Digests
     */
    // it("may have watchers that omit the listener function", function() {
    //     var watchFn = jasmine.createSpy().and.returnValue('something');
    //     scope.$watch(watchFn);
    //     scope.$digest();
    //     expect(watchFn).toHaveBeenCalled();
    // });

    /**
     * Keep Digesting While Dirty ，只有一个digest，变化的值不会相互影响
     */
    // it("triggers chained watchers in the same digest", function() {
    //     var count = '';
    //     scope.$watch(
    //         function(scope) { return scope.name; },
    //         function(newValue, oldValue, scope) {
    //             if (newValue) {
    //                 scope.nameUpper = newValue.toUpperCase();
    //                 count+='2';
    //             }
    //         }
    //     );
    //     scope.$watch(
    //         function(scope) { return scope.nameUpper; },
    //         function(newValue, oldValue, scope) {
    //             if (newValue) {
    //                 scope.initial = newValue.substring(0, 1) + '.';
    //                 count+='1';
    //             }
    //         }
    //     );
    //     scope.name = 'Jane';
    //     scope.$digest();
    //     expect(scope.initial).toBe('J.');
    //     scope.name = 'Bob';
    //     var ttl = scope.$digest();
    //     expect(scope.initial).toBe('B.');
    //     // expect(count).toBe('1');
    //     // expect(ttl).toBe(0);
    // });

    /**
     * 当dirty无法停止就抛出异常，但不会影响其他地方的消化系统运行
     * Giving Up On An Unstable Digest
     */
    // it("gives up on the watches after 10 iterations", function() {
    //     scope.counterA = 0;
    //     scope.counterB = 0;
    //     var count = '';
    //     scope.$watch(
    //         function(scope) { return scope.counterA; },
    //         function(newValue, oldValue, scope) {
    //             scope.counterB++;
    //             count+='1';
    //         }
    //     );
    //     scope.$watch(
    //         function(scope) { return scope.counterB; },
    //         function(newValue, oldValue, scope) {
    //             scope.counterA++;
    //             count+='2';
    //         }
    //     );
    //     // scope.$digest();    //若digest中没有循环，则digest执行一次之后，counterA,counterB都为1
    //     // expect(scope.counterA).toBe(1);
    //     // expect(scope.counterB).toBe(1);
    //     expect((function() { scope.$digest(); })).toThrow();
    //     // expect(count).toBe('1');
    // });


    /**
     * Short-Circuiting The Digest When The Last Watch Is Clean
     */
    it("ends the digest when the last watch is clean", function() {
        scope.array = _.range(100);
        var watchExecutions = 0;
        _.times(100, function(i) {
            scope.$watch(
                function(scope) {
                    watchExecutions++;
                    return scope.array[i];
                },
                function(newValue, oldValue, scope) {
                }
            );
        });
        scope.$digest();
        expect(watchExecutions).toBe(200);
        scope.array[0] = 420;
        scope.$digest();
        expect(watchExecutions).toBe(301);
        // expect(ttl).toBe(1);
    });
});
