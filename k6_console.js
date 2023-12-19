class k6_console {

  constructor( P = {} ) {

    this.prod   = P.prod || P.production || false
    this.global = P.global               || true
    this.worker = P.worker               || false
    this.mobile = P.mobile               || 'bl'; if( P.mobile == false || P.mobile == 'false' ) this.mobile = false // tl, tr, bl, br, false
    this.header = P.header               || 'K6'
    this.prefix = P.prefix               || ''

    if( ! this.prod ) console.warn( 'k6_console.js:', `Don't forget "production: true" or "const ${this.prefix}CD = null, ${this.prefix}FCD = ${this.prefix}FCE = ${this.prefix}FCW = ${this.prefix}FCG = ${this.prefix}FCGE = ${this.prefix}FCT = ${this.prefix}FCI = ${this.prefix}FCL = ${this.prefix}FCLR = () => {}" for the production mode.` )

    if( ! this.worker && this.mobile ) {
      this.FC                    =  document.createElement( 'pre' ); document.addEventListener( 'DOMContentLoaded', () => { document.body.appendChild( this.FC ) } )
      this.FC.id                 = 'k6_console'
      this.FC.style.position     = 'fixed'
      this.FC.style.fontSize     = '12px'
      this.FC.style.margin       = '10px 8px'
      this.FC.style.padding      =  '6px 8px'
      this.FC.style.borderRadius =  '4px'
      if( this.mobile == 'tl' ) { this.FC.style.top    = 0; this.FC.style.left  = 0 }
      if( this.mobile == 'tr' ) { this.FC.style.top    = 0; this.FC.style.right = 0 }
      if( this.mobile == 'bl' ) { this.FC.style.bottom = 0; this.FC.style.left  = 0 }
      if( this.mobile == 'br' ) { this.FC.style.bottom = 0; this.FC.style.right = 0 }
    } // if

    this.FM = ( font, back, args, json = true ) => {
      if( this.worker || ! this.mobile ) return
      this.FC.style.          color                     = font
      this.FC.style.backgroundColor                     = back
      this.FC.innerText = json ? JSON.stringify( args ) : args
    } // function

    this.CD   = this.prod ? false    : true                                                                                                                                                                 // Config           Debug
    this.FCD  = this.prod ? () => {} : ( ... args ) => { console.debug   ( `%c${this.header}%s`, 'color: white; background-color: magenta;', '%c %s', '', ... args ); this.FM( 'white', 'magenta', args ) } // Function Console Debug
    this.FCE  = this.prod ? () => {} : ( ... args ) => { console.error   ( `%c${this.header}%s`, 'color: white; background-color: red    ;', '%c %s', '', ... args ); this.FM( 'white', 'red'    , args ) } // Function Console Error
    this.FCW  = this.prod ? () => {} : ( ... args ) => { console.warn    ( `%c${this.header}%s`, 'color: black; background-color: yellow ;', '%c %s', '', ... args ); this.FM( 'black', 'yellow' , args ) } // Function Console Warn
    this.FCG  = this.prod ? () => {} : ( ... args ) => { console.group   ( `%c${this.header}%s`, 'color: white; background-color: grey   ;', '%c %s', '', ... args ); this.FM( 'white', 'grey'   , args ) } // Function Console Group
    this.FCGE = this.prod ? () => {} : ( ... args ) => { console.groupEnd(                                                                            )                                                   } // Function Console Group End
    this.FCT  = this.prod ? () => {} : ( ... args ) => { console.trace   ( `%c${this.header}%s`, 'color: white; background-color: blue   ;', '%c %s', '', ... args ); this.FM( 'white', 'blue'   , args ) } // Function Console Trace
    this.FCI  = this.prod ? () => {} : ( ... args ) => { console.info    ( `%c${this.header}%s`, 'color: black; background-color: cyan   ;', '%c %s', '', ... args ); this.FM( 'black', 'cyan'   , args ) } // Function Console Info
    this.FCL  = this.prod ? () => {} : ( ... args ) => { console.log     ( `%c${this.header}%s`, 'color: white; background-color: green  ;', '%c %s', '', ... args ); this.FM( 'white', 'green'  , args ) } // Function Console Log
    this.FCLR = this.prod ? () => {} : ( object   ) => {                                                                                                                                                    // Function Console Log Recursive
      function replacer( K, V ) { if( typeof V === 'object'
                                  &&         V !==  null    ) { if( cache.indexOf( V ) !== -1 ) return
                                                                    cache.push   ( V )        } return V }
      let                                              cache = []
      let result = JSON.stringify( object, replacer ); cache = null
      console.log( `%c${this.header}%s`, 'color: white; background-color: black;', '%c %s', '', result        )
      this   .FM (                              'white',                 'black' ,              result, false )
    } // function

    // 참고 // 출력 내용에서 ( '%c문자열%s', '스타일', ... ) 구조 반복이 끊어지면, 더 이상 스타일을 적용할 수 없으므로, 유저가 스타일을 적용할 수 있도록 '%c %s', '' 으로 종료한다. 구문 '%c %s', '' 은 스타일이 없는 공백을 의미한다.

    function T_name( worker, prefix, name ) { return worker ?     `self.${prefix}${name}`
                                                            : `window[ '${prefix}${name}' ]` }

    if( this.global ) eval(
      `${ T_name( this.worker, this.prefix, 'CD'   ) } = this.CD  ;` +
      `${ T_name( this.worker, this.prefix, 'FCD'  ) } = this.FCD ;` +
      `${ T_name( this.worker, this.prefix, 'FCE'  ) } = this.FCE ;` +
      `${ T_name( this.worker, this.prefix, 'FCW'  ) } = this.FCW ;` +
      `${ T_name( this.worker, this.prefix, 'FCG'  ) } = this.FCG ;` +
      `${ T_name( this.worker, this.prefix, 'FCGE' ) } = this.FCGE;` +
      `${ T_name( this.worker, this.prefix, 'FCT'  ) } = this.FCT ;` +
      `${ T_name( this.worker, this.prefix, 'FCI'  ) } = this.FCI ;` +
      `${ T_name( this.worker, this.prefix, 'FCL'  ) } = this.FCL ;` +
      `${ T_name( this.worker, this.prefix, 'FCLR' ) } = this.FCLR;`
    ) // if

  } // constructor

} // class
