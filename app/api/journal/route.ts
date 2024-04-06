import { getUserByClerkId } from '@/utils/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getUserByClerkId()
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day',
        },
    })

    revalidatePath('/journal')
    return NextResponse.json({ data: entry })
}
