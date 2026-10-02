import studio from '@sanity/eslint-config-studio'

const config = [...studio, {ignores: ['dist/**', '.sanity/**']}]

export default config
