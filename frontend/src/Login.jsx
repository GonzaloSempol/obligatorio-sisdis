import React, { useState } from 'react';
import { httpClient } from './httpClient';
import Button from './Button';

const submit = async ({ data, onSuccess }) => {
  try {
    const { status } = await httpClient.post(
      '/login',
      { ...data },
    );
    if (status === 200)
      onSuccess();
  } catch (error) {
    console.log('error');
    console.log(error);
  }
}

const Login = ({ onSuccess }) => {
  const [ci, setCi] = useState('1000002');
  const [password, setPassword] = useState('contrasenia2');

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
      <Button onClick={() => submit({ onSuccess, data: { ci, password } })} label="Login" />
    </div>
  );
}

export default Login;
