/* ==========================================================================
   Kripik Balado Salsabila — Sistem dwibahasa (Indonesia / English)
   - Terjemahan berbasis atribut data-i18n (teks) & data-i18n-attr (atribut).
   - Menyimpan pilihan bahasa di localStorage agar konsisten setelah refresh.
   - Tidak mengubah desain, layout, warna, font, animasi, atau fungsi yang ada.
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'kbs-lang';
  const DEFAULT_LANG = 'id';
  const SUPPORTED = ['id', 'en'];

  /* Kamus terjemahan --------------------------------------------------------
     Kunci "id" berisi teks asli (bahasa Indonesia) supaya mudah dicocokkan,
     "en" berisi padanan bahasa Inggris. */
  const translations = {
    // Announcement bar
    'ann.full': {
      id: 'Oleh-oleh khas Padang dengan rasa yang selalu dirindukan <span>&bull;</span> Pesan mudah melalui WhatsApp',
      en: 'Signature Padang treats with a flavor you keep craving <span>&bull;</span> Order easily via WhatsApp'
    },
    'ann.short': {
      id: 'Oleh-oleh khas Padang dengan rasa yang selalu dirindukan',
      en: 'Signature Padang treats with a flavor you keep craving'
    },

    // Navigasi
    'nav.home': { id: 'Beranda', en: 'Home' },
    'nav.about': { id: 'Tentang Kami', en: 'About Us' },
    'nav.products': { id: 'Produk', en: 'Products' },
    'nav.gallery': { id: 'Galeri', en: 'Gallery' },
    'nav.contact': { id: 'Kontak', en: 'Contact' },
    'nav.order': { id: 'Pesan Sekarang <span>&#8599;</span>', en: 'Order Now <span>&#8599;</span>' },
    'nav.toggleLabel': { id: 'Buka menu', en: 'Open menu' },

    // Footer
    'footer.tagline': {
      id: 'Cita rasa khas Padang, dikemas untuk menemani setiap cerita.',
      en: 'Signature Padang flavor, packed to accompany every story.'
    },
    'footer.navHeading': { id: 'Navigasi', en: 'Navigation' },
    'footer.contactHeading': { id: 'Hubungi', en: 'Contact' },
    'footer.location': { id: 'Padang, Sumatera Barat<br>Indonesia', en: 'Padang, West Sumatra<br>Indonesia' },
    'footer.copyFull': { id: 'Kripik Balado Salsabila. Semua hak dilindungi.', en: 'Kripik Balado Salsabila. All rights reserved.' },
    'footer.copyShort': { id: 'Kripik Balado Salsabila.', en: 'Kripik Balado Salsabila.' },
    'footer.madeWith': { id: 'Dibuat dengan rasa dan cerita.', en: 'Made with flavor and stories.' },
    'floating.chat': { id: 'Chat dengan kami', en: 'Chat with us' },
    'floating.waLabel': { id: 'Chat WhatsApp', en: 'WhatsApp chat' },

    /* ---- Beranda (index.html) ---- */
    'home.hero.eyebrow': { id: 'Rasa khas ranah Minang', en: 'Signature flavor of the Minang land' },
    'home.hero.title': { id: 'Pedasnya<br><em>bikin nagih.</em>', en: 'A spice that<br><em>keeps you hooked.</em>' },
    'home.hero.desc': {
      id: 'Kripik Balado Salsabila menghadirkan kerenyahan dan cita rasa balado khas Padang. Teman perjalanan, teman berkumpul, dan oleh-oleh yang berkesan.',
      en: 'Kripik Balado Salsabila brings the crunch and signature Padang balado flavor. A travel companion, a companion for gatherings, and a memorable treat.'
    },
    'home.hero.explore': { id: 'Jelajahi Produk <span>&#8599;</span>', en: 'Explore Products <span>&#8599;</span>' },
    'home.hero.story': { id: 'Cerita Kripik Balado Salsabila <span>&#8594;</span>', en: 'The Kripik Balado Salsabila story <span>&#8594;</span>' },
    'home.hero.since': { id: 'Didirikan sejak 2015', en: 'Established since 2015' },
    'home.hero.sinceSub': { id: 'Hadirkan rasa untuk setiap momen', en: 'Bringing flavor to every moment' },
    'home.hero.labelName': { id: 'Original<br>Balado', en: 'Original<br>Balado' },
    'home.hero.stickerA': { id: 'Renyah', en: 'Crunchy' },
    'home.hero.stickerB': { id: 'Berani', en: 'Bold' },
    'home.hero.cardTitle': { id: '100% Cita rasa', en: '100% Flavor' },
    'home.hero.cardSub': { id: 'Khas Padang', en: 'Padang style' },
    'home.hero.scroll': { id: 'SCROLL UNTUK MENJELAJAHI', en: 'SCROLL TO EXPLORE' },

    'home.marquee.a': { id: 'KRIPIK BALADO', en: 'KRIPIK BALADO' },
    'home.marquee.b': { id: 'RASA KHAS PADANG', en: 'SIGNATURE PADANG FLAVOR' },
    'home.marquee.c': { id: 'BAHAN PILIHAN', en: 'SELECTED INGREDIENTS' },

    'home.intro.eyebrow': { id: 'Kenapa Salsabila?', en: 'Why Salsabila?' },
    'home.intro.title': { id: 'Lebih dari sekadar<br><em>camilan.</em>', en: 'More than just a<br><em>snack.</em>' },
    'home.intro.copy': {
      id: 'Setiap potongan Kripik Balado Salsabila membawa semangat untuk menghadirkan rasa yang autentik, kualitas yang terjaga, dan pengalaman ngemil yang sulit dilupakan.',
      en: 'Every piece of Kripik Balado Salsabila carries a spirit to deliver authentic flavor, maintained quality, and a snacking experience that is hard to forget.'
    },
    'home.intro.link': { id: 'Kenali lebih dekat <span>&#8594;</span>', en: 'Get to know us <span>&#8594;</span>' },

    'home.feature1.title': { id: 'Rasa Autentik', en: 'Authentic Flavor' },
    'home.feature1.desc': { id: 'Balado dengan karakter rasa khas Padang yang gurih, pedas, dan kaya rempah.', en: 'Balado with a signature Padang character that is savory, spicy, and rich in spices.' },
    'home.feature2.title': { id: 'Renyah Berkualitas', en: 'Quality Crunch' },
    'home.feature2.desc': { id: 'Diproses dengan perhatian pada kualitas untuk menjaga kerenyahan di setiap gigitan.', en: 'Processed with attention to quality to keep the crunch in every bite.' },
    'home.feature3.title': { id: 'Cocok untuk Semua', en: 'Perfect for Everyone' },
    'home.feature3.desc': { id: 'Teman santai, buah tangan, dan pelengkap momen bersama keluarga.', en: 'A relaxing companion, a gift, and a complement to family moments.' },

    'home.products.eyebrow': { id: 'Pilihan favorit', en: 'Favorite picks' },
    'home.products.title': { id: 'Produk Unggulan<br><em>Kami.</em>', en: 'Our Featured<br><em>Products.</em>' },
    'home.products.all': { id: 'Lihat semua produk <span>&#8599;</span>', en: 'View all products <span>&#8599;</span>' },

    'home.story.caption': { id: 'Dari rempah, menjadi cerita.', en: 'From spices into a story.' },
    'home.story.eyebrow': { id: 'Cerita Salsabila', en: 'The Salsabila story' },
    'home.story.title': { id: 'Rasa yang lahir<br>dari <em>ketulusan.</em>', en: 'A flavor born<br>from <em>sincerity.</em>' },
    'home.story.copy': {
      id: 'Berawal dari kecintaan pada cita rasa khas Padang, Kripik Balado Salsabila tumbuh dengan satu tujuan: membuat camilan yang mampu membawa kehangatan rumah dan kekayaan rasa Nusantara ke lebih banyak orang.',
      en: 'Starting from a love of the signature Padang flavor, Kripik Balado Salsabila grew with one goal: to make snacks that bring the warmth of home and the richness of the archipelago to more people.'
    },
    'home.story.btn': { id: 'Baca cerita kami <span>&#8599;</span>', en: 'Read our story <span>&#8599;</span>' },
    'home.story.signature': { id: 'Kripik Balado Salsabila <small>Est. 2015</small>', en: 'Kripik Balado Salsabila <small>Est. 2015</small>' },

    'home.gallery.eyebrow': { id: 'Dari dekat', en: 'Up close' },
    'home.gallery.title': { id: 'Rasa dalam<br><em>setiap momen.</em>', en: 'Flavor in<br><em>every moment.</em>' },
    'home.gallery.link': { id: 'Lihat galeri <span>&#8599;</span>', en: 'View gallery <span>&#8599;</span>' },
    'home.gallery.item1': { id: '01 / Produk', en: '01 / Product' },
    'home.gallery.item2': { id: '02 / Bahan pilihan', en: '02 / Selected ingredients' },
    'home.gallery.item3': { id: '03 / Oleh-oleh', en: '03 / Souvenir' },

    'home.cta.eyebrow': { id: 'Siap mencicipi?', en: 'Ready to taste?' },
    'home.cta.title': { id: 'Biarkan rasa<br><em>bercerita.</em>', en: 'Let the flavor<br><em>tell the story.</em>' },
    'home.cta.copy': { id: 'Temukan camilan favoritmu dan bawa pulang cita rasa khas Padang.', en: 'Find your favorite snack and take home the signature Padang flavor.' },
    'home.cta.btn': { id: 'Pesan melalui WhatsApp <span>&#8599;</span>', en: 'Order via WhatsApp <span>&#8599;</span>' },

    /* ---- Tentang (tentang.html) ---- */
    'about.hero.eyebrow': { id: 'Cerita di balik rasa', en: 'The story behind the flavor' },
    'about.hero.title': { id: 'Tumbuh dari<br><em>rasa dan ketulusan.</em>', en: 'Growing from<br><em>flavor and sincerity.</em>' },
    'about.hero.desc': {
      id: 'Perjalanan Salsabila dimulai dari kecintaan pada camilan khas Padang dan keinginan untuk membagikan rasa yang dekat dengan rumah.',
      en: 'The Salsabila journey began from a love of signature Padang snacks and a desire to share a flavor that feels close to home.'
    },
    'about.year': { id: 'Awal perjalanan', en: 'The journey begins' },
    'about.eyebrow': { id: 'Tentang Salsabila', en: 'About Salsabila' },
    'about.title': { id: 'Rasa khas yang<br><em>punya cerita.</em>', en: 'A signature flavor<br><em>with a story.</em>' },
    'about.p1': {
      id: 'Kripik Balado Salsabila hadir untuk membawa cita rasa khas Padang ke dalam camilan yang praktis dan menyenangkan. Kami percaya bahwa makanan bukan hanya tentang rasa, tetapi juga tentang kenangan, kebersamaan, dan cerita yang dibawa pulang.',
      en: 'Kripik Balado Salsabila exists to bring the signature Padang flavor into snacks that are practical and delightful. We believe food is not only about taste, but also about memories, togetherness, and the stories carried home.'
    },
    'about.p2': {
      id: 'Dengan perhatian pada bahan baku, proses produksi, dan hubungan baik dengan pelanggan, kami terus berusaha menjaga kualitas di setiap kemasan.',
      en: 'With attention to raw materials, the production process, and good relationships with customers, we keep striving to maintain quality in every package.'
    },
    'about.signatureSub': { id: 'Kripik Balado &bull; Padang', en: 'Kripik Balado &bull; Padang' },
    'about.values.eyebrow': { id: 'Nilai yang kami jaga', en: 'Values we uphold' },
    'about.values.title': { id: 'Dibuat dengan<br><em>sepenuh rasa.</em>', en: 'Made with<br><em>wholehearted flavor.</em>' },
    'about.value1.title': { id: 'Kualitas', en: 'Quality' },
    'about.value1.desc': { id: 'Memperhatikan bahan dan proses agar rasa tetap konsisten.', en: 'Attending to ingredients and process so the flavor stays consistent.' },
    'about.value2.title': { id: 'Keaslian', en: 'Authenticity' },
    'about.value2.desc': { id: 'Menjaga karakter balado khas Padang yang kaya dan berani.', en: 'Preserving the rich and bold character of signature Padang balado.' },
    'about.value3.title': { id: 'Kepercayaan', en: 'Trust' },
    'about.value3.desc': { id: 'Membangun hubungan baik melalui pelayanan yang jujur.', en: 'Building good relationships through honest service.' },

    /* ---- Produk (produk.html) ---- */
    'products.hero.eyebrow': { id: 'Katalog Salsabila', en: 'Salsabila catalog' },
    'products.hero.title': { id: 'Pilih rasa<br><em>favoritmu.</em>', en: 'Pick your<br><em>favorite flavor.</em>' },
    'products.hero.desc': {
      id: 'Temukan pilihan camilan khas Padang untuk menemani hari atau menjadi buah tangan istimewa.',
      en: 'Discover a selection of signature Padang snacks to accompany your day or become a special gift.'
    },
    'products.filter.all': { id: 'Semua', en: 'All' },
    'products.filter.balado': { id: 'Balado', en: 'Balado' },
    'products.filter.oleholeh': { id: 'Oleh-oleh', en: 'Souvenir' },
    'products.filter.paket': { id: 'Paket', en: 'Bundle' },
    'products.countUnit': { id: 'produk', en: 'products' },

    /* ---- Galeri (galeri.html) ---- */
    'gallery.hero.eyebrow': { id: 'Galeri Salsabila', en: 'Salsabila gallery' },
    'gallery.hero.title': { id: 'Rasa yang<br><em>terlihat nyata.</em>', en: 'A flavor that<br><em>looks real.</em>' },
    'gallery.hero.desc': {
      id: 'Menampilkan berbagai produk, proses produksi, dan momen-momen berharga dalam perjalanan Kripik Balado Salsabila, mulai dari pemilihan bahan baku hingga menjadi camilan khas yang siap menemani setiap momen dan menjadi pilihan oleh-oleh.',
      en: 'Showcasing various products, the production process, and precious moments in the Kripik Balado Salsabila journey, from selecting raw materials to becoming a signature snack ready to accompany every moment and be a souvenir of choice.'
    },
    'gallery.cap1': { id: '01 / Produk pilihan', en: '01 / Selected products' },
    'gallery.cap2': { id: '02 / Bahan baku pilihan', en: '02 / Selected raw materials' },
    'gallery.cap3': { id: '03 / Pengemasan produk', en: '03 / Product packaging' },
    'gallery.cap4': { id: '04 / Kunjungan', en: '04 / Visit' },
    'gallery.cap5': { id: '05 / Di balik proses', en: '05 / Behind the process' },

    /* ---- Kontak (kontak.html) ---- */
    'contact.hero.eyebrow': { id: 'Mari terhubung', en: "Let's connect" },
    'contact.hero.title': { id: 'Pesan rasa<br><em>favoritmu.</em>', en: 'Order your<br><em>favorite flavor.</em>' },
    'contact.hero.desc': {
      id: 'Punya pertanyaan, ingin memesan, atau ingin bekerja sama? Kami siap menyambut pesanmu.',
      en: 'Have a question, want to order, or want to collaborate? We are ready to welcome your message.'
    },
    'contact.info.eyebrow': { id: 'Hubungi kami', en: 'Contact us' },
    'contact.info.title': { id: 'Temukan cara<br><em>terbaik untukmu.</em>', en: 'Find the best<br><em>way for you.</em>' },
    'contact.info.desc': {
      id: 'Silakan hubungi kami melalui kanal berikut untuk informasi produk, pemesanan, dan kerja sama.',
      en: 'Please reach us through the following channels for product info, orders, and collaboration.'
    },
    'contact.form.title': { id: 'Kirim pesan', en: 'Send a message' },
    'contact.form.nameLabel': { id: 'Nama lengkap', en: 'Full name' },
    'contact.form.namePlaceholder': { id: 'Masukkan nama kamu', en: 'Enter your name' },
    'contact.form.emailLabel': { id: 'Email', en: 'Email' },
    'contact.form.emailPlaceholder': { id: 'nama@email.com', en: 'name@email.com' },
    'contact.form.messageLabel': { id: 'Pesan', en: 'Message' },
    'contact.form.messagePlaceholder': { id: 'Tulis pesanmu di sini...', en: 'Write your message here...' },
    'contact.form.submit': { id: 'Kirim ke WhatsApp <span>&#8599;</span>', en: 'Send to WhatsApp <span>&#8599;</span>' },
    'contact.form.note': { id: 'Form ini akan membuka WhatsApp dengan pesan yang sudah disiapkan.', en: 'This form will open WhatsApp with a prepared message.' },
    'contact.map.eyebrow': { id: 'Lokasi', en: 'Location' },
    'contact.map.desc': {
      id: 'Padang, Sumatera Barat, Indonesia. Temukan lokasi kami langsung melalui Google Maps.',
      en: 'Padang, West Sumatra, Indonesia. Find our location directly through Google Maps.'
    },
    'contact.map.btn': { id: 'Buka di Google Maps <span>&#8599;</span>', en: 'Open in Google Maps <span>&#8599;</span>' },
    'contact.close': { id: 'Tutup', en: 'Close' },

    /* ---- Produk dinamis (dipakai produk.js) ---- */
    'product.metaBrand': { id: 'Khas Salsabila', en: 'Salsabila style' },
    'product.quickView': { id: 'Lihat detail', en: 'View details' },
    'product.orderBtn': { id: 'Pesan Produk <span>&#8599;</span>', en: 'Order Product <span>&#8599;</span>' },

    'product.1.name': { id: 'Kripik Balado Original', en: 'Original Balado Chips' },
    'product.1.desc': { id: 'Rasa balado klasik dengan perpaduan pedas, gurih, dan rempah yang seimbang.', en: 'Classic balado flavor with a balanced mix of spicy, savory, and spices.' },
    'product.1.badge': { id: 'Best Seller', en: 'Best Seller' },
    'product.2.name': { id: 'Kripik Balado Salsabila', en: 'Salsabila Balado Chips' },
    'product.2.desc': { id: 'Kripik balado andalan Salsabila, renyah dengan bumbu yang meresap.', en: 'Salsabila signature balado chips, crunchy with seasoning that soaks in.' },
    'product.2.badge': { id: 'Favorit', en: 'Favorite' },
    'product.3.name': { id: 'Pisang Balado', en: 'Balado Banana Chips' },
    'product.3.desc': { id: 'Keripik pisang berbalut balado manis pedas yang bikin nagih.', en: 'Banana chips coated in sweet-spicy balado that keeps you hooked.' },
    'product.3.badge': { id: 'Manis Pedas', en: 'Sweet & Spicy' },
    'product.4.name': { id: 'Keripik Bawang', en: 'Onion Chips' },
    'product.4.desc': { id: 'Keripik gurih dengan aroma bawang yang khas, cocok untuk teman santai.', en: 'Savory chips with a distinctive onion aroma, perfect for a relaxing companion.' },
    'product.4.badge': { id: 'Gurih', en: 'Savory' },
    'product.5.name': { id: 'Keripik Keju', en: 'Cheese Chips' },
    'product.5.desc': { id: 'Perpaduan renyah dan gurihnya keju yang disukai semua kalangan.', en: 'A blend of crunch and cheesy savoriness loved by everyone.' },
    'product.5.badge': { id: 'Favorit Keju', en: 'Cheese Favorite' },
    'product.6.name': { id: 'Karak Kaliang', en: 'Karak Kaliang' },
    'product.6.desc': { id: 'Camilan khas Minang berbentuk angka delapan, renyah dan gurih.', en: 'A signature Minang snack shaped like the number eight, crunchy and savory.' },
    'product.6.badge': { id: 'Khas Minang', en: 'Minang Special' },
    'product.7.name': { id: 'Kripik Tawar Asin', en: 'Salted Plain Chips' },
    'product.7.desc': { id: 'Pilihan rasa asin gurih untuk yang menyukai camilan tanpa pedas.', en: 'A savory salted option for those who prefer snacks without spice.' },
    'product.7.badge': { id: 'Rasa Asin', en: 'Salted' },
    'product.8.name': { id: 'Paket Oleh-oleh Salsabila', en: 'Salsabila Souvenir Bundle' },
    'product.8.desc': { id: 'Paket praktis berisi tiga varian favorit, pas untuk buah tangan.', en: 'A practical bundle of three favorite variants, perfect as a gift.' },
    'product.8.badge': { id: 'Paket', en: 'Bundle' },

    // Label tombol pengalih bahasa
    'lang.switchTo': { id: 'Ganti bahasa', en: 'Change language' }
  };

  /* API global ------------------------------------------------------------- */
  const KBS = {
    current: DEFAULT_LANG,
    supported: SUPPORTED,
    t(key) {
      const entry = translations[key];
      if (!entry) return '';
      return entry[this.current] != null ? entry[this.current] : entry[DEFAULT_LANG];
    }
  };
  window.KBSi18n = KBS;

  function getStoredLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) { /* localStorage tidak tersedia */ }
    return DEFAULT_LANG;
  }

  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* abaikan */ }
  }

  /* Terapkan terjemahan ke seluruh elemen ber-atribut data-i18n ------------ */
  function applyTranslations(root) {
    const scope = root || document;

    // Teks (mengizinkan markup ringan seperti <br>, <em>, <span>, <small>).
    scope.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = KBS.t(key);
      if (value !== '') el.innerHTML = value;
    });

    // Atribut: format "attr:key" dipisah koma, mis. "placeholder:contact.form.namePlaceholder".
    scope.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const pairs = el.getAttribute('data-i18n-attr').split(',');
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (!attr || !key) return;
        const value = KBS.t(key);
        if (value !== '') el.setAttribute(attr, value);
      });
    });
  }

  /* Bangun tombol pengalih bahasa yang menyatu dengan gaya navigasi -------- */
  function buildToggle() {
    const nav = document.getElementById('mainNav');
    if (!nav || document.querySelector('.lang-switch')) return;

    const wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', KBS.t('lang.switchTo'));

    SUPPORTED.forEach((lang) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-option';
      btn.dataset.lang = lang;
      btn.textContent = lang.toUpperCase();
      btn.addEventListener('click', () => setLanguage(lang));
      wrap.appendChild(btn);
    });

    nav.appendChild(wrap);
    updateToggleState();
  }

  function updateToggleState() {
    document.querySelectorAll('.lang-option').forEach((btn) => {
      const isActive = btn.dataset.lang === KBS.current;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    KBS.current = lang;
    storeLang(lang);
    document.documentElement.setAttribute('lang', lang);
    applyTranslations();
    updateToggleState();
    // Beritahu skrip lain (mis. render produk) agar ikut memperbarui teks.
    document.dispatchEvent(new CustomEvent('kbs:languagechange', { detail: { lang } }));
  }
  window.KBSi18n.setLanguage = setLanguage;
  window.KBSi18n.apply = applyTranslations;

  /* Inisialisasi ----------------------------------------------------------- */
  function init() {
    KBS.current = getStoredLang();
    document.documentElement.setAttribute('lang', KBS.current);
    buildToggle();
    applyTranslations();
    updateToggleState();
    document.dispatchEvent(new CustomEvent('kbs:languagechange', { detail: { lang: KBS.current } }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
