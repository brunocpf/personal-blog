import {at, defineMigration, setIfMissing} from 'sanity/migrate'
// @ts-expect-error This legacy converter does not publish TypeScript declarations.
import blocksToMarkdown from '@sanity/block-content-to-markdown'

const serializers = {
  types: {
    code: (props: {node: {language: string; code: string}}) =>
      '```' + props.node.language + '\n' + props.node.code + '\n```',
  },
  marks: {
    inlineCode: (props: {children: string}) => '`' + props.children + '`',
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
