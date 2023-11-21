import { Table1 } from "./views/Table1_view/Table1.jsx"

function App() {

  /*useEffect(()=>{
    axios.get('http://localhost:8000/api/myApp/')
      .then(({ data }) => {
        console.log('¿data',data)
      })
  },[]) */

 /*async function buttonTest() {
  axios.get('http://localhost:8000/api/myApp/')
      .then(({ data }) => {
        console.log('¿data',data)
      })
 }*/

  return (
    <>
      <Table1 />
    </>
  )
}

export default App
