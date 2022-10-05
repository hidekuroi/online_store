import { Rating } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { addRating, getGivenRating } from '../api/ratingApi'
import star from '../assets/star.svg'

const RatingComponent = observer(({deviceId, overallRating}) => {
    const [givenRating, setGivenRating] = useState(0)
    const [overallRatingValue, setOverallRatingValue] = useState(overallRating)

    useEffect(() => {
      setOverallRatingValue(overallRating)
    }, [overallRating])
    

    useEffect(() => {
        getGivenRating(deviceId).then(data => {
            if(data) setGivenRating(data.value)
        })

        return () => {
            setGivenRating(0)
        }

    }, [])

    const add = (ratingValue) => {
      setGivenRating(ratingValue)
      addRating(deviceId, ratingValue).then(data => {
        setOverallRatingValue(data)
      })
    }
    

  return (<>
    <div className="d-flex align-items-center " style={{fontSize:32}}>
      {`Рейтинг: ${Math.floor(overallRatingValue * 100) / 100}`}
      <img src={star} alt="Rating" width="28" height="28" />
    </div>

    <div>Данный вами рейтинг: {givenRating}</div>
    <Rating
        name="simple-controlled"
        value={givenRating}
        onChange={(event, newValue) => {
          add(newValue);
        }}
      />
  </>)
})

export default RatingComponent