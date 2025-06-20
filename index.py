def app(environ, start_response):
    import os
    from urllib.parse import unquote
    
    import http.cookies

    path = unquote(environ.get('PATH_INFO', '/'))
    root = os.path.dirname(os.path.abspath(__file__))

    # Solo permitir ejecución desde /ATI/index.py
    if not path.startswith('/ATI/'):
        start_response('403 Forbidden', [('Content-Type', 'text/plain')])
        return [b'403 Forbidden: Solo se permite acceso desde /ATI/']

    # Crear la cookie
    cookie = http.cookies.SimpleCookie()
    cookie['usuario'] = 'visitante'
    # Puedes personalizar el valor y atributos de la cookie aquí
    # cookie['usuario']['max-age'] = 3600  # 1 hora
    if path == '/ATI/' or path == '/ATI/index.py'or path == '':
        file_path = os.path.join(root, 'index.html')
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                html = f.read()
            # No modificar las rutas, dejar ./css/style.css y ./js/index.js tal como están en el HTML
            start_response('200 OK', [
                ('Content-Type', 'text/html; charset=utf-8'),
                ('Set-Cookie', cookie.output(header='', sep=''))
            ])
            return [html.encode('utf-8')]
        else:
            start_response('404 Not Found', [('Content-Type', 'text/plain')])
            return [b'404 Not Found']

    # Servir archivos estáticos bajo /ATI/
    static_path = path[len('/ATI/'):]
    file_path = os.path.join(root, static_path)
    # Determinar el content_type
    if static_path.endswith('.css'):
        content_type = 'text/css; charset=utf-8'
    elif static_path.endswith('.js'):
        content_type = 'application/javascript; charset=utf-8'
    elif static_path.endswith('.json'):
        content_type = 'application/json; charset=utf-8'
    elif static_path.endswith('.jpg'):
        content_type = 'image/jpeg'
    elif static_path.endswith('.png'):
        content_type = 'image/png'
    elif static_path.endswith('.html'):
        content_type = 'text/html; charset=utf-8'
    else:
        content_type = 'application/octet-stream'

    if os.path.exists(file_path):
        with open(file_path, 'rb') as f:
            content = f.read()
        start_response('200 OK', [('Content-Type', content_type)])
        return [content]
    else:
        start_response('404 Not Found', [('Content-Type', 'text/plain')])
        return [b'404 Not Found']

if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    print('Serving on http://localhost:8000')
    make_server('', 8000, app).serve_forever()
