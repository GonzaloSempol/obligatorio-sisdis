import React, { useEffect, useState } from 'react';
import { httpClient } from './httpClient';
import Button from './Button';

const submit = async ({ data, onSuccess, onExit }) => {
  const { partido } = data;
  if (!partido) {
    return window.alert("Selecciona partido")
  }
  try {
    return await httpClient.post('/votar', { ...data }) && onSuccess();
  } catch ({ response: { status, data } }) {
    const mensaje = status === 409 ? data : `Ha ocurrido un error de status ${status}, por favor intente mas tarde`;
    window.alert(mensaje)
    onExit()
  }
}

const Vote = ({ onSuccess, onExit }) => {
  const [partidos, setPartidos] = useState([]);
  const [voto, setVoto] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpClient.get('/partidos');
        setPartidos(data);
      } catch (error) {
        console.log('error');
        console.log(error);
      }
    }
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      {partidos.map((partido) => {
        return (
          <>
            <input
              type="radio"
              value={partido}
              name="vote-selection"
              checked={voto === partido}
              onChange={e => setVoto(e.target.value)}
            />
            {partido}
            <br />
          </>
        )
      })}
      <Button
        onClick={() => submit({
          onSuccess, onExit, data: {
            partido: voto,
            departamento: "Montevideo",
            circuito: "A1001"
          }
        })}
        label="Votar"
      />
      <Button
        onClick={onExit}
        label="Salir"
      />
    </>
  )

}

export default Vote;
