import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './SingleBook.css';




const SinglePlace = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [place, setPlace] = useState({})
    

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })
    
 
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get('/api/places/single/' + id)
        .then(resp => {
            if(!resp.data) {
               
                navigate('/')
                return 
            }

            setPlace(resp.data)
        })
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [id, navigate, refresh])


    const handleRatings = (e, bookId) => {
        axios.post('/api/ratings/rating/' + bookId, {
            rating: e.target.value
        })
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setRefresh(!refresh)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if(error.response.status === 401)
                navigate('/login')
        })
    }

   

    return (
        <>
 
        <div className="container-single">
        
        <div className="single-post">


            <div className ="post">
                <div className="left">

                <img src={place.photo} alt={place.title}/>

                </div>



                <div className="right">
                <h1>{place.title}</h1>
                <div className="content">
                    {place.description}
                </div>
                </div>

                </div>





                <div className="form-comment">
                    
                            
                            {place.ratings ? 'Jūsų įvertinimas: ' + place.ratings.rating :
                                        <select onChange={(e) => handleRatings(e, place.placeId)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    }


                                    
                            <button className="btn-single">Post</button>
                     
                    
                   
                    </div>
            </div>
                
                    
               
            </div>
     
    
    </>
    ) 
}

export default SinglePlace