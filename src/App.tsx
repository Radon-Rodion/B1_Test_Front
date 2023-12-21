import { Component, ErrorInfo } from 'react';
import Header from './Components/Header/Header';
import {BrowserRouter} from 'react-router-dom';


interface AppProps {
}

interface AppState {
  hasError: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error);
    console.error(info.componentStack);
    App.getDerivedStateFromError();
  }

  render() {
    if (this.state.hasError) {
      return <>Oh no! Epic fail!</>
    }
    return <BrowserRouter>
      <div className="App">
        <Header />
      </div>
    </BrowserRouter>;
  }
}

export default App;

