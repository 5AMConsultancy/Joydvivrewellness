#!/usr/bin/env python3
"""Local preview server for the Joy D'Vivre Wellness site.

Serves the site on http://localhost:8000 with caching disabled, so the
browser always shows the latest saved files on a normal reload.

Run from this folder:  python3 serve.py
"""
import http.server


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


if __name__ == '__main__':
    print('Preview running at http://localhost:8000  (Ctrl+C to stop)')
    http.server.ThreadingHTTPServer(('', 8000), NoCacheHandler).serve_forever()
