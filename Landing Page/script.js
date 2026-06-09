/**
 * =====================================================
 * THE DATA MIND — script.js
 * Animasi interaktif menggunakan GSAP + ScrollTrigger
 * =====================================================
 *
 * Cara kerja file ini:
 * 1. gsap.registerPlugin(ScrollTrigger) → mengaktifkan plugin scroll
 * 2. Animasi Hero   → berjalan otomatis saat halaman dimuat (no scroll needed)
 * 3. Animasi Scroll → berjalan saat elemen masuk ke viewport pengguna
 * 4. Interaksi UI   → navbar, hamburger, filter proyek
 */


/* =====================================================
   0. INISIALISASI — Daftarkan Plugin ScrollTrigger
   ===================================================
   ScrollTrigger adalah plugin GSAP yang memungkinkan
   animasi dipicu berdasarkan posisi scroll pengguna.
   Wajib didaftarkan sebelum digunakan.
===================================================== */
gsap.registerPlugin(ScrollTrigger);


/* =====================================================
   1. ANIMASI HERO — Muncul Saat Halaman Dimuat
   ===================================================
   gsap.timeline() membuat urutan animasi berurutan.
   Setiap .from() menganimasikan elemen dari kondisi
   awal yang kita tentukan (misal: y:40 = dari bawah)
   menuju kondisi normalnya (y:0, opacity:1).
===================================================== */

/**
 * Hero Timeline — semua elemen Hero masuk secara berurutan
 * dari bawah ke atas dengan fade in yang sangat halus.
 */
const heroTimeline = gsap.timeline({
    // defaults: pengaturan default yang diwarisi semua animasi dalam timeline ini
    defaults: {
        ease: "power3.out",  // easing: cepat di awal, melambat di akhir (halus)
        duration: 0.9,       // durasi animasi ~1 detik
    }
});

heroTimeline
    // [1] Badge "Tersedia untuk kolaborasi" masuk pertama
    .from(".hero-badge", {
        y: 30,          // mulai dari 30px di bawah posisi aslinya
        opacity: 0,     // mulai dari transparan (tidak terlihat)
        duration: 0.6,  // sedikit lebih cepat karena elemen kecil
    })

    // [2] Judul besar H1 masuk setelah badge
    // "-=0.3" artinya mulai 0.3 detik SEBELUM animasi sebelumnya selesai (overlap)
    .from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1.0,
    }, "-=0.3")

    // [3] Paragraf subtitle
    .from(".hero-subtitle", {
        y: 40,
        opacity: 0,
    }, "-=0.5")

    // [4] Tag-tag teknologi (Python, Java, dll) — stagger: muncul satu per satu
    .from(".hero-tags .tag", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,  // setiap tag muncul 0.08 detik setelah tag sebelumnya
    }, "-=0.4")

    // [5] Tombol CTA (Lihat Proyek, Hubungi Saya)
    .from(".hero-actions .btn", {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,  // tombol pertama, lalu kedua
    }, "-=0.3")

    // [6] Kotak statistik (12+ Proyek, dll)
    .from(".hero-stats", {
        y: 25,
        opacity: 0,
        scale: 0.97,    // sedikit mengecil, lalu membesar ke ukuran normal
        duration: 0.6,
    }, "-=0.2")

    // [7] Scroll indicator (panah bawah) masuk paling akhir
    .from(".hero-scroll-indicator", {
        opacity: 0,
        duration: 0.8,
    }, "-=0.1");


/* =====================================================
   2. ANIMASI NAVBAR — Header slide dari atas
   ===================================================
   Navbar juga dianimasikan saat load agar terasa premium.
===================================================== */
gsap.from(".site-header", {
    y: -80,         // mulai dari 80px di atas layar
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
    // Berjalan sedikit sebelum hero selesai agar terasa natural
    delay: 0.1,
});


/* =====================================================
   3. ANIMASI SCROLL — SECTION ABOUT
   ===================================================
   ScrollTrigger: animasi dipicu saat elemen masuk
   ke dalam area pandang (viewport) pengguna.
===================================================== */

// Foto profil — slide dari kiri
gsap.from(".about-photo-wrapper", {
    scrollTrigger: {
        trigger: ".section--about",   // animasi dimulai saat section About terlihat
        start: "top 75%",             // tepat saat bagian atas section mencapai 75% tinggi layar
        toggleActions: "play none none none", // hanya play sekali, tidak balik saat scroll naik
    },
    x: -60,         // mulai dari 60px di kiri
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
});

// Teks About — slide dari kanan
gsap.from(".about-text", {
    scrollTrigger: {
        trigger: ".section--about",
        start: "top 75%",
        toggleActions: "play none none none",
    },
    x: 60,          // mulai dari 60px di kanan
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    delay: 0.15,    // sedikit terlambat dari foto agar masuk bersamaan tapi tidak persis
});


/* =====================================================
   4. ANIMASI SCROLL — SECTION SKILLS
   ===================================================
   Setiap kartu skill muncul dengan stagger.
===================================================== */
gsap.from(".skill-category-card", {
    scrollTrigger: {
        trigger: ".section--skills",
        start: "top 70%",
        toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.15,  // kartu pertama, kedua, ketiga masuk bergantian
});


/* =====================================================
   5. ANIMASI SCROLL — PROJECT GRID (STAGGER EFFECT)
   ===================================================
   INILAH EFEK STAGGER UTAMA yang diminta:
   Setiap kartu proyek TIDAK muncul bersamaan,
   melainkan satu per satu dari bawah ke atas.
   
   Cara kerjanya:
   - GSAP menemukan semua elemen .project-card
   - Menganimasikan dari y:80 (bawah) → y:0 (posisi normal)
   - stagger:0.12 → setiap kartu tertunda 0.12 detik dari kartu sebelumnya
   - Hasilnya: kartu 1 muncul, 0.12s kemudian kartu 2, dst.
===================================================== */
gsap.from(".project-card", {
    scrollTrigger: {
        trigger: "#projects-grid",    // mulai saat grid proyek masuk viewport
        start: "top 80%",             // saat bagian atas grid di posisi 80% layar
        toggleActions: "play none none none",

        // Aktifkan baris di bawah untuk debugging (tampilkan garis merah di layar):
        // markers: true,
    },
    y: 80,          // mulai dari 80px di bawah
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",

    // STAGGER — inilah yang membuat kartu muncul satu per satu
    stagger: {
        amount: 0.9,  // total waktu stagger dibagi rata ke semua kartu (0.9s / 6 kartu ≈ 0.15s per kartu)
        from: "start", // mulai dari kartu paling atas-kiri
        ease: "power1.inOut",
    },
});


/* =====================================================
   6. ANIMASI SCROLL — SECTION TESTIMONIALS
===================================================== */
gsap.from(".testimonial-card", {
    scrollTrigger: {
        trigger: ".section--testimonials",
        start: "top 75%",
        toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2,
});


/* =====================================================
   7. ANIMASI SCROLL — SECTION HEADERS UNIVERSAL
   ===================================================
   Setiap .section-header di halaman akan dianimasikan
   saat masuk viewport (fade in dari bawah).
   
   Catatan: kita gunakan gsap.utils.toArray() untuk
   membuat animasi ScrollTrigger per elemen, bukan
   per section. Ini penting karena setiap section
   memiliki trigger-nya masing-masing.
===================================================== */
gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,        // setiap header jadi trigger dirinya sendiri
            start: "top 85%",
            toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
    });
});


/* =====================================================
   8. ANIMASI SCROLL — CONTACT SECTION
===================================================== */
gsap.from(".contact-info", {
    scrollTrigger: {
        trigger: ".footer-contact",
        start: "top 75%",
        toggleActions: "play none none none",
    },
    x: -50,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
});

gsap.from(".contact-form", {
    scrollTrigger: {
        trigger: ".footer-contact",
        start: "top 75%",
        toggleActions: "play none none none",
    },
    x: 50,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    delay: 0.15,
});


/* =====================================================
   9. INTERAKSI UI — NAVBAR SCROLL EFFECT
   ===================================================
   Menambahkan class 'scrolled' ke header saat pengguna
   scroll lebih dari 50px. Class ini mengubah background
   navbar menjadi lebih gelap (sudah di-style di CSS).
===================================================== */
const siteHeader = document.getElementById("site-header");

window.addEventListener("scroll", () => {
    // Cek jika posisi scroll vertikal lebih dari 50px
    if (window.scrollY > 50) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
});


/* =====================================================
   10. INTERAKSI UI — HAMBURGER MENU (Mobile)
   ===================================================
   Toggle class 'is-open' pada nav-menu saat tombol
   hamburger diklik. Class ini dikendalikan CSS untuk
   menampilkan/menyembunyikan menu di layar kecil.
===================================================== */
const navToggle = document.getElementById("nav-toggle");
const navMenu   = document.getElementById("nav-menu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        // Baca status saat ini: apakah menu sedang terbuka?
        const isOpen = navMenu.classList.contains("is-open");

        // Toggle class dan update atribut ARIA untuk aksesibilitas
        navMenu.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    // Tutup menu saat salah satu nav-link diklik (UX yang baik)
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* =====================================================
   11. INTERAKSI UI — FILTER PROYEK
   ===================================================
   Saat tombol filter diklik:
   1. Update styling tombol aktif (aria-pressed)
   2. Tampilkan/sembunyikan project-card yang sesuai
   3. Animasikan kartu yang muncul dengan GSAP
===================================================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards  = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        // --- Update state tombol aktif ---
        filterButtons.forEach((b) => {
            b.classList.remove("filter-btn--active");
            b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("filter-btn--active");
        btn.setAttribute("aria-pressed", "true");

        const selectedFilter = btn.dataset.filter; // ambil nilai data-filter dari tombol

        // --- Filter & animasikan kartu ---
        projectCards.forEach((card) => {
            const cardCategory = card.dataset.category; // ambil nilai data-category dari kartu

            // Tentukan apakah kartu ini harus ditampilkan
            const shouldShow = selectedFilter === "all" || cardCategory === selectedFilter;

            if (shouldShow) {
                // Tampilkan: hapus display none lalu animasikan masuk
                gsap.set(card, { display: "flex" });
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });
            } else {
                // Sembunyikan: animasikan keluar lalu set display none
                gsap.to(card, {
                    opacity: 0,
                    y: 20,
                    scale: 0.97,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        // Setelah animasi selesai, benar-benar hilangkan dari layout
                        gsap.set(card, { display: "none" });
                    },
                });
            }
        });
    });
});


/* =====================================================
   12. EFEK HOVER TAMBAHAN — Parallax Latar Hero
   ===================================================
   Partikel latar Hero bergerak sedikit mengikuti
   gerakan mouse untuk efek depth yang premium.
   (Ini adalah efek opsional — bisa dimatikan)
===================================================== */
const heroSection    = document.getElementById("hero");
const heroParticles  = document.querySelectorAll(".hero-particle");

if (heroSection && heroParticles.length > 0) {
    heroSection.addEventListener("mousemove", (e) => {
        // Hitung posisi mouse relatif terhadap tengah layar (-0.5 s/d 0.5)
        const relX = (e.clientX / window.innerWidth)  - 0.5;
        const relY = (e.clientY / window.innerHeight) - 0.5;

        // Gerakkan setiap partikel dengan kecepatan berbeda (depth illusion)
        heroParticles.forEach((particle, index) => {
            const speed   = (index + 1) * 18; // partikel 1 = 18px, 2 = 36px, 3 = 54px
            const targetX = relX * speed;
            const targetY = relY * speed;

            // gsap.to() dengan durasi pendek = pergerakan yang smooth & natural
            gsap.to(particle, {
                x: targetX,
                y: targetY,
                duration: 1.2,
                ease: "power1.out",
                overwrite: "auto", // batalkan animasi sebelumnya agar tidak menumpuk
            });
        });
    });

    // Reset posisi partikel saat mouse keluar dari hero section
    heroSection.addEventListener("mouseleave", () => {
        heroParticles.forEach((particle) => {
            gsap.to(particle, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: "power2.out",
            });
        });
    });
}
