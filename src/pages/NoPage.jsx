import React, {useEffect} from 'react'
import { NavLink, useNavigate  } from 'react-router-dom'

// CSS
import { Button } from 'react-bootstrap'

const NoPage = () => {

  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [])

  return (
    <>
     <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                <p class="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <Button as={NavLink} to="/" class="btn btn-primary"> Go Home </Button>
            </div>
        </div>
    </>
  )
}

export default NoPage