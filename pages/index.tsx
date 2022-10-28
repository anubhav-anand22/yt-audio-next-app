import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <form>
        <input type="url" required placeholder='Youtube video or playlist url' />
        <button>
          Go
        </button>
      </form>
    </div>
  )
}
