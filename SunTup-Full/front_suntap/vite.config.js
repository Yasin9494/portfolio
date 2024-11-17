import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-F9S7TV6FQX"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F9S7TV6FQX');
            </script>
          </head>`
        );
      },
    },
  ],
});
