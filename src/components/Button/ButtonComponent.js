import { Button } from '@mui/material'
import React from 'react'
import stylebtn from "./Button.module.css";

function ButtonComponent({name}) {
  return (
    <>
      <Button type={name} variant="contained" sx={{backgroundColor: "#8174A0"}}>{name}</Button>
    </>
  )
}

export default ButtonComponent
