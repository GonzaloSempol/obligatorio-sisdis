import React, { useEffect, useState } from 'react';
import { httpClient } from './httpClient';
import Button from './Button';

const submit = async ({ data, onSuccess }) => {
  try {
    const { partido } = data;
    if (partido) {
      const { status } = await httpClient.post(
        '/votar',
        { ...data },
      );
      if (status === 200)
        onSuccess();
    }
    else {
      console.log('Selecciona partido');
    }
  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

const Vote = ({ onSuccess }) => {
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
          onSuccess, data: {
            partido: voto,
            departamento: "Montevideo",
            circuito: "A1001"
          }
        })}
        label="Votar"
      />
    </>
  )

}

export default Vote;
