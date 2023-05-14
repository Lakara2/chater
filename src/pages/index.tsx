import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  
  function handleClick() {
    router.push('/login');
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <button type="submit" className='btn btn-success' onClick={handleClick}>Chater-App</button>
        </div>
      </div>
    </>
  )
}
