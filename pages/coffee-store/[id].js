import { useRouter } from 'next/router';
import React from 'react'

const coffeStore = () => {
  const Router = useRouter()
  return (
    <div>
      coffee sore page {Router.query.id}
    </div>
  )
}

export default coffeStore;
