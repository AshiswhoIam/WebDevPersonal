import Head from 'next/head'
import Layout from '../Layouts/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Welcome to My Site</title>
        <meta name="description" content="Next.js + TypeScript website" />
      </Head>
      <main>
        <h1>Hello World</h1>
        <p>landing page built with Next.js and TypeScript.</p>
      </main>
    </Layout>
  )
}
