#  k6_console
Mainly, to save time for typing `console....` things on traditional debugging works.
Secondly, to show the `console....` things at a corner on a mobile device screen.

## Install
```
<script src="https://cdn.jsdelivr.net/gh/KLA6/k6_console.js@v0.0.1@k6_console.min.js"></script>
<script> new k6_console( {
  prefix    : ''   , 
  header    : 'K6' ,  
  mobile    : 'bl' , // tl, tr, bl, br, false
  production: false, // If this is true, no console things appear.
} ) </script>
```

## Usage
```
// If your prefix is '', then...
FCD ( ... ) // console.debug   ( ... )
FCE ( ... ) // console.error   ( ... )
FCW ( ... ) // console.warn    ( ... )
FCG ( ... ) // console.group   ( ... )
FCGE( ... ) // console.groupEnd( ... )
FCT ( ... ) // console.trace   ( ... )
FCI ( ... ) // console.info    ( ... )
FCL ( ... ) // console.log     ( ... )
```

## Production Mode Preparation
You'd better hide the instalation part on the production, but it's optional.
The below is an example in PHP.
```
<? if( $DEBUG ) { ?>
  <script src="https://cdn.jsdelivr.net/gh/KLA6/k6_console.js@v0.0.1@k6_console.min.js"></script>
  <script> new k6_console() </script>
<? } else { ?>
  <script> const CD = null, FCD = FCE = FCW = FCG = FCGE = FCT = FCI = FCL = FCLR = () => {}; </script>
<? } ?>
```
