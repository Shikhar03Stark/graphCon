import React from 'react';
import './MenuStyle.css';

export default class Menu extends React.Component {

    
    render(props){
        let toggleMenu = () => {
            let menu = document.getElementById("menuCard");
            if(menu.style.display === "flex"){
                menu.style.display = "none";
            }
            else{
                menu.style.display = "flex";
            }
        }

        let jumbo = () => {
            toggleMenu();
            let jumboElement = document.getElementById("jumbo");
            document.getElementById("menuButton").style.display = "none";
            jumboElement.style.display = "flex";
        }

        let closeJumbo = () => {
            let jumboElement = document.getElementById("jumbo");
            jumboElement.style.display = "none";
            document.getElementById("menuButton").style.display = "flex";
        }

        return (
            <div className="menu">
                <div className = "about" id = "jumbo">
                    <h1>Thanks for visiting!!</h1>
                    <p style = {{textAlign: "center", width: 800,}}>
                        Hey user, thank you for checking out this page.
                        I made this App to visualise my online connection with people with the help of Facebook Graph API.<br /><br />

                        I came up with an interesting problem of sparsing the graph to make it more readable, I used simulation to spread the nodes.
                        I assumed edges to be ideal springs with nodes as weights which with damping come to desired edge length
                        then to attain proper position of Nodes I used repulsion amoung Nodes.<br /><br />

                        I encountered a lot of security restrictions from Facebook Graph API (which has a positive side as well), that barred 
                        the access to friends list, and I could not see a way out. There's no easy way out (you can't access profiles who liked a post and etc).<br /><br />

                        So the project had to be left incomplete. All the forms are dead XO. Just for fun I added 10 nodes which will spawn a new position after every reload.<br /><br />

                        Again, Thanks for visiting my App.<br />
                        <a href = "https://github.com/Shikhar03Stark" style={{color: "white"}}> Visit My GitHub </a><br />
                        Shikhar Vishwakarma<br />

                    </p>
                    <button class = "closeJumbo" onClick = {closeJumbo}>Close</button>
                </div>
                <div className="menu-display" id="menuCard">
                    <div className = "menu-display-info">
                        Connect Social Media
                    </div>
                    <div className = "menu-display-form">
                        <input type="email" placeholder="email@example.com" name="email" />&nbsp;
                        <input type = "password" placeholder="Password" name="password" />
                    </div>
                    <div className = "menu-display-mediaButton">
                        <button id = "facebook">Facebook</button>
                        <button id = "instagram" onClick={jumbo}>About</button>
                    </div>
                </div>
                <button className = "menu-button" id = "menuButton" onClick={toggleMenu}>Menu</button>
            </div>
        );
    }
};