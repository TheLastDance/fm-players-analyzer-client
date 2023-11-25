import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [test, setTest] = useState<any>({});

  useEffect(() => {
    fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        greeting: "Hello World!"
      }),
    })
      .then(res => res.json())
      .then(json => setTest(json))

  }, [])

  console.log(test);


  return (
    <>
      {test.greeting}
    </>
  )
}

export default App
