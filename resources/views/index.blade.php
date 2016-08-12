<!doctype html>
<html ng-app="MoviewApp">
<head>
    <!-- google client ID -->
    <meta name="google-signin-client_id" content="16234131622-pmjdusc75n1s8b885banj766qarbu4v4.apps.googleusercontent.com">
    <!--  -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <!-- <link href="/images/favicon.png" rel="shortcut icon"> -->
    <link rel="stylesheet" href="{!! asset('styles/vendor.css') !!}">
    <link rel="stylesheet" href="{!! asset('styles/app.css') !!}">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
    <title>moView</title>
    <meta name="csrf-token" content='<?php echo csrf_token(); ?>'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--[if lte IE 10]>
    <script type="text/javascript">document.location.href = '/unsupported-browser'</script>
    <![endif]-->
</head>
<body>
<!-- will delete this -->
  <div id="fb-root"></div> 
  <!--  -->
  <div class="wrapper" ui-view="main" ng-show="$pageFinishedLoading">
      <!-- <div class="loading"></div> -->
  </div>
  <div id="preloader" ng-show="!$pageFinishedLoading">
    <div></div>
  </div>
<script src="{!! asset('scripts/vendor.js') !!}"></script>
<script src="{!! asset('scripts/app.js') !!}"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<!-- google api -->
<script src="https://apis.google.com/js/platform.js" async defer></script>

{{--livereload--}}
@if ( Config::get('app.debug') )
    <script type="text/javascript">
        document.write('<script src="//localhost:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
    </script>
@endif

</body>
</html>
