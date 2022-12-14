import axios from 'axios';
import { React, useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState('');
  const [search, setSearch] = useState('');
  useEffect(() => {
    async function getPixabayQuery() {
      // get les photos avec async/await
      const res = await axios.get(
        `https://pixabay.com/api/?key=29294609-f445397148cc5be28fc78b375&q=${search}&image_type=photo&pretty=true` // Je laisse ma clé de l'api car c'est gratuit
      );
      setData(res.data.hits);
    }
    getPixabayQuery();
  }, [search]); // on execute dès que on cherche qlqchose dans la barre

  return (
    <div className="w-screen grid justify-items-center">
      <div className="w-10/12 grid justify-items-center m-5 bg-slate-400 rounded border p-2">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
          Recherchez une image
        </h1>
        <input
          onChange={(e) => setSearch(e.target.value)} // on met à jour la recherche
          placeholder="Chercher..."
          className="form-control px-3 py-1.5 text-gray-700 bg-clip-padding border border-solid 
          border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none"
        />
        {data.length !== 0 ? ( // si il y a des photos à afficher
          <div className="flex flex-column justify-center border rounded flex-wrap w-10/12 m-2">
            {data.map((photo) => {
              // on les affiche toutes
              return (
                <a href={photo.pageURL} target="_blank" rel="noreferrer">
                  <img
                    className="max-h-40 max-w-40 m-2"
                    key={photo.id}
                    src={photo.largeImageURL}
                    alt="Chargement"
                  />
                </a>
              );
            })}
          </div>
        ) : (
          // sinon on affiche rien
          <h1>Aucune photo...</h1>
        )}
      </div>
    </div>
  );
}

export default App;
