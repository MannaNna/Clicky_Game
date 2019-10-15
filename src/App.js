import React, { Component } from "react";
import FamilyCard from "./components/FamilyCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import family from "./family.json";

class App extends Component {
  // Setting this.state.family to the family json array
  state = {
    family,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.family.forEach(card => {
      card.clickedonce = 0;
    });
    alert(`Game Over \nScore: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }


  clickCount = (id) => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    this.state.family.find((o, i) => {
      if (o.id === id) {
        if(family[i].clickedonce === 0){
          family[i].clickedonce = family[i].clickedonce + 1;
          this.setState({score: this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.family.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
    // console.log(event.target);
    // const {value, name } = event.target;
    // console.log(event.target.alt + ":" + this.state.score);
    // console.log(event.target.clickedonce);
    // this.setState({
    //   [name]: value,
    //   score: this.state.score + 1
    // });
    // console.log("score" + ": " + this.state.score);
  };


  // Map over this.state.family and render a FamilyCard component for each family object
  render() {
    return (
      <Wrapper>
        <Title>Clicky Family Game | Score: {this.state.score} | Highscore: {this.state.highscore}</Title>
        {this.state.family.map(picture => (
          <FamilyCard
            clickCount = {this.clickCount}
            id={picture.id}
            key={picture.id}
            name={picture.name}
            image={picture.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;