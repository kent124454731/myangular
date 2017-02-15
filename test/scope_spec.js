// /* jshint globalstrict: true */ /* global Scope: false */


describe('Scope', function () {
    "use strict";
    it('can be constructed and used as an object', function () {
        var scope = new Scope();
        scope.aProperty = 1;

        expect(scope.aProperty).toBe(1);
    });

});

describe('digest', function () {
    "use strict";
    var scope;
    beforeEach(function () {
        scope = new Scope();
    });

    it('calls the listener function of a watch on first $digest', function () {
        var watchFn = function () {
            return 'wat';
        };
        var listenerFn = jasmine.createSpy("a");
        // var listenerFn = function () {
        //     return 1;
        // };
        scope.$watch(watchFn, listenerFn);
        // var lis2 = jasmine.createSpy("b");
        // scope.$watch(watchFn(),lis2)
        scope.$digest();
        expect(listenerFn).toHaveBeenCalled();
    });

    it("calls the watch function with the scope as the argument", function () {
        var watchFn = jasmine.createSpy();
        var listenerFn = function () {
        };
        scope.$watch(watchFn, listenerFn);
        scope.$digest();
        expect(watchFn).toHaveBeenCalledWith(scope);
    });

    it("calls the listener function when the watched value changes", function() {
        scope.someValue = 'a';
        scope.counter = 0;
        scope.$watch(
            function(scope) { return scope.someValue; },   //调用此方法，然后返回scope.someValue
            function(newValue, oldValue, scope) { scope.counter++; }
        );
        expect(scope.counter).toBe(0);
        scope.$digest();
        expect(scope.counter).toBe(1);
        scope.$digest();
        expect(scope.counter).toBe(1);
        scope.someValue = 'b';
        expect(scope.counter).toBe(1);
        scope.$digest();
        expect(scope.counter).toBe(2);
        //仅观察someValue的改变，而不观察someValue2的改变
        scope.someValue2 = 'c';
        expect(scope.counter).toBe(2);
    });

    it("calls listener when watch value is first undefined", function() {
        scope.counter = 0;
        scope.$watch(
            function(scope) { return scope.someValue; },
            function(newValue, oldValue, scope) { scope.counter++; });
        scope.$digest();
        expect(scope.counter).toBe(1);
    });

    it("calls listener with new value as old value the first time", function() {
        scope.someValue = 123;
        var oldValueGiven;
        scope.$watch(
            function(scope) { return scope.someValue; },
            function(newValue, oldValue, scope) { oldValueGiven = oldValue; }
        );
        scope.$digest();
        expect(oldValueGiven).toBe(123);
        scope.someValue = 124;
        scope.$digest();
        scope.someValue = 125;
        scope.$digest();
        expect(oldValueGiven).toBe(124);
    });
});