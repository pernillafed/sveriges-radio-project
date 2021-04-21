import { BrowserRouter, Route } from 'react-router-dom';

import ChannelContext from './contexts/ChannelContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <ChannelContext>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </ChannelContext>
    </div>
  );
}

export default App;