def app(environ, start_response):
    import os
    from urllib.parse import unquote
    import re
    import http.cookies

    path = unquote(environ.get('PATH_INFO', '/'))
    root = os.path.dirname(os.path.abspath(__file__))

    # Crear la cookie
    cookie = http.cookies.SimpleCookie()
    cookie['usuario'] = 'visitante'
    # Puedes personalizar el valor y atributos de la cookie aquí
    # cookie['usuario']['max-age'] = 3600  # 1 hora
    if path == '/ATI/':
        # Redirigir a /ATI/index.py
        start_response('302 Found', [('Location', '/ATI/index.py')])
        return [b'Redirecting to /ATI/index.py']
    if path == '/ATI/index.py':
        file_path = os.path.join(root, 'index.html')
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                html = f.read()
            def absolutize(match):
                attr = match.group(1)
                url = match.group(2)
                if url.startswith('/') or url.startswith('http') or url.startswith('https'):
                    return f'{attr}="{url}"'
                if url.startswith('./'):
                    url = url[2:]
                return f'{attr}="/{url}"'
            html = re.sub(r'(href|src)="([^"]+)"', absolutize, html)
            # Enviar la cookie correctamente como encabezado HTTP
            start_response('200 OK', [
                ('Content-Type', 'text/html; charset=utf-8'),
                ('Set-Cookie', cookie.output(header='', sep=''))
            ])
            return [html.encode('utf-8')]
        else:
            start_response('404 Not Found', [('Content-Type', 'text/plain')])
            return [b'404 Not Found']
    
    elif path == '/ATI/perfil.html' or path == '/perfil.html':
        file_path = os.path.join(root, 'perfil.html')
        content_type = 'text/html; charset=utf-8'
    elif path.startswith('/css/'):
        file_path = os.path.join(root, path[1:])
        content_type = 'text/css; charset=utf-8'
    elif path.startswith('/js/'):
        file_path = os.path.join(root, path[1:])
        content_type = 'application/javascript; charset=utf-8'
    elif path.startswith('/conf/'):
        file_path = os.path.join(root, path[1:])
        content_type = 'application/json; charset=utf-8'
    elif path.startswith('/datos/'):
        file_path = os.path.join(root, path[1:])
        content_type = 'application/json; charset=utf-8'
    elif path.count('/') == 2 and path.endswith('/perfil.json'):
        file_path = os.path.join(root, path[1:])
        content_type = 'application/json; charset=utf-8'
    elif path.count('/') == 2 and (path.endswith('.jpg') or path.endswith('.png')):
        file_path = os.path.join(root, path[1:])
        if path.endswith('.jpg'):
            content_type = 'image/jpeg'
        else:
            content_type = 'image/png'
    else:
        start_response('404 Not Found', [('Content-Type', 'text/plain')])
        return [b'404 Not Found']

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
