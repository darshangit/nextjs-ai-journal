import { Editor } from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({})
}
const EntryPage = ({ params }) => {
    return (
        <div>
            <Editor />
        </div>
    )
}

export default EntryPage
