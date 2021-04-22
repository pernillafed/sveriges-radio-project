import { BrowserRouter, Route } from 'react-router-dom';

import ChannelContext from './contexts/ChannelContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Channels from './pages/Channels';
import Programs from './pages/Programs';
import Categories from './pages/Categories';

function App() {
  return (
    <div className="App">
      <ChannelContext>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/channels" component={Channels} />
          <Route exact path="/programs" component={Programs} />
          <Route exact path="/categories" component={Categories} />
        </BrowserRouter>
      </ChannelContext>
    </div>
  );
}

export default App;