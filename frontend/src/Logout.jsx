// import React, { useState } from 'react';

import Button from "./Button";

const Logout = ({ onSuccess }) => {
  return (
    <>
      <h1>Enhorabuena!!</h1>
      <br />
      <h2>Su voto ha sido realizado con exito!</h2>
      <br />
      <Button onClick={onSuccess} label="Finalizar" />
    </>
  );
}

export default Logout;
