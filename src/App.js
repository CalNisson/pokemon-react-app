import "./App.css";

import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState()

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel
  }, [currentPageUrl])

  function extractDexNum(url) {
    var rx = /https:\/\/pokeapi\.co\/api\/v2\/pokemon\?offset=(.*)&limit=1/
    var strippedUrl = url.match(rx);
    return parseInt(strippedUrl[1]) + 1;
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  function displayStats() {
    setStats()
  }

  if(loading) return "Loading..."

  return (
    <>
      <div className = "App">
        <PokemonList pokemon={pokemon} />
      </div>
      <div className = "App">
        <Pagination 
          goToNextPage={nextPageUrl ? goToNextPage : null}
          displayStats={displayStats}
          goToPrevPage={prevPageUrl ? goToPrevPage : null}
        />
      </div>
    </>
  );
}

export default App;
