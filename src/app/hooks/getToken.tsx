'use server'

const user = process.env.API_USERNAME || ''
const password = process.env.API_PASSWORD || ''

if (!user || !password) {
  throw new Error(
    'API_USERNAME or API_PASSWORD is not defined in the environment variables.',
  )
}

const getToken = async () => {
  const formData = new FormData()
  formData.append('grant_type', 'password')
  formData.append('username', user)
  formData.append('password', password)

  const response = await fetch('https://cotacao.onrender.com/login', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch token: ${response.statusText}`)
  }

  const data = await response.json()

  const token = data.access_token
  return token
}
export default getToken
