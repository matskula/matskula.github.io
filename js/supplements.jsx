'use strict';
const API_URL = 'http://78.46.244.156/api/'

// import React from 'react'
// import ReactDOM from 'react-dom'

class Supplement extends React.Component {

  constructor(props) {
      super(props);
      this.state = { active: false };
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let request = new XMLHttpRequest()
    request.open("GET", API_URL + "classes/" + this.props.info['class_id'], false);
    request.send();
    let data = JSON.parse(request.responseText)
    // console.log(data)
    let class_name = data['name']
    request = new XMLHttpRequest()
    request.open("GET", API_URL + "purposes/" + this.props.info['purpose_id'], false);
    request.send();
    data = JSON.parse(request.responseText)
    // console.log(data)
    let purpose_name = data['name']
    request = new XMLHttpRequest()
    request.open("GET", API_URL + "supplements/" + this.props.info['id'] + "/side-effects", false);
    request.send();
    data = JSON.parse(request.responseText)
    // console.log(data)
    let side_effects = []
    for (let i = 0; i< data.length; i++) {
        side_effects.push(data[i]['name'])
    }
    document.getElementById('supplement-class').innerText = class_name
    document.getElementById('supplement-purpose').innerText = purpose_name
    document.getElementById('supplement-side-effects').innerText = side_effects.join(', ')
}

  render() {
      return (
          <div className={this.state.active ? 'supplement-active' : 'supplement'} onClick={this.handleClick}>
              {this.props.info.name}
          </div>
      );
  }

}

let request = new XMLHttpRequest()
request.open("GET", API_URL + "supplements", false);
request.send();
let data = JSON.parse(request.responseText)
let content = []

for (let i = 0; i < data.length; i++) {
  content.push(<Supplement info={data[i]}/>)
}

ReactDOM.render(
    <React.Fragment>
        {content}
    </React.Fragment>,
    document.getElementById('supplement-container')
)