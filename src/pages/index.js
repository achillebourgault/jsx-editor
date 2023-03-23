import Head from 'next/head'

import EditSidebar from "@/components/Sidebar/EditSidebar/EditSidebar"
import PageEditor from "@/components/Editor/PageEditor/PageEditor"

export default function Home() {
  return (
      <>
        <Head>
          <title>JSX Editor</title>
          <meta name="description" content="Wyswyg editor" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <EditSidebar />
          <PageEditor />
        </main>
      </>
  )
}
