import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function NotFound() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 4000)
  }, [])

  return (
    <div className='not-found'>
      <h1> 404</h1>
      <h2> oop! that page cannot be found</h2>
      <p>
        redirecting to <Link href='/'> Homepage</Link> for dat good shit
      </p>
      <style jsx>{`
        .not-found {
          background: #fff;
          padding: 30px;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
          transform: rotateZ(-1deg);
        }
        h1 {
          font-size: 3em;
        }
      `}</style>
    </div>
  )
}

export default NotFound
