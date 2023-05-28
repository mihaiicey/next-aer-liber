import Image from 'next/image'
import CitySensors from '../components/CitySensors'


export default function Home() {
  return (
    <CitySensors city={'all'} lat={45.79096706238455} lng={24.14851086004162}/>
  )
}
