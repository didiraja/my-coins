import crypto from 'crypto'

export const profitClassName = (profit: boolean) => {
  return profit ? 'text-green-500' : 'text-red-500'
}

export const validatePayloadToken = (token: string) => {
  const secret = process.env.PAYLOAD_SECRET

  if (!secret || secret.length === 0) {
    return false
  }

  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.')

    if (!headerB64 || !payloadB64 || !signatureB64) {
      return false
    }

    // Hash da secret do PayloadCMS
    const hashedSecret = crypto.createHash('sha256').update(secret).digest('hex').slice(0, 32)

    const signingInput = `${headerB64}.${payloadB64}`

    const expectedSignature = crypto
      .createHmac('sha256', hashedSecret)
      .update(signingInput)
      .digest('base64url') // usa base64url como o JWT

    // Verifica se a assinatura bate
    return expectedSignature === signatureB64
  } catch (err) {
    console.error('Erro ao validar assinatura JWT:', err)
    return false
  }
}
