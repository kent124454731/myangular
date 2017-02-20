/* jshint globalstrict: true */ /* global Scope: false */
"use strict";

// var _ = require('lodash');

function Scope() {
    this.$$watchers = [];
    this.$$lastDirtyWatch = null;
}

function initWatchVal() {
}

Scope.prototype.$watch = function (watchFn, listenerFn, valueEq) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function () { },
        valueEq: !!valueEq,
        last: initWatchVal
    };
    this.$$watchers.push(watcher);
    this.$$lastDirtyWatch = null;
};

Scope.prototype.$$areEqual = function(newValue, oldValue, valueEq) {
    if (valueEq) {
        return _.isEqual(newValue, oldValue);
    } else {
        return newValue === oldValue;
    }
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

//----------------------------------------------------------
/**
 * 单digest，只有一个消化系统
 */
// Scope.prototype.$digest = function () {
//     var self = this;
//     var newValue, oldValue;
//     _.forEach(this.$$watchers, function(watcher) {
//         newValue = watcher.watchFn(self);   //这里为newValue的赋值，具体监听的是哪个属性值由调用函数决定，但他都是Scope的原型方法。
//         oldValue = watcher.last;
//         if (newValue !== oldValue) {
//             watcher.last = newValue;
//             watcher.listenerFn(newValue,
//                 (oldValue==initWatchVal ? newValue:oldValue)
//                 , self);
//         }
//     });
//     //与上等同
//     // this.$$watchers.forEach(function (watcher) {
//     //     newValue = watcher.watchFn(self);
//     //     oldValue = watcher.last;
//     //     if (newValue !== oldValue) {
//     //         watcher.last = newValue;
//     //         watcher.listenerFn(newValue, oldValue, self);
//     //     }
//     // })
// };

//------------------------------------------------------------Giving Up On An Unstable Digest--------------------------------------------
/**
 * 多消化系统，处理相互影响依赖
 * @returns {*}
 */
// Scope.prototype.$$digestOnce = function() {
//     var self = this;
//     var newValue, oldValue, dirty;
//     _.forEach(this.$$watchers, function(watcher) {
//         newValue = watcher.watchFn(self);
//         oldValue = watcher.last;
//          //仅对比reference，如监听object或者array，则此判断永远不成立，即无法监听。所以需要对object和array做其他处理
//          //使用Lo-Dash的.isEqual方法
//         if (newValue !== oldValue) {
//             self.$$lastDirtyWatch = watcher;
//             watcher.last = newValue;     //此赋值，若newValue为object或array，则last恒等于newValue，无法监听变化
//             watcher.listenerFn(newValue,
//                 (oldValue === initWatchVal ? newValue : oldValue),
//                 self);
//             dirty = true;       //但凡有一个watcher有新的状态，dirty为true，即需要重新循环一遍，最后一遍总是不会对观察的数据产生影响的，一旦影响则继续循环。
//         } else if (self.$$lastDirtyWatch === watcher) {        //仅仅是最后一遍循环，并且是最后一个脏的观察，则直接退出循环
//             return false;
//         }
//     });
//     return dirty;
// };

Scope.prototype.$$digestOnce = function() {
    var self = this;
    var newValue, oldValue, dirty;
    _.forEach(this.$$watchers, function(watcher) {
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if (!self.$$areEqual(newValue, oldValue, watcher.valueEq)) {
            self.$$lastDirtyWatch = watcher;
            // watcher.last = newValue;
            //深度clone
            watcher.last = (watcher.valueEq ? _.cloneDeep(newValue) : newValue);
            watcher.listenerFn(newValue,
                (oldValue === initWatchVal ? newValue : oldValue),
                self);
            dirty = true;       //但凡有一个watcher有新的状态，dirty为true，即需要重新循环一遍，最后一遍总是不会对观察的数据产生影响的，一旦影响则继续循环。
        } else if (self.$$lastDirtyWatch === watcher) {        //仅仅是最后一遍循环，并且是最后一个脏的观察，则直接退出循环
            return false;
        }
    });
    return dirty;
};

/**
 *  当dirty为true，即当前消化系统是脏的，则继续循环清理
 */
Scope.prototype.$digest = function() {
    var ttl = 10;   //申明在方法中，则不影响其他地方调用digest
    var dirty;
    this.$$lastDirtyWatch = null;
    do {
        /**
         *  watch有个加载的过程，第一次执行digestOnce返回的dirty为true
         */
        dirty = this.$$digestOnce();
        //测试$$digestOnce执行了几次，一般至少两次
        // ttl--;
        if(dirty && !(ttl--)){
            throw "10 digest iterations reached";
        }
    } while (dirty);
    // return ttl;
};


