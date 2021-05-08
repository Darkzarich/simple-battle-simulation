## Simple Battle Simulation

[Show me what it looks like!](https://darkzarich.github.io/simple-battle-simulation/) (warning: has sounds!)

- Made with Vanilla JavaScript
- Uses `Canvas` and `window.requestAnimationFrame`

Rules:

- There are two teams: **Red** and **Green**
- **Green** units move to the right
- **Red** units move to the left
- Upon reaching X axis border a **unit teleports to the opposite side and a bit down** 
by random offset but not more than **twice** of its size
- Upon reaching bottom border a unit teleports to the top border
- Units have **power** which is slowly increasing upon moving 
- If a unit has **less power** upon collision with other team's unit 
it **gets killed** giving a point to the other team's score
- The surviving unit **looses all its power**
- The **speed of a unit increases** for every **50 power** it has
- **Dying units respawn right away** randomly placed on the battlefield 