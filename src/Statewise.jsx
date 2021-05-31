import {React , useEffect, useState} from 'react';
import { Table, Tr, Thead, Th, Tbody, Center,} from "@chakra-ui/react"

const Statewise = ()=>{

    const [data, setdata] = useState([]);


    const getCovidData = async() =>{
        const res= await fetch('https://api.covid19india.org/data.json');
        const actualData= await res.json();
        console.log(actualData)
        setdata(actualData.statewise)

    }

    useEffect(() => {
        getCovidData();
    }, [])

    return <>
        <Center fontSize="4xl" color='#b5654e'>Get  India's Covid Data</Center>
        <Table color='	#fff' mx='auto'>
                <Thead>
                <Tr bg='#e1c0b7' color="#b5654e">
                        <Th>State</Th>
                        <Th>Confirmed</Th>
                        <Th>Recovered</Th>
                        <Th>Deaths</Th>
                        <Th>Active</Th>
                        <Th>Updated</Th>
                    </Tr>
                </Thead>
                <Tbody>


                {
                    data.map((curElement, ind)=>{
                        return (
                            <Tr key={ind} color="#bd7561" bg='#fff'>
                                <Th>{curElement.state}</Th>
                                <Th>{curElement.confirmed}</Th>
                                <Th>{curElement.recovered}</Th>
                                <Th >{curElement.deaths}</Th>
                                <Th>{curElement.active}</Th>
                                <Th>{curElement.lastupdatedtime}</Th>
                            </Tr>)
                    })
                }
                </Tbody>
         </Table>
    </>
}

export default Statewise;