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

    /**
     * Private Method
     * Singleton instance
     */
    function Singleton() {
        if (instance) {
            return instance;
        }
        instance = this;
    }

    /**
     * Private Method
     * Reset the interval
     */
    function reset() {
        clearInterval(animationInterval);
        animationInterval = undefined;
    }

    /**
     * Public Method
     * Return the actual instance or create a new one if not exist
     *
     * @returns {*|Singleton}
     */
    Singleton.getInstance = function () {
        return instance || new Singleton();
    };

    /**
     * Public Method
     * Animate the element by Id during a time and distance.
     *
     * @param elementId HTML element to animate
     * @param duration duration of animation in milliseconds
     * @param finishCallback Finished callback
     * @param inProgressCallback overwrite in progress bar logic
     */
    Singleton.animate = function (elementId, duration, finishCallback, inProgressCallback) {
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
                // --------------------------------------------
                // FINISHED ANIMATION
                // --------------------------------------------

                reset();

                if (inProgressCallback == undefined || inProgressCallback == null) {
                    progressBar.setAttribute("style", "width:0px");
                }

                if (finishCallback != undefined && finishCallback != null) {
                    finishCallback(progressBar);
                }

                // --------------------------------------------
            } else {
                // --------------------------------------------
                // IN PROGRESS ANIMATION
                // --------------------------------------------

                elapsed += interval;
                position = elapsed * distance / duration;

                if (inProgressCallback != undefined && inProgressCallback != null) {
                    inProgressCallback(progressBar, position, elapsed, distance);
                } else {
                    progressBar.setAttribute("style", "width:" + position + "px");
                }

                // --------------------------------------------
            }
        }
    };

    /**
     * Public Method
     * Return is animate is still running
     *
     * @returns {boolean}
     */
    Singleton.isLoading = function () {
        return animationInterval ? true : false;
    };

    return Singleton;
}());