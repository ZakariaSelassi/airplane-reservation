import React,{useEffect,useState}from 'react'
import Flights from '../components/explorer/Flights'
import SearchBar from '../components/explorer/SearchBar'
import {useDispatch,useSelector} from 'react-redux'
import {fetchAll} from '../features/flight/flightSlice'
import Pagination from '../components/explorer/Pagination'
import { Outlet } from 'react-router-dom'
const FlightList = () => {
  const dispatch = useDispatch()
  const {flights,loading,error} = useSelector(state => state.flight)
  const [inputSearch, setInputSearch] = useState("");
  const [currentPage,setCurrentPage] = useState(1)
  const [flightPerPage] = useState(5)

  /**
   * @description: useEffect to fetch all flights
   * 
   */
  useEffect(() => {
    if(error){
      console.log(error)
    }
    dispatch(fetchAll())  
  },[dispatch]) 
  
   const indexOfLastFlight = currentPage * flightPerPage;
   const indexOfFirstFlight = indexOfLastFlight - flightPerPage;
   const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);


  /** 
   * @Description: Search flights by airline name,from and to destination
   * @param {string} inputSearch
   */
  const search = (data) => {
    return data.filter((flight) => flight.name.toLowerCase().includes(inputSearch)
    || flight.airplane.toLowerCase().includes(inputSearch)
    || flight.from.toLowerCase().includes(inputSearch)
    || flight.to.toLowerCase().includes(inputSearch))
  }
  /**
   * @Description: set value of inputSearch 
   *  
   */
  const handleSearch = (e) => {
    e.preventDefault()
    setInputSearch(e.target.value)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
 
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <section className='dashboard-container'>
      <h1>All Flights</h1>
      <SearchBar  handleSearch={handleSearch}/>
      <Flights flight={search(currentFlights)}/>
      <Pagination totalFlight={flights.length} flightPerPage={flightPerPage} paginate={paginate}/>
      <Outlet/>
    </section>
  )
}

export default FlightList