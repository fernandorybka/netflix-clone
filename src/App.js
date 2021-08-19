import React from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie  from './components/FeaturedMovie';
import Header from "./components/Header"

import './App.css';
import { useEffect } from 'react';

function App() {

  const [movieLists, setMovieLists] = React.useState([]);
  const [featuredMovieData, setFeaturedMovieData] = React.useState(null);
  const [blackHeader, setBlackHeader] = React.useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieLists(list);

      // Featured Movie
      let originals = list.filter(i=>i.slug === 'originals');

      let hasPoster = false;
      let chosenInfo = null;

      do {
        let randomChosen = 1 + Math.floor(Math.random() * (originals[0].items.results.length-2));
        let chosen = originals[0].items.results[randomChosen];
        chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      } while (!chosenInfo.backdrop_path)
      
      setFeaturedMovieData(chosenInfo);
    };

    loadAll();
  }, []
  );

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 15) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return (
    <div className="page">
      <Header blackHeader={blackHeader} />
      {
        featuredMovieData &&
        <FeaturedMovie item={featuredMovieData}/> 
      }

      <section className="lists">
        {movieLists.map((item, key) => (
          <div key={key}> 
            <MovieRow title={item.title} items={item.items} />
          </div>
        ))}
      </section>

      <footer>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site tmdb.org
      </footer>

      { movieLists.length <= 0 &&
        <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
        </div>
      }

    </div>
  );
}

export default App;
