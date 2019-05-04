import React from 'react';
import Welcome from './Welcome.js';
import MessagePage from './MessagePage.js';
import '../styles/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      userName: "gigi"
    };

    this.changeToMessagePage = this.changeToMessagePage.bind(this);
  }


  changeToMessagePage(userName) {
    if (!userName)
      return;

    this.setState({
      page: 2,
      userName: userName
    });

  }

  render() {
    return (
        <div className="firstDiv">
          { this.state.page === 1 && <Welcome changePage={this.changeToMessagePage}/> }
          { this.state.page === 2 && <MessagePage userName={this.state.userName}/>}
        </div>
    );
  }
}

export default App;
