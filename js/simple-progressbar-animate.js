/**
 *
 * <one line to give the program's name and a brief idea of what it does.>
 *
 * Copyright (C) 2017 Eduardo Estrella Rosario
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

var ProgressBar = (function () {
    var instance;
    var animationInterval;

    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
    }

    function reset() {
        clearInterval(animationInterval);
        animationInterval = undefined;
    }

    Singleton.getInstance = function () {
        return instance || new Singleton();
    }

    Singleton.animate = function (elementId, duration, callback) {
        // W3C - Minimum possible milliseconds of setInterval()
        var interval = 10;

        var elapsed = 0;
        var position = 0;

        var progressBar = document.getElementById(elementId);
        var progressBarWrapper = progressBar.parentNode;
        var distance = progressBarWrapper.offsetWidth;

        if (this.isLoading()) {
            reset();
        }

        animationInterval = setInterval(animation, interval);

        function animation() {
            if (position == distance) {
                reset();
                progressBar.setAttribute("style", "width:0px");
                if(callback != undefined){
                    callback();
                }
            } else {
                elapsed += interval;
                position = elapsed * distance / duration;
                progressBar.setAttribute("style", "width:" + position + "px");
            }
        }
    }

    Singleton.isLoading = function () {
        return animationInterval ? true : false;
    }

    return Singleton;
}());