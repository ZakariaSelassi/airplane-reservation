import React from 'react'

const Pagination = ({totalFlight,flightPerPage,paginate}) => {
  const pageNumbers = [];
  /**
   * @description: calculate the number of pages based on the total number of flights and the number of flights per page
   */
  for(let i = 1; i <= Math.ceil(totalFlight/flightPerPage); i++){
    pageNumbers.push(i)
  }

  return (
    <nav>
        <ul className='pagination'>
            {pageNumbers.map(number =>
                <li key={number} className='page-item'>
                <button className='page-link' onClick={() => paginate(number)} >{number}</button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Pagination