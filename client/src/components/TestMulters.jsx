import React from 'react'

const TestMulters = () => {
  return (
    <div>
      <form action="http://localhost:8080/addproduct" encType='multipart/form-data' method='post'>
        <input type="file" name='image'/>
        <button type='submit'>test</button>
      </form>
    </div>
  )
}

export default TestMulters