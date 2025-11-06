import {at, defineMigration, set, setIfMissing} from 'sanity/migrate'
//@ts-ignore
import blocksToMarkdown from '@sanity/block-content-to-markdown'

const serializers = {
  types: {
    code: (props: any) => '```' + props.node.language + '\n' + props.node.code + '\n```',
  },
  marks: {
    inlineCode: (props: any) => '`' + props.children + '`',
  },
}

export default defineMigration({
  title: 'markdown-body',
  documentTypes: ['post'],

  migrate: {
    document(doc, ctx) {
      const {projectId, dataset} = ctx.client.config()

      console.log(`Migrating document ${doc._id}`)

      if (!doc.body) {
        console.log(` - no body field, skipping`)
        return
      }

      const markdown = blocksToMarkdown(doc.body, {
        serializers,
        projectId,
        dataset,
      })

      console.log(` - converted body to markdown (${markdown.length} chars)`)
      console.log(doc.bodyMd)

      return [at('bodyMd', setIfMissing(markdown))]
    },
  },
})
