import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkId = async () => {
    const { userId } = await auth()
    if (userId) {
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        })

        return user
    }
}
