import { BrowserRouter, Route } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import ContentContext from './contexts/ContentContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Channels from './pages/Channels';
import Channel from './pages/Channel';
import ChannelSchedule from './pages/ChannelSchedule';
import ChannelPrograms from './pages/ChannelPrograms';
import Programs from './pages/Programs';
import Program from './pages/Program';
import Categories from './pages/Categories';
import CategoryPrograms from './pages/CategoryPrograms';
import Whoami from './pages/Whoami';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <UserContext>
        <ContentContext>
          <BrowserRouter>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/channels" component={Channels} />
            <Route exact path="/channels/:channelId" component={Channel} />
            <Route exact path="/channels/schedule/:channelId" component={ChannelSchedule} />
            <Route exact path="/channels/programs/:channelId" component={ChannelPrograms} />
            <Route exact path="/programs" component={Programs} />
            <Route exact path="/programs/:programId" component={Program} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/categories/programs/:categoryId" component={CategoryPrograms} />
            <Route exact path="/users/whoami" component={Whoami} />
            <Route exact path="/users/login" component={Login} />
            <Route exact path="/users/register" component={Register} />
          </BrowserRouter>
        </ContentContext>
      </UserContext>
    </div>
  );
}

export default App;