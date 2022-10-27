import { Rating } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addRating, getGivenRating } from '../api/ratingApi'
import star from '../assets/star.svg'
import { Context } from '../index'

type RatingProps = {
  deviceId: number,
  overallRating: number
}

const RatingComponent = observer(({deviceId, overallRating}: RatingProps) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
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

    const add = (ratingValue: number) => {
      if(user.isAuth){
        setGivenRating(ratingValue)
        addRating(deviceId, ratingValue).then(data => {
          setOverallRatingValue(data)
        })
      }
      else {
        navigate('/login')
      }
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
          add(Number(newValue));
        }}
      />
  </>)
})

export default RatingComponent