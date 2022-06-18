import React, { useState } from 'react';
import { httpClient } from './httpClient';
import Button from './Button';

const submit = async ({ data, onSuccess, onError }) => {
  const { ci, password } = data;
  if (!ci || !password) {
    return window.alert("Complete todos los campos")
  }
  try {
    return await httpClient.post('/login', { ...data }) && onSuccess();
  } catch ({ response: { status, data } }) {
    if (status === 401) {
      onError()
      window.alert(data)
    }
    else {
      window.alert(`Ha ocurrido un error de status ${status}, por favor intente mas tarde`)
    }
  }

}

const Login = ({ onSuccess }) => {
  const [ci, setCi] = useState('1000002');
  const [password, setPassword] = useState('contrasenia2');

  const onError = () => {
    setCi('');
    setPassword('');
  }

  return (
    <div>
      <label htmlFor="ci">Cedula</label>
      <br />
      <input type="text" id="ci" value={ci} onChange={e => setCi(e.target.value)} />
      <br />
      <label htmlFor="pass">Contraseña</label>
      <br />
      <input type="password" id="pass" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <Button onClick={() => submit({ onSuccess, data: { ci, password }, onError })} label="Login" />
    </div>
  );
}

export default Login;
