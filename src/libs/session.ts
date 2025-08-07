import { jwtVerify } from 'jose'

export const decodePayloadToken = async (token: string): Promise<any | null> => {
  const secret = process.env.PAYLOAD_SECRET
  if (!secret || secret.length === 0) return null

  try {
    const encoder = new TextEncoder()
    const secretEncoded = encoder.encode(secret)
    const hashBuffer = await crypto.subtle.digest('SHA-256', secretEncoded)

    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    const shortHash = hashHex.slice(0, 32)
    const key = encoder.encode(shortHash)

    const { payload } = await jwtVerify(token, key)
    return payload
  } catch (e) {
    console.error('Error decoding token:', e)
    return null
  }
}
