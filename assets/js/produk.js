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
      name: 'Kripik Balado Salsabila',
      category: 'balado',
      size: '250 gram',
      image: 'assets/images/produk/kripikbaladoori.jpg',
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
      size: '250 gram',
      image: 'assets/images/produk/Asin.jpg',
      description: 'Pilihan rasa asin gurih untuk yang menyukai camilan tanpa pedas.',
      badge: 'Rasa Asin'
    },
    {
      id: 8,
      name: 'Paket Oleh-oleh Salsabila',
      category: 'paket',
      size: '3 kemasan',
      image: 'assets/images/produk/piring.JPG',
      description: 'Paket praktis berisi tiga varian favorit, pas untuk buah tangan.',
      badge: 'Paket'
    }
  ];

  /* Ambil terjemahan bila i18n tersedia; jika tidak, pakai teks bawaan (id). */
  function t(key, fallback) {
    if (window.KBSi18n && typeof window.KBSi18n.t === 'function') {
      const value = window.KBSi18n.t(key);
      if (value) return value;
    }
    return fallback;
  }

  // Nama, deskripsi, dan badge produk mengikuti bahasa aktif melalui kunci
  // "product.<id>.<field>" yang didefinisikan di i18n.js.
  function localizedProduct(product) {
    return {
      name: t('product.' + product.id + '.name', product.name),
      description: t('product.' + product.id + '.desc', product.description),
      badge: t('product.' + product.id + '.badge', product.badge)
    };
  }

  /* 2. Render kartu produk -------------------------------------------------- */
  function productCard(product) {
    const l = localizedProduct(product);
    const metaBrand = t('product.metaBrand', 'Khas Salsabila');
    const quickView = t('product.quickView', 'Lihat detail');
    return `
      <article class="product-card reveal" data-category="${product.category}">
        <div class="product-image">
          <img src="${product.image}" alt="${l.name}">
          <span class="product-badge">${l.badge}</span>
          <button class="quick-view" data-product-id="${product.id}" aria-label="${quickView} ${l.name}">&#8599;</button>
        </div>
        <div class="product-info">
          <div class="product-meta"><span>${product.size}</span><span>&bull;</span><span>${metaBrand}</span></div>
          <h3>${l.name}</h3>
          <p>${l.description}</p>
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

  // Simpan filter aktif agar bisa dirender ulang saat bahasa berganti.
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

  /* Render ulang produk ketika bahasa berganti (teks mengikuti bahasa baru). */
  document.addEventListener('kbs:languagechange', () => {
    if (featuredTarget) renderProducts(products.slice(0, 3), featuredTarget);
    if (productGrid) renderProducts(currentList(), productGrid);
  });

  /* 5. Modal detail produk -------------------------------------------------- */
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');

  function openProductModal(id) {
    const product = products.find((item) => item.id === id);
    if (!product || !modal || !modalContent) return;

    const l = localizedProduct(product);
    const metaBrand = t('product.metaBrand', 'Khas Salsabila');
    const orderBtn = t('product.orderBtn', 'Pesan Produk <span>&#8599;</span>');
    // Pesan WhatsApp memakai nama asli (Indonesia) agar konsisten untuk penjual.
    const waText = encodeURIComponent(`Halo Kripik Balado Salsabila, saya ingin memesan ${product.name}.`);
    modalContent.innerHTML = `
      <div class="modal-product">
        <img src="${product.image}" alt="${l.name}">
        <div class="modal-product-copy">
          <span class="product-badge">${l.badge}</span>
          <div class="product-meta">${product.size} &bull; ${metaBrand}</div>
          <h2>${l.name}</h2>
          <p>${l.description}</p>
          ${product.price ? `<strong class="modal-price">${product.price}</strong>` : ''}
          <a class="btn btn-primary" href="https://wa.me/${WA_NUMBER}?text=${waText}" target="_blank" rel="noopener noreferrer">${orderBtn}</a>
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
  }

  document.querySelectorAll('[data-close-modal]').forEach((element) => {
    element.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });
})();
