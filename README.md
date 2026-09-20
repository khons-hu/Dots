Dots - Components Programming - 2023
==========================
## Browser edition (2026)

The hosted build reuses the original React game components, dot images, blue background, level picker, stats, shop and result dialog from 2023. A local game service replaces the Java API for guest play. Buying and using power-ups are separate, as in the original interface.

No login, shared scores, comments or ratings are connected in this edition. Each tab has its own game and reloading starts over. The original Java backend and full React application remain available in this repository.

Small fixes: invalid moves do not spend turns, power-ups require enough points and owned inventory, and a matching pair is always available. The board fits mobile screens and an Execute button supplements right-click. Reduced-motion preferences are respected.

```sh
npm ci
npm test
npm run build
python3 -m http.server 4181 --directory dist
```

Vercel builds from the repository root and serves `dist/`. Hosting setup is pending. The earlier standalone redesign in `demo/` is not the deployment entry point.

# Video
[Dots - KP - 2023](https://www.youtube.com/watch?v=zQYQL29PYsc) - Final assignment

[Dots - JPA + REST](https://www.youtube.com/watch?v=msWIcJyOTHU) - Some Services

[Dots - Console UI + JDBC](https://www.youtube.com/watch?v=80IRkK9DpOM) - Logic of the game and simple java db connection showcase via cli

# Description
Dots is mainly a mobile game that challenges you to connect dots of the same color, vertically and horizontally.
This project's backend is implemented in Java Spring Boot, and the frontend is implemented in React.

# Gameplay

The game is played on a grid of dots. The player can connect dots of the same color, vertically and horizontally.
The goal of the game is to gain the most points by connecting the dots and executing them. After executing 2 or more dots,
the floating dots will fall down as they can, and the other empty spaces will be filled with new dots.
In this console implementation you can even buy power-ups during the game. You lose if you run out of available moves.
To win the game you have to reach minimally the needed score and the amount of each executed dot with the given colors.

# These power-ups are:
 Bomb: Destroys dots in a given radius around a given dot.

 ExtraMoves: Gives you 5 extra moves.

 ScoreMultiplier: Multiplies your score by 2.

# How to play
After giving your name and choosing a level, you will be presented with a grid of dots.
You can select dots by giving the right command being displayed on the screen with valid coordinates
of the dot you want to select. After selecting a dot, you can select another dot to connect them, or you can select more dots at a time in the command line too.
If the connection is valid, you can execute the connection by giving the right command.
If you executed them successfully, the floating dots will fall down and the empty spaces will be filled with new dots.
You can enter the power-up shop during the game by giving the right command, also you have to open the power-up menu to 
use your available power-ups with the right command.

# How to run
You will need Maven to build the project and database connection.
You have to run the server and the client side, respectively GameStudioServer.java and the React app.

# Screenshots
![image](
images/image1.png)


![image](
images/image2.png)


![image](
images/image3.png)


![image](
images/image4.png)


![image](
images/image5.png)


![image](
images/image6.png)


![image](
images/image7.png)
