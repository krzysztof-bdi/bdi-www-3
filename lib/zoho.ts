export async function sendZoho(payload: Record<string, any>) {
  const url = process.env.ZOHO_WEBHOOK_URL
  const token = process.env.ZOHO_API_TOKEN

  if (!url || !token) {
    // Brak konfiguracji – robimy „dry-run” (symulację)
    console.log('Zoho Dry Run: No webhook URL or token provided.')
    return { ok: true, dryRun: true }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const text = await res.text().catch(()=> '')
      throw new Error(`Zoho API error ${res.status}: ${text}`)
    }
    
    return { ok: true, dryRun: false }

  } catch (error) {
    console.error('Failed to send data to Zoho:', error)
    throw error
  }
}
