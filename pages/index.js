import { useEffect, useState } from 'react'
import { getMemories } from 'utils/axios'
import { useSelector, useDispatch } from 'react-redux'
import { initMemory } from 'redux/memory'
import Loading from 'components/Loading'
import Memories from 'components/Memories'
import AddMemory from 'components/AddMemory'
import Head from 'next/head'

const Home = () => {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()
  const { utils, memory } = useSelector((state) => state)

  const func = async () => {
    const response = await getMemories()
    if (response.success) {
      setloading(false)
      if (!memory.memories.length) dispatch(initMemory(response.success))
    } else {
      setloading(false)
    }
  }

  useEffect(() => {
    func()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="home__container">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="description"
          content="save your memories online and secure"
        />
        <meta name="keywords" content="memories pictures save online" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="EN" />
        <title>memories</title>
      </Head>
      <Memories />
      {utils.active && <AddMemory />}
    </div>
  )
}
export default Home
