import React from 'react';
import Spinner from 'react-spinner-material';

const MySpinner = () => {
  return (
    <>
      <div className= "d-flex justify-content-center align-items-center min-vh-100">
        <Spinner radius={50} color={"#0d6efd"} stroke={3} visible={true} />
      </div>
    </>
  )
}

export default MySpinner;