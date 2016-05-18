Flying Hadouken (Flappy Bird Clone) Landing Page and Game

The Landing Page has a source directory (use 'site') and a build directory (use 'build').

The app's game's code is found under 'flappy-bird'. This is the source code.

This app is essentially a game which is a clone of the popular cult hit, Flappy Bird, which itself was inspired by many other games of its kind.

It's a simple game where you tap or click the screen to control the gravity of the "bird", and try to guide the bird in between obsticles, avoiding a collision.

The code used to build this app demostrates an entity component system, where the entities (the bird, pipes, etc) are comprised of different components (graphics, physics, collision detection) which are connected to one another by their respective systems.

This project in general (landing page included) taught me how to use Gulp tasks to make coding easier overall, and SASS to establish a seperation of concerns when applying styles.

Even a simple game such as this requires a relatively complex code architecture benefiting from modularization, in this case using Browserify to require all of the scripts. It's extremely rewarding to create (and then play, of course) a working game, regardless of how simple it may be, considering all it takes to develop a game.





