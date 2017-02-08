/* jshint globalstrict: true */ /* global Scope: false */ 
"use strict";

// var _ = require('lodash');

function Scope() {
	this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn,listenerFn,last){
	var watcher = {
		watchFn :watchFn,
		listenerFn : listenerFn,
		last : last
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

Scope.prototype.$digest = function() {
    var self = this;
    var newValue, oldValue;
    _.forEach(this.$$watchers, function(watcher) {
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if (newValue !== oldValue) {
            watcher.last = newValue;
            watcher.listenerFn(newValue, oldValue, self);
        }
    });
};