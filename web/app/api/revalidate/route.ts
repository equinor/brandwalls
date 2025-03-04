import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    //@ts-ignore: TODO _type error
    const { isValidSignature, body } = await parseBody<{ _type }>(req, process.env.SANITY_REVALIDATE_SECRET)
    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(JSON.stringify({ message, isValidSignature, body }), { status: 401 })
    }
    if (!body?._type) {
      const message = 'Bad Request'
      //@ts-ignore: TODO message error
      return new Response({ message, body }, { status: 400 })
    }
    console.log('body?._type', body?._type)
    // If the `_type` is `slide`,`slideshow` or `location` then all `client.fetch` calls with
    // `{next: {tags: ['location']}}` will be revalidated
    // TODO ensure that all three types changes trigger location fetches
    await revalidateTag(body._type)
    return NextResponse.json({ body })
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}
