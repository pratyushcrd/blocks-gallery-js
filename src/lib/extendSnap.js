module.exports = function extendSnap(SnapGlobal) {
  SnapGlobal.plugin((Snap, Element) => {
    const whitespace = /[\x20\t\r\n\f]+/g

    const toggleClasses = function (classes, className, add) {
      classes = classes.trim().split(whitespace)
      className = className.replace(whitespace, ' ')

      const newClassName = classes.reduce((prevClassName, clazz) => {
        const clazzIndex = prevClassName.indexOf(` ${clazz} `)
        clazz = `${clazz} `

        if (add) {
          if (clazzIndex === -1) {
            return prevClassName + clazz
          }
        } else if (clazzIndex !== -1) {
          return prevClassName.replace(clazz, '')
        }

        return prevClassName
      }, ` ${className} `)

      if (className !== newClassName) {
        return newClassName.trim()
      }
    }

      // displays the element
    Element.prototype.show = function () {
      this.attr('display', '')
    }

      // hides the element
    Element.prototype.hide = function () {
      this.attr('display', 'none')
    }

      // toggles the element's visibility
    Element.prototype.toggle = function (showOrHide) {
      showOrHide = showOrHide === undefined
                   ? this.attr('display') === 'none'
                   : !!showOrHide

      this.attr('display', (showOrHide ? '' : 'none'))
    }

      // adds one or more space-separated class names.
    Element.prototype.addClass = function (classes) {
      const newClassName = toggleClasses(classes, this.node.className.baseVal, true)

      if (newClassName !== undefined) {
        this.node.className.baseVal = newClassName
      }
    }

      // removes one or more space-separated class names.
    Element.prototype.removeClass = function (classes) {
      const newClassName = toggleClasses(classes, this.node.className.baseVal, false)

      if (newClassName !== undefined) {
        this.node.className.baseVal = newClassName
      }
    }

      // toggles the specified class name.
    Element.prototype.toggleClass = function (clazz, toggle) {
      const className = ` ${this.node.className.baseVal.replace(whitespace, ' ')} `
      clazz = clazz.trim()
      toggle = toggle === undefined
               ? className.indexOf(` ${clazz} `) === -1
               : !!toggle

      if (toggle) {
        this.addClass(clazz)
      } else {
        this.removeClass(clazz)
      }
    }
  })
}
