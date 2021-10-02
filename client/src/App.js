import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import PageQuality from "./pages/4KPage/PageQuality";
import Browse from "./pages/browse/Browse";
import Home from "./pages/home/Home";
import Trending from "./pages/trending/Trending";
import Contact from "./pages/contact/Contact";
import Single from "./pages/single/Single";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";
import Settings from "./pages/settings/Settings";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <ScrollToTop>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/browse-movies/:pageId">
            <Browse />
          </Route>
          <Route path="/trending">
            <Trending />
          </Route>
          <Route path="/browse-movies/2160p">
            <PageQuality />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/movie/:id">
            <Single />
          </Route>
          <Route path="/settings">{user ? <Settings /> : <Home />}</Route>
        </Switch>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
