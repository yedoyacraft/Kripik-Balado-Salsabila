/* ==========================================================================
   Kripik Balado Salsabila — Sistem dwibahasa (Indonesia / English)
   - Menerjemahkan elemen ber-atribut data-i18n / data-i18n-html / data-i18n-attr
   - Menyimpan pilihan bahasa di localStorage agar konsisten setelah refresh
   - Tidak mengubah desain, layout, warna, font, animasi, atau fungsi yang ada
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'kbs-lang';
  var DEFAULT_LANG = 'id';

  /* Kamus terjemahan ------------------------------------------------------- */
  var translations = {
    id: {
      /* Umum / navigasi */
      'nav.beranda': 'Beranda',
      'nav.tentang': 'Tentang Kami',
      'nav.produk': 'Produk',
      'nav.galeri': 'Galeri',
      'nav.kontak': 'Kontak',
      'nav.cta': 'Pesan Sekarang',
      'nav.toggle_aria': 'Buka menu',
      'lang.aria': 'Pilih bahasa',

      /* Announcement */
      'announce.home': 'Oleh-oleh khas Padang dengan rasa yang selalu dirindukan',
      'announce.wa': 'Pesan mudah melalui WhatsApp',
      'announce.default': 'Oleh-oleh khas Padang dengan rasa yang selalu dirindukan',

      /* Footer (bersama) */
      'footer.tagline': 'Cita rasa khas Padang, dikemas untuk menemani setiap cerita.',
      'footer.nav_title': 'Navigasi',
      'footer.contact_title': 'Hubungi',
      'footer.location': 'Padang, Sumatera Barat<br>Indonesia',
      'footer.rights': 'Semua hak dilindungi.',
      'footer.madewith': 'Dibuat dengan rasa dan cerita.',
      'floating.wa': 'Chat dengan kami',

      /* ---- index.html ---- */
      'index.title': 'Kripik Balado Salsabila | Cita Rasa Khas Padang',
      'home.hero.eyebrow': 'Rasa khas ranah Minang',
      'home.hero.title': 'Keaslian rasa<br><em>Kerenyahan sempurna.</em>',
      'home.hero.desc': 'Kripik Balado Salsabila menghadirkan oleh-oleh khas minang dengan cita rasa yang autentik, inovasi yang terus berkembang menjaga cita rasa dan membawa budaya minang ke pasar yang lebih luas.',
      'home.hero.explore': 'Jelajahi Produk',
      'home.hero.story_link': 'Cerita Kripik Balado Salsabila',
      'home.hero.founded': 'Didirikan sejak 2015',
      'home.hero.founded_sub': 'Hadirkan rasa untuk setiap momen',
      'home.hero.label_strong': 'Original<br>Balado',
      'home.hero.sticker1': 'Renyah',
      'home.hero.sticker2': 'Berkualitas',
      'home.hero.card_strong': '100% Cita rasa',
      'home.hero.card_sub': 'Khas minang',
      'home.hero.scroll': 'SCROLL UNTUK MENJELAJAHI',

      'home.intro.eyebrow': 'Kenapa Salsabila?',
      'home.intro.title': 'Lebih dari sekadar<br><em>camilan.</em>',
      'home.intro.copy': 'Berawal dari satu resep, tumbuh menjadi perjalanan untuk memperkenalkan kekayaan kuliner minang ke lebih banyak tempat.',
      'home.intro.link': 'Kenali lebih dekat',

      'home.feature1.title': 'Rasa Autentik',
      'home.feature1.desc': 'Balado dengan karakter rasa khas Minang yang gurih, pedas, dan kaya rempah.',
      'home.feature2.title': 'Renyah Berkualitas',
      'home.feature2.desc': 'Diproses dengan perhatian pada kualitas untuk menjaga kerenyahan di setiap gigitan.',
      'home.feature3.title': 'Bahan Baku Berkualitas',
      'home.feature3.desc': 'Kami menggunakan bahan baku yang fresh sehingga menciptakan produk yang Berkualitas.',
      'home.feature4.title': 'Harga Terjangkau',
      'home.feature4.desc': 'Menghadirkan produk dengan mutu yang konsisten pada harga yang kompetitif, agar dapat menjangkau pasar yang lebih luas.',

      'home.products.eyebrow': 'Pilihan favorit',
      'home.products.title': 'Produk Unggulan<br><em>Kami.</em>',
      'home.products.link': 'Lihat semua produk',

      'home.story.caption': 'Dari rempah, menjadi cerita.',
      'home.story.title': 'Visi dan <em>misi.</em>',
      'home.story.vision_label': 'Visi',
      'home.story.mission_label': 'Misi',
      'home.story.vision': 'Membawa cita rasa Nusantara agar tetap terjaga dan berkembang, serta memberikan manfaat dan inspirasi bagi masyarakat luas.',
      'home.story.mission1': '1. Menghadirkan produk olahan khas Indonesia dengan rasa dan kualitas yang baik',
      'home.story.mission2': '2. Melestarikan cita rasa tradisional melalui inovasi dan kemasan modern',
      'home.story.mission3': '3. Memberdayakan masyarakat melalui peluang kerja dan kolaborasi',
      'home.story.mission4': '4. Berkontribusi dalam memajukan produk lokal ke kancah nasional maupun internasional',
      'home.story.btn': 'Baca cerita kami',

      'home.gallery.eyebrow': 'Dari dekat',
      'home.gallery.title': 'Rasa dalam<br><em>setiap momen.</em>',
      'home.gallery.link': 'Lihat galeri',
      'home.gallery.cap1': '01 / Produk',
      'home.gallery.cap2': '02 / Bahan pilihan',
      'home.gallery.cap3': '03 / Oleh-oleh',

      'home.cta.eyebrow': 'Siap mencicipi?',
      'home.cta.title': 'Biarkan rasa<br><em>bercerita.</em>',
      'home.cta.desc': 'Temukan camilan favoritmu dan bawa pulang cita rasa khas Minang.',
      'home.cta.btn': 'Pesan melalui WhatsApp',

      /* ---- tentang.html ---- */
      'about.title': 'Tentang Kami | Kripik Balado Salsabila',
      'about.hero.eyebrow': 'Cerita di balik rasa',
      'about.hero.title': 'Tumbuh dari<br><em>rasa dan ketulusan.</em>',
      'about.hero.desc': 'Berawal dari sebuah usaha sederhana pada tahun 2015, Kripik Balado Salsabila hadir membawa cita rasa khas Minang yang kami percaya layak dikenal lebih luas. usaha ini berawal dari sebuah harapan sederhana: memperbaiki ekonomi keluarga. Dengan keterbatasan pendidikan dan pengalaman bisnis, mereka membangun usaha ini sedikit demi sedikit hingga berkembang menjadi toko oleh-oleh yang menghadirkan berbagai makanan khas Sumatera Barat. Hari ini, kami terus menjaga cita rasa tradisional sambil berinovasi dalam produk, kemasan, pemasaran, dan pengembangan pasar. Bagi kami, Salsabila bukan hanya sebuah nama usaha. Salsabila bermakna mata air surga—sebuah harapan agar usaha ini dapat terus mengalirkan manfaat bagi keluarga, karyawan, konsumen, dan masyarakat luas.',
      'about.year_strong': '2015',
      'about.year_span': 'Awal perjalanan',
      'about.main.eyebrow': 'Tentang Salsabila',
      'about.main.title': 'Rasa khas yang<br><em>punya cerita.</em>',
      'about.main.p1': 'Kripik Balado Salsabila hadir untuk membawa cita rasa khas Padang ke dalam camilan yang praktis dan menyenangkan. Kami percaya bahwa makanan bukan hanya tentang rasa, tetapi juga tentang kenangan, kebersamaan, dan cerita yang dibawa pulang.',
      'about.main.p2': 'Dengan perhatian pada bahan baku, proses produksi, dan hubungan baik dengan pelanggan, kami terus berusaha menjaga kualitas di setiap kemasan.',
      'about.sign_sub': 'Kripik Balado &bull; Padang',
      'about.values.eyebrow': 'Nilai yang kami jaga',
      'about.values.title': 'Dibuat dengan<br><em>sepenuh rasa.</em>',
      'about.value1.title': 'Kualitas',
      'about.value1.desc': 'Memperhatikan bahan dan proses agar rasa tetap konsisten.',
      'about.value2.title': 'Keaslian',
      'about.value2.desc': 'Menjaga karakter balado khas Padang yang kaya dan berani.',
      'about.value3.title': 'Kepercayaan',
      'about.value3.desc': 'Membangun hubungan baik melalui pelayanan yang jujur.',

      /* ---- produk.html ---- */
      'produk.title': 'Produk | Kripik Balado Salsabila',
      'produk.hero.eyebrow': 'Katalog Salsabila',
      'produk.hero.title': 'Pilih rasa<br><em>favoritmu.</em>',
      'produk.hero.desc': 'Temukan pilihan camilan khas Padang untuk menemani hari atau menjadi buah tangan istimewa.',
      'produk.filter.all': 'Semua',
      'produk.filter.balado': 'Balado',
      'produk.filter.oleholeh': 'Oleh-oleh',
      'produk.filter.paket': 'Paket',
      'produk.count_suffix': 'produk',
      'produk.card.origin': 'Khas Salsabila',
      'produk.modal.order': 'Pesan Produk',
      'produk.modal.close': 'Tutup',
      'produk.quickview_aria': 'Lihat detail',

      /* ---- galeri.html ---- */
      'galeri.title': 'Galeri | Kripik Balado Salsabila',
      'galeri.hero.eyebrow': 'Galeri Salsabila',
      'galeri.hero.title': 'Rasa yang<br><em>terlihat nyata.</em>',
      'galeri.hero.desc': 'Menampilkan berbagai produk, proses produksi, dan momen-momen berharga dalam perjalanan Kripik Balado Salsabila, mulai dari pemilihan bahan baku hingga menjadi camilan khas yang siap menemani setiap momen dan menjadi pilihan oleh-oleh.',
      'galeri.cap1': '01 / Produk pilihan',
      'galeri.cap2': '02 / Bahan baku pilihan',
      'galeri.cap3': '03 / Pengemasan produk',
      'galeri.cap4': '04 / Kunjungan',
      'galeri.cap5': '05 / Di balik proses',
      'galeri.cap6': '06 / Di balik proses',
      'galeri.cap7': '07 / Di balik proses',
      'galeri.cap8': '08 / Di balik proses',
      'galeri.cap9': '09 / Di balik proses',
      'galeri.cap10': '10 / Di balik proses',
      'galeri.cap11': '11 / Produk pilihan',
      'galeri.cap12': '12 / Di balik proses',
      'galeri.cap13': '13 / Pelanggan',
      'galeri.cap14': '14 / Pelanggan',
      'galeri.cap15': '15 / Kunjungan',
      'galeri.cap16': '16 / Kunjungan',
      'galeri.cap17': '17 / Kunjungan',

      /* ---- kontak.html ---- */
      'kontak.title': 'Kontak | Kripik Balado Salsabila',
      'kontak.hero.eyebrow': 'Mari terhubung',
      'kontak.hero.title': 'Pesan rasa<br><em>favoritmu.</em>',
      'kontak.hero.desc': 'Punya pertanyaan, ingin memesan, atau ingin bekerja sama? Kami siap menyambut pesanmu.',
      'kontak.info.eyebrow': 'Hubungi kami',
      'kontak.info.title': 'Temukan cara<br><em>terbaik untukmu.</em>',
      'kontak.info.desc': 'Silakan hubungi kami melalui kanal berikut untuk informasi produk, pemesanan, dan kerja sama.',
      'kontak.form.title': 'Kirim pesan',
      'kontak.form.name_label': 'Nama lengkap',
      'kontak.form.name_ph': 'Masukkan nama kamu',
      'kontak.form.email_label': 'Email',
      'kontak.form.email_ph': 'nama@email.com',
      'kontak.form.message_label': 'Pesan',
      'kontak.form.message_ph': 'Tulis pesanmu di sini...',
      'kontak.form.submit': 'Kirim ke WhatsApp',
      'kontak.form.note': 'Form ini akan membuka WhatsApp dengan pesan yang sudah disiapkan.',
      'kontak.map.eyebrow': 'Lokasi',
      'kontak.map.title': 'Kripik Balado Salsabila',
      'kontak.map.desc': 'Padang, Sumatera Barat, Indonesia. Temukan lokasi kami langsung melalui Google Maps.',
      'kontak.map.btn': 'Buka di Google Maps'
    },

    en: {
      /* General / navigation */
      'nav.beranda': 'Home',
      'nav.tentang': 'About Us',
      'nav.produk': 'Products',
      'nav.galeri': 'Gallery',
      'nav.kontak': 'Contact',
      'nav.cta': 'Order Now',
      'nav.toggle_aria': 'Open menu',
      'lang.aria': 'Choose language',

      /* Announcement */
      'announce.home': 'Padang specialty souvenirs with a taste you will always crave',
      'announce.wa': 'Order easily via WhatsApp',
      'announce.default': 'Padang specialty souvenirs with a taste you will always crave',

      /* Footer (shared) */
      'footer.tagline': 'Authentic Padang flavor, packaged to accompany every story.',
      'footer.nav_title': 'Navigation',
      'footer.contact_title': 'Contact',
      'footer.location': 'Padang, West Sumatra<br>Indonesia',
      'footer.rights': 'All rights reserved.',
      'footer.madewith': 'Made with flavor and story.',
      'floating.wa': 'Chat with us',

      /* ---- index.html ---- */
      'index.title': 'Kripik Balado Salsabila | Authentic Padang Flavor',
      'home.hero.eyebrow': 'Authentic Minang flavor',
      'home.hero.title': 'Authentic taste<br><em>Perfect crunch.</em>',
      'home.hero.desc': 'Kripik Balado Salsabila brings authentic Minang specialty souvenirs with genuine flavor, and continuous innovation that preserves the taste while introducing Minang culture to a wider market.',
      'home.hero.explore': 'Explore Products',
      'home.hero.story_link': 'The Kripik Balado Salsabila story',
      'home.hero.founded': 'Established since 2015',
      'home.hero.founded_sub': 'Bringing flavor to every moment',
      'home.hero.label_strong': 'Original<br>Balado',
      'home.hero.sticker1': 'Crunchy',
      'home.hero.sticker2': 'Quality',
      'home.hero.card_strong': '100% Flavor',
      'home.hero.card_sub': 'Minang specialty',
      'home.hero.scroll': 'SCROLL TO EXPLORE',

      'home.intro.eyebrow': 'Why Salsabila?',
      'home.intro.title': 'More than just<br><em>a snack.</em>',
      'home.intro.copy': 'Starting from a single recipe, it grew into a journey to introduce the richness of Minang cuisine to more places.',
      'home.intro.link': 'Get to know us',

      'home.feature1.title': 'Authentic Flavor',
      'home.feature1.desc': 'Balado with the distinctive Minang character that is savory, spicy, and rich in spices.',
      'home.feature2.title': 'Quality Crunch',
      'home.feature2.desc': 'Processed with attention to quality to keep every bite crunchy.',
      'home.feature3.title': 'Quality Ingredients',
      'home.feature3.desc': 'We use fresh ingredients to create products of high quality.',
      'home.feature4.title': 'Affordable Price',
      'home.feature4.desc': 'Delivering products of consistent quality at competitive prices, so they can reach a wider market.',

      'home.products.eyebrow': 'Favorite picks',
      'home.products.title': 'Our Featured<br><em>Products.</em>',
      'home.products.link': 'View all products',

      'home.story.caption': 'From spices, into a story.',
      'home.story.title': 'Vision and <em>mission.</em>',
      'home.story.vision_label': 'Vision',
      'home.story.mission_label': 'Mission',
      'home.story.vision': 'To keep the flavors of the archipelago preserved and thriving, while providing benefit and inspiration for the wider community.',
      'home.story.mission1': '1. Delivering Indonesian specialty products with great taste and quality',
      'home.story.mission2': '2. Preserving traditional flavors through innovation and modern packaging',
      'home.story.mission3': '3. Empowering the community through job opportunities and collaboration',
      'home.story.mission4': '4. Contributing to advancing local products on national and international stages',
      'home.story.btn': 'Read our story',

      'home.gallery.eyebrow': 'Up close',
      'home.gallery.title': 'Flavor in<br><em>every moment.</em>',
      'home.gallery.link': 'View gallery',
      'home.gallery.cap1': '01 / Products',
      'home.gallery.cap2': '02 / Selected ingredients',
      'home.gallery.cap3': '03 / Souvenirs',

      'home.cta.eyebrow': 'Ready to taste?',
      'home.cta.title': 'Let the flavor<br><em>tell the story.</em>',
      'home.cta.desc': 'Find your favorite snack and take home the authentic Minang flavor.',
      'home.cta.btn': 'Order via WhatsApp',

      /* ---- tentang.html ---- */
      'about.title': 'About Us | Kripik Balado Salsabila',
      'about.hero.eyebrow': 'The story behind the flavor',
      'about.hero.title': 'Grown from<br><em>flavor and sincerity.</em>',
      'about.hero.desc': 'Starting as a simple business in 2015, Kripik Balado Salsabila emerged to bring the distinctive Minang flavor that we believe deserves wider recognition. This business began with a simple hope: to improve the family economy. With limited education and business experience, they built it little by little until it grew into a souvenir shop offering a variety of West Sumatran specialties. Today, we continue to preserve traditional flavors while innovating in products, packaging, marketing, and market development. To us, Salsabila is not just a business name. Salsabila means a spring of paradise—a hope that this business may keep flowing benefits to family, employees, customers, and the wider community.',
      'about.year_strong': '2015',
      'about.year_span': 'The beginning',
      'about.main.eyebrow': 'About Salsabila',
      'about.main.title': 'A distinctive flavor<br><em>with a story.</em>',
      'about.main.p1': 'Kripik Balado Salsabila is here to bring the authentic Padang flavor into a snack that is practical and enjoyable. We believe food is not only about taste, but also about memories, togetherness, and the story brought home.',
      'about.main.p2': 'With attention to ingredients, the production process, and good relationships with customers, we keep striving to maintain quality in every package.',
      'about.sign_sub': 'Kripik Balado &bull; Padang',
      'about.values.eyebrow': 'Values we uphold',
      'about.values.title': 'Made with<br><em>full flavor.</em>',
      'about.value1.title': 'Quality',
      'about.value1.desc': 'Paying attention to ingredients and process so the flavor stays consistent.',
      'about.value2.title': 'Authenticity',
      'about.value2.desc': 'Preserving the rich and bold character of Padang balado.',
      'about.value3.title': 'Trust',
      'about.value3.desc': 'Building good relationships through honest service.',

      /* ---- produk.html ---- */
      'produk.title': 'Products | Kripik Balado Salsabila',
      'produk.hero.eyebrow': 'Salsabila Catalog',
      'produk.hero.title': 'Choose your<br><em>favorite flavor.</em>',
      'produk.hero.desc': 'Discover a selection of Padang specialty snacks to accompany your day or make a special gift.',
      'produk.filter.all': 'All',
      'produk.filter.balado': 'Balado',
      'produk.filter.oleholeh': 'Souvenirs',
      'produk.filter.paket': 'Bundles',
      'produk.count_suffix': 'products',
      'produk.card.origin': 'Salsabila specialty',
      'produk.modal.order': 'Order Product',
      'produk.modal.close': 'Close',
      'produk.quickview_aria': 'View details of',

      /* ---- galeri.html ---- */
      'galeri.title': 'Gallery | Kripik Balado Salsabila',
      'galeri.hero.eyebrow': 'Salsabila Gallery',
      'galeri.hero.title': 'Flavor that<br><em>looks real.</em>',
      'galeri.hero.desc': 'Showcasing various products, the production process, and precious moments in the journey of Kripik Balado Salsabila, from selecting ingredients to becoming a signature snack ready to accompany every moment and be the souvenir of choice.',
      'galeri.cap1': '01 / Selected products',
      'galeri.cap2': '02 / Selected ingredients',
      'galeri.cap3': '03 / Product packaging',
      'galeri.cap4': '04 / Visit',
      'galeri.cap5': '05 / Behind the process',
      'galeri.cap6': '06 / Behind the process',
      'galeri.cap7': '07 / Behind the process',
      'galeri.cap8': '08 / Behind the process',
      'galeri.cap9': '09 / Behind the process',
      'galeri.cap10': '10 / Behind the process',
      'galeri.cap11': '11 / Selected products',
      'galeri.cap12': '12 / Behind the process',
      'galeri.cap13': '13 / Customers',
      'galeri.cap14': '14 / Customers',
      'galeri.cap15': '15 / Visit',
      'galeri.cap16': '16 / Visit',
      'galeri.cap17': '17 / Visit',

      /* ---- kontak.html ---- */
      'kontak.title': 'Contact | Kripik Balado Salsabila',
      'kontak.hero.eyebrow': "Let's connect",
      'kontak.hero.title': 'Order your<br><em>favorite flavor.</em>',
      'kontak.hero.desc': 'Have questions, want to order, or want to collaborate? We are ready to welcome your message.',
      'kontak.info.eyebrow': 'Contact us',
      'kontak.info.title': 'Find the way<br><em>that works best for you.</em>',
      'kontak.info.desc': 'Please reach us through the channels below for product information, orders, and collaboration.',
      'kontak.form.title': 'Send a message',
      'kontak.form.name_label': 'Full name',
      'kontak.form.name_ph': 'Enter your name',
      'kontak.form.email_label': 'Email',
      'kontak.form.email_ph': 'name@email.com',
      'kontak.form.message_label': 'Message',
      'kontak.form.message_ph': 'Write your message here...',
      'kontak.form.submit': 'Send to WhatsApp',
      'kontak.form.note': 'This form will open WhatsApp with a prepared message.',
      'kontak.map.eyebrow': 'Location',
      'kontak.map.title': 'Kripik Balado Salsabila',
      'kontak.map.desc': 'Padang, West Sumatra, Indonesia. Find our location directly on Google Maps.',
      'kontak.map.btn': 'Open in Google Maps'
    }
  };

  /* Produk (dipakai oleh produk.js melalui window.KBS_I18N) ---------------- */
  var productText = {
    id: {
      1: { name: 'Kripik Balado Original', desc: 'Rasa balado klasik dengan perpaduan pedas, gurih, dan rempah yang seimbang.', badge: 'Best Seller' },
      2: { name: 'Kripik Balado Durian', desc: 'Kripik balado andalan Salsabila, renyah dengan bumbu yang meresap.', badge: 'Favorit' },
      3: { name: 'Pisang Balado', desc: 'Keripik pisang berbalut balado manis pedas yang bikin nagih.', badge: 'Manis Pedas' },
      4: { name: 'Keripik Bawang', desc: 'Keripik gurih dengan aroma bawang yang khas, cocok untuk teman santai.', badge: 'Gurih' },
      5: { name: 'Keripik Keju', desc: 'Perpaduan renyah dan gurihnya keju yang disukai semua kalangan.', badge: 'Favorit Keju' },
      6: { name: 'Karak Kaliang', desc: 'Camilan khas Minang berbentuk angka delapan, renyah dan gurih.', badge: 'Khas Minang' },
      7: { name: 'Kripik Tawar Asin', desc: 'Pilihan rasa asin gurih untuk yang menyukai camilan tanpa pedas.', badge: 'Rasa Asin' },
      8: { name: 'Emping Balado', desc: 'Rasa balado klasik dengan perpaduan pedas, gurih, dan rempah yang seimbang.', badge: 'kerupuk' }
    },
    en: {
      1: { name: 'Original Balado Chips', desc: 'Classic balado flavor with a balanced blend of spicy, savory, and rich spices.', badge: 'Best Seller' },
      2: { name: 'Durian Balado Chips', desc: "Salsabila's signature balado chips, crunchy with deeply infused seasoning.", badge: 'Favorite' },
      3: { name: 'Banana Balado', desc: 'Banana chips coated in sweet-spicy balado that keeps you coming back.', badge: 'Sweet & Spicy' },
      4: { name: 'Onion Chips', desc: 'Savory chips with a distinctive onion aroma, perfect for casual snacking.', badge: 'Savory' },
      5: { name: 'Cheese Chips', desc: 'A crunchy and savory cheese blend loved by everyone.', badge: 'Cheese Favorite' },
      6: { name: 'Karak Kaliang', desc: 'A Minang specialty snack shaped like the number eight, crunchy and savory.', badge: 'Minang Specialty' },
      7: { name: 'Plain Salted Chips', desc: 'A savory salted option for those who prefer snacks without the spice.', badge: 'Salted Flavor' },
      8: { name: 'Balado Crackers', desc: 'Classic balado flavor with a balanced blend of spicy, savory, and rich spices.', badge: 'crackers' }
    }
  };

  /* Helper ----------------------------------------------------------------- */
  function getLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'id' || stored === 'en') return stored;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function t(key, lang) {
    lang = lang || getLang();
    var dict = translations[lang] || translations[DEFAULT_LANG];
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    // fallback ke bahasa default bila kunci tidak ada di bahasa terpilih
    var fallback = translations[DEFAULT_LANG];
    return Object.prototype.hasOwnProperty.call(fallback, key) ? fallback[key] : null;
  }

  function applyTranslations(lang) {
    lang = lang || getLang();

    // Teks biasa (textContent)
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = t(el.getAttribute('data-i18n'), lang);
      if (value !== null) el.textContent = value;
    });

    // Teks dengan markup terbatas (innerHTML) — mis. <br>, <em>
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var value = t(el.getAttribute('data-i18n-html'), lang);
      if (value !== null) el.innerHTML = value;
    });

    // Atribut, format: "placeholder:key, aria-label:key2, title:key3"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var value = t(parts[1].trim(), lang);
        if (value !== null) el.setAttribute(attr, value);
      });
    });

    // Judul dokumen
    var titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) {
      var titleVal = t(titleKey, lang);
      if (titleVal !== null) document.title = titleVal;
    }

    // Atribut lang pada <html>
    document.documentElement.setAttribute('lang', lang);

    // Status tombol pengalih bahasa
    document.querySelectorAll('[data-lang-switch] [data-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  /* API global agar skrip lain (produk.js) bisa ikut menerjemahkan ---------- */
  window.KBS_I18N = {
    getLang: getLang,
    t: t,
    product: function (id, field, lang) {
      lang = lang || getLang();
      // Selaraskan nama field: produk.js memakai 'description', kamus memakai 'desc'.
      if (field === 'description') field = 'desc';
      var set = productText[lang] || productText[DEFAULT_LANG];
      if (set[id] && set[id][field] != null) return set[id][field];
      var fb = productText[DEFAULT_LANG];
      return fb[id] ? fb[id][field] : '';
    }
  };

  function switchLang(lang) {
    if (lang !== 'id' && lang !== 'en') return;
    setLang(lang);
    applyTranslations(lang);
    // Beritahu skrip lain agar merender ulang konten dinamis.
    document.dispatchEvent(new CustomEvent('kbs:languagechange', { detail: { lang: lang } }));
  }

  window.KBS_I18N.switchLang = switchLang;
  window.KBS_I18N.apply = applyTranslations;

  /* Inisialisasi ----------------------------------------------------------- */
  function init() {
    var current = getLang();
    applyTranslations(current);

    document.querySelectorAll('[data-lang-switch]').forEach(function (group) {
      group.addEventListener('click', function (event) {
        var btn = event.target.closest('[data-lang]');
        if (!btn) return;
        event.preventDefault();
        switchLang(btn.getAttribute('data-lang'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
