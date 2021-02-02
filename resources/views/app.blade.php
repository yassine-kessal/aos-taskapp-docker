<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AOS - TO-DO List</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link href="{{ asset('medias/images/aos-favicon.png') }}" rel="shortcut icon" type="image/x-icon"/>
    <link href="{{ asset('medias/images/aos-favicon.png') }}" rel="apple-touch-icon"/>
</head>
<body>

    <div id="aos-task"></div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>