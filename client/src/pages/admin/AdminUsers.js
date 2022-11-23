import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const AdminUsers = () => {
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('/api/users/delete/' + id)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            setRefresh(!refresh)

            window.scrollTo(0, 0)
        })
        .catch(error => {
            console.log(error)

            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if (error.response.status === 401)
                navigate('/login')
        })
    }

    useEffect(() => {
        axios.get('/api/users/')
            .then(resp => setPosts(resp.data))
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [refresh, setAlert])

    return (
        <>
            <div className="page-heading">
                <h1>Visi vartotojai</h1>
            </div>
            {posts ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            
                           
                            <th>Vardas</th>
                           
                            <th>Pavardė</th>
                            <th>El. paštas</th>

                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post =>
                            <tr key={post.id}>
                                <td>{post.id}</td>
                       
                              
                                <td>{post.first_name}</td>
                                <td>{post.last_name}</td>
                                <td>{post.email}</td>
                              
                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        
                                        <button 
                                        className="btn btn-warning" 
                                        onClick={() => handleDelete(post.id)}
                                        >
                                            Ištrinti
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra registruotų knygų</h3>
            }
        </>
    )
}

export default AdminUsers