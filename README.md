#Simple Progressbar Animate

Simple JavaScript Pure Library to animate ProgressBar. Is develop using Singleton pattern without Module Pattern.

The purpose of this project si show how to do a Singlenton Class and simple animation in Pure Javascript

I decided to use Singleton pattern because the class wrap a setInterval instance which managed the animation duration and want to be unique for all web application.

The progressbar style simulate the Youtube loading bar.

#How To Use

Import `JavaScript` file

````
<script src="js/simple-progressbar-animate.js"></script>
````

You can use it with the simple way

````
<script type="text/javascript">
    ProgressBar.animate('progress-bar', 3000 );
</script>
````

Where `'progress-var'` is the element Id will be animate and `3000` is the milliseconds of the animate duration.
 
#### Finished Callback
 
If you need to know when the animation is finish you can use the the third parameter, finished callback.

````
<script type="text/javascript">  
    ProgressBar.animate('progress-bar', 3000, function (item) {
        // finished code
    });
</script>
````

#### InProgress Callback
 
You can overwrite the progressbar while is running. Use InProgress Callback and implement your own animation

````
<script type="text/javascript">  
    ProgressBar.animate('progress-bar', 3000, null, function (item, position, elapsed, distance) {
        item.setAttribute("style", "width:" + position + "px");
    });
</script>
````

If you use that callback is recommended that use combine with Finished Callback to manage full animation.
 
````
<script type="text/javascript">  
    ProgressBar.animate('progress-bar', 3000, 
        function (item) {
            item.setAttribute("style", "width:0px");
        },
        function (item, position, elapsed, distance) {
            item.setAttribute("style", "width:" + position + "px");
        }
    );
</script>
````

#License

![GPLv3](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/GPLv3_Logo.svg/200px-GPLv3_Logo.svg.png)
