import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import preview from "../assets/preview.png"
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: ""
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = async (e) => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch("http://localhost:8000/api/v1/dall/gene", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        })
        const data = await response.json()
        console.log(data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        console.log(error);
        // alert(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert("please enter prompt")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.prompt && form.photo) {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:8000/api/v1/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)

        })
        await response.json()
        navigate('/')
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }else{
      alert("please enter prompt and generate image")
    }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSupriseMe = (e) => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className='max-w-xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          create
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus aliquid ratione eum consectetur, labore accusantium aspernatur nam incidunt laboriosam exercitationem beatae libero, optio quaerat culpa non molestias repellat eveniet magni!
        </p>
      </div>
      <form className='mt-16 mx-w-xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your Name'
            type='text'
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName='Your prompt'
            type='text'
            name="prompt"
            placeholder="prompt"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity "
              />
            )}
            {generatingImg && (
              <div className="absolute insert-0 z-0 flex justify-center items-center bg-[rgb(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md px-5 py-2.5 text-sm w-full sm:w-auto text-center"
          >
            {generatingImg ? "Generating...." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nesciunt, cum nulla blanditiis dignissimos est cumque doloribus ducimus impedit asperiores ex laboriosam fugit illum enim eius repellendus sunt soluta perspiciatis!
          </p>
          <button type='submit' className='mt-5 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost