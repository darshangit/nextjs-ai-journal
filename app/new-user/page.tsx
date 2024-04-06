import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
    const user = await currentUser()

    console.log('user', user)

    const match = await prisma.user.findUnique({
        where: {
            clerkId: user?.id as string,
        },
    })

    if (!match) {
        if (user?.id && user?.emailAddresses[0]?.emailAddress) {
            await prisma.user.create({
                data: {
                    clerkId: user.id,
                    email: user.emailAddresses[0].emailAddress,
                },
            })
        }
    }

    redirect('/journal')
}

const NewUser = async () => {
    await createNewUser()

    return <div>...loading</div>
}

export default NewUser
