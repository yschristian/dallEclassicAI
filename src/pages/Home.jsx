import React, { useState, useEffect } from 'react'
import { Loader, FormField, Card } from '../components'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
      {title}
    </h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:8000/api/v1/getAll", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      
        })
        if (response.ok) {
          const result = await response.json()
          setAllPosts(result.data.reverse())
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [])
  return (
    <section className="mx-w-7xl mx-auto">
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          The community showcase
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus aliquid ratione eum consectetur, labore accusantium aspernatur nam incidunt laboriosam exercitationem beatae libero, optio quaerat culpa non molestias repellat eveniet magni!
        </p>
      </div>
      <div className='mt-16'>
        <FormField />
      </div>
      <div className='mt-10'>
        {
          loading ? (
            <div className='flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            <>
              {
                searchText && (
                  <h2 className='font-medium text-[#666e75] text-xl mb-3 '>
                    showing results for <span className='text-[#222328]'>{searchText}</span>
                  </h2>
                )
              }
            </>
          )
        }
        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 '>
          {searchText ? (
            <RenderCards
              data={[]}
              title="no search results found"
            />) : (
            <RenderCards
              data={allPosts}
              title="no postS found"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Home