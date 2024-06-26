import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
            .string()
            .describe('the mood of the person who wrote the hournal entry'),
        summary: z.string().describe('quick summary of the entire entry'),
        subject: z.string().describe('the subject of the journal entryu'),
        negative: z
            .boolean()
            .describe(
                'is the journal entry negative? (i.e does it contain negative emotions?)',
            ),
        color: z
            .string()
            .describe(
                'a hexadecimal color code to represent the mood of the entry. Example #0101fe for blue representing happiness',
            ),
    }),
)

const getPrompt = async (content) => {
    const formatted_instructions = parser.getFormatInstructions()
    const prompt = new PromptTemplate({
        template:
            'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formatted_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { formatted_instructions },
    })

    const input = await prompt.format({
        entry: content,
    })

    console.log(input)
    return input
}

export const analyze = async (content: string) => {
    const input = await getPrompt(content)
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const result = await model.call(input)
    console.log(result)
}
