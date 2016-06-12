export function transformPageContent ( content ) {
  return {
    pics: content.pics.map( ( pic ) => {
      return Object.assign(
        {},
        pic,
        {
          'areas': pic.areas.map( ( area ) => {
            return Object.assign(
              {},
              area,
              {
                'position': {
                  left: Math.min( area.coords[0], area.coords[2] ) + 'px',
                  top: Math.min( area.coords[1], area.coords[3] ) + 'px',
                  width: Math.abs( area.coords[2] - area.coords[0] ) + 'px',
                  height: Math.abs( area.coords[3] - area.coords[1] ) + 'px'
                },
                'style': Object.assign(
                  {},
                  pic.style,
                  area.style
                )
              }
            )
          })
        }
      )
    })
  }
}