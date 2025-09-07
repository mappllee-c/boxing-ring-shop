import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // LINE Webhookからのメッセージを受信してUser IDをログ出力
    if (body.events && body.events.length > 0) {
      const event = body.events[0]
      if (event.type === 'message' && event.source) {
        console.log('=== LINE User ID 確認 ===')
        console.log('User ID:', event.source.userId)
        console.log('メッセージ:', event.message.text)
        console.log('========================')
      }
    }
    
    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'webhook error' }, { status: 500 })
  }
}