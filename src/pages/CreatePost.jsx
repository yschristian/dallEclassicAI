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
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => { }
  const handleChange = (e) => { }
  const handleSupriseMe = (e) => { }

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
          </div>
        </div>

      </form>
    </section>
  )
}

export default CreatePost