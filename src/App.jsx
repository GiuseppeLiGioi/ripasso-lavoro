import { useState, useEffect } from 'react'

function App() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")


  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")

  const [isNewformVisible, setIsNewFormVisible] = useState(false)


  async function fetchUsers() {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/users', {
        method: "GET"
      })

      if (!res.ok) {
        throw new Error("Errore nella risposta durante la chiamata GET")
      }

      const data = await res.json()

      setUsers(data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
    }
  }


  async function addUser(e) {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      })

      if (!res.ok) {
        throw new Error("Errore nella risposta del server durante la chiamata")
      }


      const newUser = await res.json()

      setUsers([...users, newUser])

      setLoading(false)
      setName("")
      setEmail("")


    } catch (error) {

      setError(error.message)
    }
  }



  async function updateUser(e) {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:4000/users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, email: editEmail })
      })

      if (!res.ok) {
        throw new Error("Errore nella risposta durante la chiamta al server")
      }

      const updatedUser = await res.json()
      setUsers(users.map((u) => u.id === editingId ? updatedUser : u))
      setLoading(false)
      setIsNewFormVisible(false);
      setEditingId(null);

    } catch (error) {
      setError(error.message)
    }
  }


  async function deleteUser(id){
    try{
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE"
      })

      if(!res.ok){
        throw new Error("Errore nella risposta durante la chiamata DELETE")
      }

      setUsers(users.filter((u) => u.id !== id))
      setLoading(false)

    }catch(error){
     setError(error.message)
    }
  }


  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>

      {loading && (
        <p>caricamento in corso...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder='inserisci il tuo nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder='inseriscila tua email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type='submit'>Aggiungi Utente</button>
      </form>




      <div className='container-users'>
        {
          users.map((u) => (
            <div className='container-single-user' key={u.id}>
              <h2><span>Name:</span>{u.name}</h2>
              <p><span>Email:</span>{u.email}</p>

              <button onClick={() => {
                setEditingId(u.id)
                setEditName(u.name)
                setEditEmail(u.email)
                setIsNewFormVisible(true)
              }}>Modifica Utente</button>

              <button onClick={() => {
                deleteUser(u.id)
              }}>Elimina Utente</button>

            </div>
          ))
        }
      </div>

      {isNewformVisible && (
        <form onSubmit={updateUser}>
          <input
            type="text"
            placeholder='modifica il tuo nome'
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          <input
            type="email"
            placeholder='modifica la tua email'
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />

          <button type='submit'>Salva Modifiche</button>
        </form>
      )}

    </>
  )


}

export default App
