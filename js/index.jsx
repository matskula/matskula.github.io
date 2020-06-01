'use strict';
const API_URL = 'http://78.46.244.156/api/'

// import React from 'react'
// import ReactDOM from 'react-dom'

class Search extends React.Component {

    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let query = document.getElementById('search-query').value
        ReactDOM.render(
            <SearchResult q={query}/>,
            document.getElementById('search-result')
        )
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-center">
                <hr/>
                <input id="search-query" placeholder="Назва або Е-код" type="text"/>
                <hr/>
                <button className="search-button" onClick={this.handleClick}>Знайди</button>
                <hr/>
                <div id="search-result">

                </div>
            </div>
        );
    }

}

class SearchResult extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let url = 'http://78.46.244.156/search/query?q=' + this.props.q
        let request = new XMLHttpRequest()
        request.open("GET", url, false);
        request.send();
        let found
        let supplement
        if (request.status === 200) {
            let data = JSON.parse(request.responseText)
            found = true
            supplement = data[0]
        } else {
            found = false
        }
        if (!found) {
            return (
                <p>
                    NOT FOUND
                </p>
            );
        } else {
            let request = new XMLHttpRequest()
            request.open("GET", API_URL + "classes/" + supplement['class_id'], false);
            request.send();
            let data = JSON.parse(request.responseText)
            let class_name = data['name']
            request = new XMLHttpRequest()
            request.open("GET", API_URL + "purposes/" + supplement['purpose_id'], false);
            request.send();
            data = JSON.parse(request.responseText)
            let purpose_name = data['name']
            request = new XMLHttpRequest()
            request.open("GET", API_URL + "supplements/" + supplement['id'] + "/side-effects", false);
            request.send();
            data = JSON.parse(request.responseText)
            let side_effects = []
            for (let i = 0; i< data.length; i++) {
                side_effects.push(data[i]['name'])
            }
            return (
                <p style={{whiteSpace: "pre-line"}}>
                    Найменування - {supplement['name']}<br/>
                    Наша оцінка - {class_name}<br/>
                    Призначення - {purpose_name}<br/>
                    Побічні ефекти:<br/> - {side_effects.join('\n - ')}
                </p>
            );
        }
    }
}

class SearchPhoto extends React.Component {

  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
      alert('Вибач! Ми ще не імплементували дану функцію, але зробимо це зовсім скоро :)')
  }

  render() {
      return (
          <div className="d-flex flex-column justify-content-center">
              <input type="file"/>
              <br/>
              <hr/>
              <button className="search-button-inverse" onClick={this.handleClick}>Проаналізуй</button>
          </div>
      );
  }

}


ReactDOM.render(
    <Search/>,
    document.getElementById('search-container')
)

ReactDOM.render(
    <SearchPhoto/>,
    document.getElementById('search-photo')
)