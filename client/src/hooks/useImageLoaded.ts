import { useEffect, useRef, useState } from 'react'



interface ImageOnLoadType {
  handleImageOnLoad: () => void,
  isLoaded: boolean
}

const useImageLoaded = () => {
    const [loaded, setLoaded] = useState(false)
    const ref = useRef()
  
    const onLoad = () => {
      setLoaded(true)
    }
  
    useEffect(() => {
        //@ts-ignore
      if (ref.current && ref.current.complete) {
        onLoad()
      }
    })
  
    return [ref, loaded, onLoad]
  }

export default useImageLoaded