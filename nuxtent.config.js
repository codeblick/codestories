const Prism = require('prismjs')
const sizeOf = require('image-size')

module.exports = {
  parsers: {
    md: {
      extend (config) {
        config.highlight = (code, lang) => {
          return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(code, Prism.languages[lang], 'javascript')}</code></pre>`
        }
      },
      plugins: [
        md => {
          md.inline.ruler.before('emphasis', 'image', (state, silent) => {
            let attrs
            let code
            let label
            let labelEnd
            let labelStart
            let pos
            let ref
            let res
            let title
            let width = ''
            let height = ''
            let token
            let tokens
            let start
            let href = ''
            let oldPos = state.pos
            let max = state.posMax

            if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false }
            if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false }

            labelStart = state.pos + 2
            labelEnd = md.helpers.parseLinkLabel(state, state.pos + 1, false)

            // parser failed to find ']', so it's not a valid link
            if (labelEnd < 0) { return false }

            pos = labelEnd + 1
            if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
              //
              // Inline link
              //

              // [link](  <href>  "title"  )
              //        ^^ skipping these spaces
              pos++
              for (; pos < max; pos++) {
                code = state.src.charCodeAt(pos)
                if (code !== 0x20 && code !== 0x0A) { break }
              }
              if (pos >= max) { return false }

              // [link](  <href>  "title"  )
              //          ^^^^^^ parsing link destination
              start = pos
              res = md.helpers.parseLinkDestination(state.src, pos, state.posMax)
              if (res.ok) {
                href = state.md.normalizeLink(res.str)
                if (state.md.validateLink(href)) {
                  pos = res.pos
                } else {
                  href = ''
                }
              }

              // [link](  <href>  "title"  )
              //                ^^ skipping these spaces
              start = pos
              for (; pos < max; pos++) {
                code = state.src.charCodeAt(pos)
                if (code !== 0x20 && code !== 0x0A) { break }
              }

              // [link](  <href>  "title"  )
              //                  ^^^^^^^ parsing link title
              res = md.helpers.parseLinkTitle(state.src, pos, state.posMax)
              if (pos < max && start !== pos && res.ok) {
                title = res.str
                pos = res.pos

                // [link](  <href>  "title"  )
                //                         ^^ skipping these spaces
                for (; pos < max; pos++) {
                  code = state.src.charCodeAt(pos)
                  if (code !== 0x20 && code !== 0x0A) { break }
                }
              } else {
                title = ''
              }

              if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
                state.pos = oldPos
                return false
              }
              pos++
            } else {
              //
              // Link reference
              //
              if (typeof state.env.references === 'undefined') { return false }

              // [foo]  [bar]
              //      ^^ optional whitespace (can include newlines)
              for (; pos < max; pos++) {
                code = state.src.charCodeAt(pos)
                if (code !== 0x20 && code !== 0x0A) { break }
              }

              if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
                start = pos + 1
                pos = md.helpers.parseLinkLabel(state, pos)
                if (pos >= 0) {
                  label = state.src.slice(start, pos++)
                } else {
                  pos = labelEnd + 1
                }
              } else {
                pos = labelEnd + 1
              }

              // covers label === '' and label === undefined
              // (collapsed reference link and shortcut reference link respectively)
              if (!label) { label = state.src.slice(labelStart, labelEnd) }

              ref = state.env.references[md.utils.normalizeReference(label)]
              if (!ref) {
                state.pos = oldPos
                return false
              }
              href = ref.href
              title = ref.title
            }

            //
            // We found the end of the link, and know for a fact it's a valid link;
            // so all that's left to do is to call tokenizer.
            //
            if (!silent) {
              state.pos = labelStart
              state.posMax = labelEnd

              let newState = new state.md.inline.State(
                state.src.slice(labelStart, labelEnd),
                state.md,
                state.env,
                tokens = []
              )
              newState.md.inline.tokenize(newState)

              let dimensions = sizeOf('./static/' + href)
              width = dimensions.width
              height = dimensions.height

              token = state.push('image', 'amp-img', 0)
              token.attrs = attrs = [['src', href],
                ['alt', '']]
              token.children = tokens
              token.block = true

              attrs.push(['layout', 'responsive'])

              if (title) {
                attrs.push(['title', title])
              }

              if (width !== '') {
                attrs.push(['width', width])
              }

              if (height !== '') {
                attrs.push(['height', height])
              }
            }

            state.pos = pos
            state.posMax = max
            return true
          })
        }
      ]
    }
  },
  content: [
    ['posts', {
      page: '_post',
      permalink: ':slug',
      isPost: false,
      generate: [
        'get',
        'getAll'
      ]
    }]
  ],
  api: {
    baseURL: 'http://localhost:3000',
    browserBaseURL: process.env.BROWSER_BASE_URL || 'http://localhost:3000'
  }
}
