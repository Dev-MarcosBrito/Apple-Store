<h1>🍏 Apple Store — Landing Page Interativa</h1>

<p>
  Uma <strong>vitrine interativa</strong> que destaca produtos Apple com foco em
  <em>experiência</em>, <em>performance</em> e <em>acessibilidade</em>. O projeto foi
  reestruturado com a ajuda de um assistente (<strong>IA</strong>) para adotar boas práticas modernas de semântica, SEO, responsividade e UX.
</p>

<h2>🔗 Deploy e Preview</h2>
<p>
  Acesse a página publicada: 
  <a href="https://dev-marcosbrito.github.io/Apple-Store/" target="_blank" rel="noopener noreferrer">dev-marcosbrito.github.io/Apple-Store</a> 
  
  <img src="https://github.com/Dev-MarcosBrito/Apple-Store/blob/main/assets/img/preview-mockups.png?raw=true">
</p>

<h2>✨ Principais Recursos</h2>
<ul>
  <li>Carrossel com autoplay, controle por teclado, setas e dots.</li>
  <li>Transições suaves e efeitos de luz com opção de reduzir movimento (<code>prefers-reduced-motion</code>).</li>
  <li>Design responsivo para mobile, tablet e desktop.</li>
  <li>Tipografia com <strong>Roboto</strong> via Google Fonts.</li>
  <li>Setas personalizadas via SVG (chevrons) com efeito glassmorphism.</li>
  <li>Indicador numérico sincronizado e acessível.</li>
</ul>

<h2>🧭 Boas Práticas Adotadas</h2>
<ul>
  <li><strong>Semântica</strong>: uso de <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>, headings hierárquicos (<code>h1</code> / <code>h2</code>) e <em>skip link</em> para pular direto ao conteúdo.</li>
  <li><strong>SEO</strong>: <code>&lt;meta name="description"&gt;</code>, textos alternativos descritivos, navegação clara.</li>
  <li><strong>Acessibilidade</strong>: carrossel com <code>role="region"</code>, slides com <code>role="group"</code>, <code>aria-roledescription</code>, <code>aria-current</code>, <code>aria-hidden</code>, botões com <code>aria-label</code> e foco visível.</li>
  <li><strong>Responsividade</strong>: breakpoints dedicados (≤ 992px e ≤ 680px), layout fluido e ajustes de tipografia.</li>
  <li><strong>UX</strong>: autoplay com reinício do timer após interação do usuário; pausa automática ao interagir; navegação por teclado (setas, Home/End).</li>
  <li><strong>Organização</strong>: reestruturação de pastas (<code>assets/css</code>, <code>assets/js</code>, <code>assets/img</code>, <code>assets/svg</code>).</li>
</ul>

<h2>🧩 Tecnologias</h2>
<ul>
  <li><strong>HTML5</strong>: marcação semântica e atributos ARIA.</li>
  <li><strong>CSS3</strong>: responsividade, animações/transições, glassmorphism e foco visível.</li>
  <li><strong>JavaScript Vanilla</strong>: lógica do carrossel, autoplay com timer reiniciável, ARIA dinâmica.</li>
  <li><strong>Google Fonts</strong>: Roboto.</li>
  <li><strong>SVG</strong>: setas chevron personalizadas.</li>
</ul>

<h2>📁 Estrutura de Pastas</h2>
<pre>
assets/
  css/        styles.css
  js/         script.js
  img/        (imagens dos produtos)
  svg/        chevron-left.svg, chevron-right.svg
index.html
readme.md
</pre>

<h2>🤝 Agradecimentos</h2>
<p>
  Reestruturação de código, melhorias de acessibilidade, SEO e responsividade realizadas com a ajuda de um assistente <strong>IA</strong> (pair programming).
</p>

<h2>📚 Referência</h2>
<p>
  Este projeto foi <strong>baseado nos ensinamentos</strong> do vídeo:
  <a href="https://youtu.be/o_yiPCiwzUs?si=5hAv0MJd1AqGTziA" target="_blank" rel="noopener noreferrer">PROJETO CRIATIVO com HTML, CSS e JAVASCRIPT</a>.
  Adaptações foram feitas para aprimorar semântica, SEO, acessibilidade, responsividade e organização do código.
 </p>


<h2>🆕 Implementações adicionais</h2>
<ul>
  <li><strong>Tema claro/escuro</strong>: toggle com persistência em <code>localStorage</code>, ícones (sol/lua) e respeito ao <code>prefers-color-scheme</code>.</li>
  <li><strong>Suporte a múltiplos idiomas (i18n)</strong>: PT‑BR, EN e ES com <code>data-i18n</code>, atualização de <em>ARIA</em> dinâmica e persistência do idioma.</li>
  <li><strong>Bandeiras</strong>: uso de PNGs (Brasil, Estados Unidos, Espanha) no seletor de idioma.</li>
  <li><strong>Menu hambúrguer no mobile</strong>: navegação colapsável com <code>aria-expanded</code>, fechamento por <kbd>ESC</kbd> e clique; ações de tema/idioma dentro do menu em telas pequenas.</li>
  <li><strong>Lazy-load</strong>: imagens não-hero com <code>loading="lazy"</code> e <code>decoding="async"</code>; imagem principal com <code>fetchpriority="high"</code>.</li>
  <li><strong>Header responsivo</strong>: reorganização da ordem (hambúrguer à esquerda e logo à direita no mobile) mantendo o layout desktop inalterado.</li>
</ul>

<h3>Créditos de ícones</h3>
<p>
  Bandeiras (PNG) por Freepik — 
  <a href="https://www.flaticon.com/br/icones-gratis/brasil" target="_blank" rel="noopener noreferrer">Brasil</a> ·
  <a href="https://www.flaticon.com/br/icones-gratis/estados-unidos" target="_blank" rel="noopener noreferrer">Estados Unidos</a> ·
  <a href="https://www.flaticon.com/br/icones-gratis/espanha" target="_blank" rel="noopener noreferrer">Espanha</a>
.</p>


<h2>⚠️ Aviso</h2>
<p>
  Este site foi desenvolvido <strong>apenas para fins educacionais</strong>. Todas as informações, marcas e produtos apresentados são <strong>fictícios</strong>.
  Não há vínculo oficial com a Apple.
</p>
