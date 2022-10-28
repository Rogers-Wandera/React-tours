import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");

  const removeTour = (id) => {
    let newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  const fechTours = async () => {
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }

  useEffect(() => {
    fechTours()
  },[])

  if(loading) {
    return <main><Loading /></main>
  }

  if(error){
    return <section>
      <h4>{error}</h4>
      <p>Please Check your network connection and refresh the page</p>
      </section>
  }

  if(tours.length === 0) {
    return <main>
      <h4>No Tours left</h4>
      <button className='btn' onClick={fechTours}>Refresh</button>
    </main>
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
}

export default App
