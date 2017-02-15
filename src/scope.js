/* jshint globalstrict: true */ /* global Scope: false */
"use strict";

// var _ = require('lodash');

function Scope() {
    this.$$watchers = [];
}

function initWatchVal() {
}

Scope.prototype.$watch = function (watchFn, listenerFn, last) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function () { },
        last: initWatchVal
    };
    this.$$watchers.push(watcher);
};

// Scope.prototype.$digest = function(){
// 	_.forEach(this.$$watchers,function(watcher){
// 		watcher.listenerFn();
// 	});
// };

// Scope.prototype.$digest = function() {
//     var self = this;
//     _.forEach(this.$$watchers, function(watcher) {
//         watcher.watchFn(self);
//         watcher.listenerFn();
//     });
// };

Scope.prototype.$digest = function () {
    var self = this;
    var newValue, oldValue;
    _.forEach(this.$$watchers, function(watcher) {
        newValue = watcher.watchFn(self);   //这里为newValue的赋值，具体监听的是哪个属性值由调用函数决定，但他都是Scope的原型方法。
        oldValue = watcher.last;
        if (newValue !== oldValue) {
            watcher.last = newValue;
            watcher.listenerFn(newValue,
                (oldValue==initWatchVal ? newValue:oldValue)
                , self);
        }
    });
    //与上等同
    // this.$$watchers.forEach(function (watcher) {
    //     newValue = watcher.watchFn(self);
    //     oldValue = watcher.last;
    //     if (newValue !== oldValue) {
    //         watcher.last = newValue;
    //         watcher.listenerFn(newValue, oldValue, self);
    //     }
    // })
};


