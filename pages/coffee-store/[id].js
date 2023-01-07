import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const coffeStore = () => {
  const Router = useRouter()
  return (
    <div>
      coffee sore page {Router.query.id}
      <Link href='/'>Back to home</Link>
      <Link href='/coffee-store/dynamic'>Go to page dynamic</Link>
    </div>
  )
}

export default coffeStore;
