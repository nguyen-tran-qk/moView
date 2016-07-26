<!doctype html>
<html ng-app="MoviewApp">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <!-- <link href="/images/favicon.png" rel="shortcut icon"> -->
    {{HTML::style('styles/vendor.css',array(),true)}}
    {{HTML::style('styles/app.css',array(),true)}}
    <!-- <link rel="stylesheet" href="{!! asset('styles/vendor.css') !!}"> -->
    <!-- <link rel="stylesheet" href="{!! asset('styles/app.css') !!}"> -->
    <title>moView</title>
    <meta name="csrf-token" content='<?php echo csrf_token(); ?>'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href = '/unsupported-browser'</script>
    <![endif]-->
</head>
<body>
  <div ui-view="main" >
      <!-- <div class="loading"></div> -->
  </div>
<!-- <script src="{!! asset('scripts/vendor.js') !!}"></script> -->
<!-- <script src="{!! asset('scripts/app.js') !!}"></script> -->
    {{HTML::script('scripts/vendor.js',array(),true)}}
    {{HTML::script('scripts/app.js',array(),true)}}

{{--livereload--}}
@if ( Config::get('app.debug') )
    <script type="text/javascript">
        document.write('<script src="//localhost:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
    </script>
@endif

</body>
</html>
