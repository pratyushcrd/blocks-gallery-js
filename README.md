# BlocksGallery


BlocksGallery is a vanilla javascript based gallery, that supports a bunch of cool animations. Every time you do next all images are divided into blocks and then the animations are applied over it.

### Supported animations

  - Random fading blocks 
  - Falling blocks

### Extend Animations

BlocksGallery internally uses SnapSVG - a light-weight library for Svg manipulation.
It is super easy to add a new animation to BlocksGallery.

```
BlocksGallery.addAnimation('flyingBlocks', (speed, blockObject, done, rowIndex, colIndex) => {
    let image = blockObject.img;
    let time = 1000 / speed // speed is >= 0
    const defaults = {
        x: image.attr('x'),
        y: image.attr('y'),
    }
    
    img.animate({
        x: something,
        y: somevalue,
    },
    time,
    () => {
        // on animation completetion call the done function
        done()
    })

    // Return default values of attributes that this function changed
    return defaults
})
```

### Tech

Opensource projects used by BlocksGallery:

* [SnapSVG] - Light-weight library for SVG manipulation
* [NodeJs] - Javascript runtime for Server
* [Webpack] - Module bundler for Nodejs
* [Eslint] - Javascript linter
* [Babel] - Javascript transpiler

### Installation

Under development, check this section for updates

### Development

Want to contribute? Great!

BlocksGallery uses Webpack for fast developing.
Make a change in your file and instantanously see your updates!

```
> git clone https://github.com/pratyushcrd/blocks-gallery-js.git
> cd BlocksGallery
> npm install
> npm start
```

Make the changes and raise a pull request.

### Todos

 - Adding more animation
 - Custom block shape support (aprt from rectangle boxes)

License
----

MIT


**Free Software, Hell Yeah!**

[SnapSVG]: <http://snapsvg.io/>
[NodeJs]: <https://nodejs.org/en/>
[Webpack]: <https://webpack.js.org/>
[Eslint]: <http://eslint.org/> 
[Babel]: <https://babeljs.io/>
