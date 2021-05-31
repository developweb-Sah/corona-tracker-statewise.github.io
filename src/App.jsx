import React from 'react'
import "tailwindcss/tailwind.css"
import Statewise from './Statewise';
import './style.css'
import { ChakraProvider } from "@chakra-ui/react"



const App= ()=>{
    return <>
    <ChakraProvider>
    <Statewise/>
    </ChakraProvider>
    </>
}

export default App;