import React from 'react'
import './Pagination.css'

// export default function Pagination({ goToNextPage, displayStats, goToPrevPage }) 
export default function Pagination({ goToNextPage, goToPrevPage }) {
  return (
    <>
      <div className="Previous">
        {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
      </div>
      {/* <div className="Stats">
        <button onClick={displayStats}>Stats</button>
      </div> */}
      <div className="Next">
        {goToNextPage && <button onClick={goToNextPage}>Next</button>}
      </div>
    </>
  )
}
