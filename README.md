# Flying Hadouken (a Flappy Bird clone)

## About

This app is essentially a game which is a clone of the popular cult hit, Flappy Bird, which itself was inspired by many other games of its kind.

It's a simple game where you tap or click the screen to control the gravity of the "bird", and try to guide the bird in between obstacles, avoiding a collision.

The following is taken from the 'about' section of the landing page:

### Storyline

Inspired by Street Fighter, this Flappy Bird crossover involves using your unique telekinetic power of clicking (or tapping) to control Ryu's (or Ken's, Akuma's, Sakura's, or Sean's...but not Dan's!) hadouken and maneuver it between ascending and descending wooden planks. This is in honor of the deceased Gouken, arguable original master of the hadouken (Akuma might disagree though), and is a ritual performed every so often between the hadouken-throwing martial artists. Won't you join in?


### Directions

The goal is to not collide with the planks, and achieve a high score. If you do collide, it's game over.

Simply tap or click, depending on the device, anywhere on the screen other than the pause button (on mobile devices) to control the hadouken. While using a keyboard, hit the spacebar to toggle pause mode. On mobile devices, use (you guessed it!) the pause button. From the moment the game starts, as well as the moment after un-pausing, you get a 5 second breather.

If you do pretty well, you might notice that the game will adjust as well... 

Good luck!

## The Process

The code used to build this app demonstrates an entity component system, where the entities (the bird, pipes, etc) are comprised of different components (graphics, physics, collision detection) which are connected to one another by their respective systems.

This project in general (landing page included) taught me how to use Gulp tasks to make coding easier overall, and SASS to establish a separation of concerns when applying styles.

For the landing page, I gained some experience working with a template (this one being a Material Design Lite template) and tweaking it to my own preferences.

Even a simple game such as this requires a relatively complex code architecture benefiting from modularization, in this case using Browserify to require all of the scripts. It's extremely rewarding to create (and then play, of course) a working game, regardless of how simple it may be, considering all it takes to develop a game.

## Known Bugs/Issues

* As of now, the collision detection is a bit off to say the least. This has to do with the image being drawn onto canvas not perfectly representing the sizing parameters - in other words, the collision system only detects a smaller inner portion of the bird entity.

* I wanted to actually add sprite animations to the hadouken itself rather than just have a GIF that doesn't even animate (on most browsers, at least). Sprite creation isn't really my forte, but hopefully I'll have the time to figure this out in the future.

* I'm aware that the game can be taxing performance-wise. Hinderances such as heavy memory usage can cause nasty flickering, so if you're someone who is seizure-prone, please avoid this game for the time being. This may be attributed to the game loop being constant, even while the game is paused, so this is something I plan on fixing in the future. 

## The Code

The Landing Page is found in the directory 'site' which contains the source code ('src' directory). After running `gulp site-build` from the terminal while in the 'site' directory, a build version is created ('build' directory) within the 'site' directory.

The app's game's code is found under 'game'. This is the source code (for now).

Note that there is a package.json and gulpfile for each part of the project, the landing page and the game itself. The page's files are in the root directory while the game's files are in the game directory. I wanted to achieve separation of concerns, but a drawback is that the user who plans to make their own build has to make sure all of the appropriate dependencies are installed.

I plan on creating build tasks for the actual game itself. For demo purposes, I will create minified files to be utilized. Normally, the user will clone the repo and create the build themselves (which you can do as well here).







