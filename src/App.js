import { BrowserRouter, Route } from 'react-router-dom';

import ContentContext from './contexts/ContentContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Channels from './pages/Channels';
import Programs from './pages/Programs';
import Categories from './pages/Categories';
import Channel from './pages/Channel';

function App() {
  return (
    <div className="App">
      <ContentContext>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/channels" component={Channels} />
          <Route exact path="/programs" component={Programs} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/channels/:channelId" component={Channel} />
        </BrowserRouter>
      </ContentContext>
    </div>
  );
}

export default App;