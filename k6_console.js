class k6_console {

  constructor( P = {} ) {

    this.prefix = P.prefix               || ''
    this.header = P.header               || 'K6'
    this.mobile = P.mobile               || 'bl'; if( this.mobile == 'false' ) this.mobile = false // tl, tr, bl, br, false
    this.prod   = P.prod || P.production || false

    if( ! this.prod ) console.warn( 'k6_console.js:', `Don't forget production: true or const ${this.prefix}CD = null, ${this.prefix}FCD = ${this.prefix}FCE = ${this.prefix}FCW = ${this.prefix}FCG = ${this.prefix}FCGE = ${this.prefix}FCT = ${this.prefix}FCI = ${this.prefix}FCL = ${this.prefix}FCLR = () => {}; for the production mode.` )

    if( this.mobile ) {
      this.FC                    =  document.createElement( 'pre' ); document.addEventListener( 'DOMContentLoaded', () => { document.body.appendChild( this.FC ) } )
      this.FC.id                 = 'k6_console'
      this.FC.style.position     = 'fixed'
      this.FC.style.fontSize     = '12px'
      this.FC.style.margin       = '10px 8px'
      this.FC.style.padding      =  '6px 8px'
      this.FC.style.borderRadius =  '4px'
      if( this.mobile == 'tl' ) { this.FC.style.top    = 0; this.FC.style.left  =  0 }
      if( this.mobile == 'tr' ) { this.FC.style.top    = 0; this.FC.style.right =  0 }
      if( this.mobile == 'bl' ) { this.FC.style.bottom = 0; this.FC.style.left  =  0 }
      if( this.mobile == 'br' ) { this.FC.style.bottom = 0; this.FC.style.right =  0 }
    } // if

    this.FM = ( font, back, args, json = true ) => {
      if( ! this.mobile ) return
      this.FC.style.          color                     = font
      this.FC.style.backgroundColor                     = back
      this.FC.innerText = json ? JSON.stringify( args ) : args
    } // function

    window[ this.prefix + 'CD'   ] = this.prod ? false    : true                                                                                                                                                  // Config           Debug 
    window[ this.prefix + 'FCD'  ] = this.prod ? () => {} : ( ... args ) => { console.debug   ( `%c${this.header}`, 'color: white; background-color: magenta;', ... args ); this.FM( 'white', 'magenta', args ) } // Function Console Debug
    window[ this.prefix + 'FCE'  ] = this.prod ? () => {} : ( ... args ) => { console.error   ( `%c${this.header}`, 'color: white; background-color: red    ;', ... args ); this.FM( 'white', 'red'    , args ) } // Function Console Error
    window[ this.prefix + 'FCW'  ] = this.prod ? () => {} : ( ... args ) => { console.warn    ( `%c${this.header}`, 'color: black; background-color: yellow ;', ... args ); this.FM( 'black', 'yellow' , args ) } // Function Console Warn
    window[ this.prefix + 'FCG'  ] = this.prod ? () => {} : ( ... args ) => { console.group   ( `%c${this.header}`, 'color: white; background-color: grey   ;', ... args ); this.FM( 'white', 'grey'   , args ) } // Function Console Group
    window[ this.prefix + 'FCGE' ] = this.prod ? () => {} : ( ... args ) => { console.groupEnd(                                                                          )                                      } // Function Console Group End
    window[ this.prefix + 'FCT'  ] = this.prod ? () => {} : ( ... args ) => { console.trace   ( `%c${this.header}`, 'color: white; background-color: blue   ;', ... args ); this.FM( 'white', 'blue'   , args ) } // Function Console Trace
    window[ this.prefix + 'FCI'  ] = this.prod ? () => {} : ( ... args ) => { console.info    ( `%c${this.header}`, 'color: black; background-color: cyan   ;', ... args ); this.FM( 'black', 'cyan'   , args ) } // Function Console Info
    window[ this.prefix + 'FCL'  ] = this.prod ? () => {} : ( ... args ) => { console.log     ( `%c${this.header}`, 'color: white; background-color: green  ;', ... args ); this.FM( 'white', 'green'  , args ) } // Function Console Log
    window[ this.prefix + 'FCLR' ] = this.prod ? () => {} : ( object   ) => {                                                                                                                                  // Function Console Log Recursive
      function replacer( K, V ) { if( typeof V === 'object'
                                  &&         V !==  null    ) { if( cache.indexOf( V ) !== -1 ) return
                                                                    cache.push   ( V )        } return V }
      let                                              cache = []
      let result = JSON.stringify( object, replacer ); cache = null
      console.log( `%c${this.header}`, 'color: white; background-color: black;', result        )
      this   .FM (                            'white',                 'black' , result, false )
    } // function

  } // constructor

} // class
