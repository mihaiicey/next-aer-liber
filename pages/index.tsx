import Image from 'next/image'
import { Inter } from 'next/font/google'
import CitySensors from '../components/CitySensors'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <CitySensors city={'sibiu'} lat={45.79096706238455} lng={24.14851086004162}/>
  )
}
