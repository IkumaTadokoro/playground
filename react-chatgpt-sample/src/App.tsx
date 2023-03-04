import { useState } from 'react'
import axios from 'axios'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const fetchData = async (input: string) => {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [{
          role: 'user',
          content: `${input}`,
        }],
        model: 'gpt-3.5-turbo',
        n: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      },
    )

    return response.data.choices[0].message.content
  }

  const handleClick = async () => {
    try {
      setLoading(true)
      const completedSentence = await fetchData(input)
      setMessages(completedSentence)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid h-screen grid-rows-auto grid-rows-[auto_1fr_auto]">
      <header className='bg-white border-b border-gray-200 p-4'>
        <h1 className='font-bold text-zinc-600 text-3xl'>ChatGpt x React</h1>
      </header>
      <main className='max-w-5xl px-20 py-8'>
        <div className='flex flex-col space-y-4'>
          <label htmlFor="message" className="text-sm font-bold text-gray-900">メッセージ</label>
          <textarea id="message" onChange={handleChange} value={input} rows={20} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="ぷれいすほるだ〜" />
          <button type="submit" onClick={handleClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {isLoading ? '生成中...' : '生成'}
          </button>
        </div>
        <div>
          <p>{messages}</p>
        </div>
      </main>
      <footer className='border-t border-gray-200 bg-gray-50 p-4 grid place-content-center'>
        <p className='text-gray-400 text-sm font-semibold'>ChatGPT x React</p>
      </footer>
    </div>
  )
}

export default App
