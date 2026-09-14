/* ==========================================================================
   Kripik Balado Salsabila — Produk & katalog
   1. Data produk
   2. Render kartu produk
   3. Produk unggulan (beranda) & katalog (halaman produk)
   4. Filter kategori
   5. Modal detail produk
   ========================================================================== */

(function () {
  'use strict';

  const WA_NUMBER = '6282172111127';

  /* 1. Data produk --------------------------------------------------------- */
  // Data produk. Teks (name/description/badge) diambil dari kamus i18n bila
  // tersedia agar mengikuti bahasa aktif; nilai di sini menjadi fallback (ID).
  const products = [
    {
      id: 1,
      name: 'Kripik Balado Original',
      category: 'balado',
      size: '250 gram',
      image: 'assets/images/produk/kripikbalado.jpg',
      description: 'Rasa balado klasik dengan perpaduan pedas, gurih, dan rempah yang seimbang.',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Kripik Balado Durian',
      category: 'balado',
      size: '250 gram',
      image: 'assets/images/produk/kripikbaladodurian.png',
      description: 'Kripik balado andalan Salsabila, renyah dengan bumbu yang meresap.',
      badge: 'Favorit'
    },
    {
      id: 3,
      name: 'Pisang Balado',
      category: 'balado',
      size: '250 gram',
      image: 'assets/images/produk/pisangbalado.jpg',
      description: 'Keripik pisang berbalut balado manis pedas yang bikin nagih.',
      badge: 'Manis Pedas'
    },
    {
      id: 4,
      name: 'Keripik Bawang',
      category: 'oleh-oleh',
      size: '200 gram',
      image: 'assets/images/produk/Bawang.jpg',
      description: 'Keripik gurih dengan aroma bawang yang khas, cocok untuk teman santai.',
      badge: 'Gurih'
    },
    {
      id: 5,
      name: 'Keripik Keju',
      category: 'oleh-oleh',
      size: '200 gram',
      image: 'assets/images/produk/Keju.jpg',
      description: 'Perpaduan renyah dan gurihnya keju yang disukai semua kalangan.',
      badge: 'Favorit Keju'
    },
    {
      id: 6,
      name: 'Karak Kaliang',
      category: 'oleh-oleh',
      size: '200 gram',
      image: 'assets/images/produk/karakkaliang.jpg',
      description: 'Camilan khas Minang berbentuk angka delapan, renyah dan gurih.',
      badge: 'Khas Minang'
    },
    {
      id: 7,
      name: 'Kripik Tawar Asin',
      category: 'oleh-oleh',
      size: '200 gram',
      image: 'assets/images/produk/Asin.jpg',
      description: 'Pilihan rasa asin gurih untuk yang menyukai camilan tanpa pedas.',
      badge: 'Rasa Asin'
    },
    {
      id: 8,
      name: 'Emping Balado',
      category: 'balado',
      size: '200 gram',
      image: 'assets/images/produk/emping.png',
      description: 'Rasa balado klasik dengan perpaduan pedas, gurih, dan rempah yang seimbang.',
      badge: 'kerupuk'
    }
  ];

  // Ambil teks produk sesuai bahasa aktif (fallback ke nilai default di atas).
  function pText(product, field) {
    if (window.KBS_I18N && typeof window.KBS_I18N.product === 'function') {
      var value = window.KBS_I18N.product(product.id, field);
      if (value) return value;
    }
    return product[field] != null ? product[field] : '';
  }

  // Teks UI yang bergantung bahasa (fallback ke Indonesia).
  function uiText(key, fallback) {
    if (window.KBS_I18N && typeof window.KBS_I18N.t === 'function') {
      var value = window.KBS_I18N.t(key);
      if (value != null) return value;
    }
    return fallback;
  }

  /* 2. Render kartu produk -------------------------------------------------- */
  function productCard(product) {
    var name = pText(product, 'name');
    var badge = pText(product, 'badge');
    var description = pText(product, 'description');
    var origin = uiText('produk.card.origin', 'Khas Salsabila');
    var viewAria = uiText('produk.quickview_aria', 'Lihat detail');
    return `
      <article class="product-card reveal" data-category="${product.category}">
        <div class="product-image">
          <img src="${product.image}" alt="${name}">
          <span class="product-badge">${badge}</span>
          <button class="quick-view" data-product-id="${product.id}" aria-label="${viewAria} ${name}">&#8599;</button>
        </div>
        <div class="product-info">
          <div class="product-meta"><span>${product.size}</span><span>&bull;</span><span>${origin}</span></div>
          <h3>${name}</h3>
          <p>${description}</p>
          <div class="product-bottom">
            <strong>${product.price ? product.price : ''}</strong>
            
          </div>
        </div>
      </article>`;
  }

  function renderProducts(list, target) {
    if (!target) return;
    target.innerHTML = list.map(productCard).join('');

    // Tampilkan kartu dengan animasi bertahap.
    target.querySelectorAll('.product-card').forEach((card, index) => {
      window.setTimeout(() => card.classList.add('visible'), 60 * index);
    });

    target.querySelectorAll('[data-product-id]').forEach((button) => {
      button.addEventListener('click', () => openProductModal(Number(button.dataset.productId)));
    });
  }

  /* 3. Produk unggulan & katalog ------------------------------------------- */
  const featuredTarget = document.getElementById('featuredProducts');
  if (featuredTarget) renderProducts(products.slice(0, 3), featuredTarget);

  const productGrid = document.getElementById('productGrid');
  const filterTabs = document.getElementById('filterTabs');
  const productCount = document.getElementById('productCount');

  // Filter yang sedang aktif pada halaman katalog (untuk render ulang).
  let activeFilter = 'all';

  function currentList() {
    return activeFilter === 'all'
      ? products
      : products.filter((product) => product.category === activeFilter);
  }

  if (productGrid) {
    renderProducts(products, productGrid);
    if (productCount) productCount.textContent = products.length;

    /* 4. Filter kategori --------------------------------------------------- */
    if (filterTabs) {
      filterTabs.querySelectorAll('button').forEach((tab) => {
        tab.addEventListener('click', () => {
          filterTabs.querySelectorAll('button').forEach((item) => item.classList.remove('active'));
          tab.classList.add('active');

          activeFilter = tab.dataset.filter;
          const filtered = currentList();
          renderProducts(filtered, productGrid);
          if (productCount) productCount.textContent = filtered.length;
        });
      });
    }
  }

  /* Render ulang konten dinamis saat bahasa berganti ----------------------- */
  document.addEventListener('kbs:languagechange', () => {
    if (featuredTarget) renderProducts(products.slice(0, 3), featuredTarget);
    if (productGrid) renderProducts(currentList(), productGrid);
    // Perbarui modal bila sedang terbuka.
    if (modal && modal.classList.contains('open') && lastModalId != null) {
      openProductModal(lastModalId);
    }
  });

  /* 5. Modal detail produk -------------------------------------------------- */
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');
  let lastModalId = null;

  function openProductModal(id) {
    const product = products.find((item) => item.id === id);
    if (!product || !modal || !modalContent) return;

    lastModalId = id;
    const name = pText(product, 'name');
    const badge = pText(product, 'badge');
    const description = pText(product, 'description');
    const origin = uiText('produk.card.origin', 'Khas Salsabila');
    const orderLabel = uiText('produk.modal.order', 'Pesan Produk');
    const waText = encodeURIComponent(`Halo Kripik Balado Salsabila, saya ingin memesan ${name}.`);
    modalContent.innerHTML = `
      <div class="modal-product">
        <img src="${product.image}" alt="${name}">
        <div class="modal-product-copy">
          <span class="product-badge">${badge}</span>
          <div class="product-meta">${product.size} &bull; ${origin}</div>
          <h2>${name}</h2>
          <p>${description}</p>
          ${product.price ? `<strong class="modal-price">${product.price}</strong>` : ''}
          <a class="btn btn-primary" href="https://wa.me/${WA_NUMBER}?text=${waText}" target="_blank" rel="noopener noreferrer">${orderLabel} <span>&#8599;</span></a>
        </div>
      </div>`;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastModalId = null;
  }

  document.querySelectorAll('[data-close-modal]').forEach((element) => {
    element.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });
})();
