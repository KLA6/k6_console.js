#  k6_console
Mainly, to save time for typing `console....` things on traditional debugging works.
Secondly, to show the `console....` things at a corner on a mobile device screen.

## Install
```
<script src="https://cdn.jsdelivr.net/gh/KLA6/k6_console.js@v0.0.9/k6_console.min.js"></script>
<script> new k6_console( {
  production: false, // If this is true, no console message shows.
  global    : true , // If this is true, functions will be gloval, not in the class instance.
  worker    : false, // If this is true, 'windows' will be 'self'.
  mobile    : 'bl' , // tl, tr, bl, br, false
  header    : 'K6' ,
  prefix    : ''   ,
} ) </script>
```

## Usage
If your prefix is blank, the following are usage examples.
If your prefix is not blank, but e.g., `'pf_'`, then `FCD()` will be `pf_FCD()`.
```
CD          // = true
FCD ( ... ) // = console.debug   ( ... )
FCE ( ... ) // = console.error   ( ... )
FCW ( ... ) // = console.warn    ( ... )
FCG ( ... ) // = console.group   ( ... )
FCGE( ... ) // = console.groupEnd( ... )
FCT ( ... ) // = console.trace   ( ... )
FCI ( ... ) // = console.info    ( ... )
FCL ( ... ) // = console.log     ( ... )
FCLR( obj ) // = console.log     ( JSON.stringify( obj ) ) with recursive obj.
```

## Production Mode Preparation
You can set `production: true` to hide all `console....` things from this library.
However, it's recommended to hide the installation part at all in the production mode, because it will save tiny load time more.
The following is an example in PHP.
```
<? if( $DEBUG ) { ?>
  <script src="https://cdn.jsdelivr.net/gh/KLA6/k6_console.js@v0.0.9/k6_console.min.js"></script>
  <script> new k6_console() </script>
<? } else { ?>
  <script> const CD = null, FCD = FCE = FCW = FCG = FCGE = FCT = FCI = FCL = FCLR = () => {}; </script>
<? } ?>
```
