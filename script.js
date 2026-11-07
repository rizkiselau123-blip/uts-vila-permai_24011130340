// Data 6 Vila (Memanggil File Gambar Lokal di Folder assets/)
const villas = [
    {
        id: 1,
        name: "Villa Rosewood",
        location: "Puncak, Bogor",
        price: 1500000,
        facilities: ["Pool", "WiFi", "Dapur", "BBQ"],
        fullFacilities: [
            { icon: "fa-swimming-pool", text: "Kolam Renang Pribadi" },
            { icon: "fa-wifi", text: "Free High-Speed WiFi" },
            { icon: "fa-utensils", text: "Dapur & Alat Masak Lengkap" },
            { icon: "fa-fire", text: "Area Barbeque (BBQ)" },
            { icon: "fa-bed", text: "3 Kamar Tidur (King Size)" },
            { icon: "fa-tv", text: "Smart TV + Netflix" }
        ],
        description: "Villa Rosewood menyajikan pemandangan pegunungan Puncak yang asri dengan suasana interior kayu hangat modern.",
        mainImage: "assets/01.vila.jpg",
        gallery: [
            { title: "Ruang Tamu", url: "assets/isidalem1.1.jpg" },
            { title: "Kamar Tidur Utama", url: "assets/isidalem1.2.jpg" },
            { title: "Dapur Lengkap", url: "assets/isidalem1.3.jpg" },
            { title: "Kamar Mandi", url: "assets/isidalem1.4.jpg" }
        ]
    },
    {
        id: 2,
        name: "Villa Orchid",
        location: "Lembang, Bandung",
        price: 2200000,
        facilities: ["Pool", "WiFi", "Karaoke", "Taman"],
        fullFacilities: [
            { icon: "fa-swimming-pool", text: "Kolam Renang Air Hangat" },
            { icon: "fa-wifi", text: "Free WiFi" },
            { icon: "fa-microphone", text: "Ruang Karaoke Keluarga" },
            { icon: "fa-tree", text: "Taman Bunga Asri" },
            { icon: "fa-bed", text: "4 Kamar Tidur Minimalis" }
        ],
        description: "Villa Orchid menawarkan udara sejuk khas Lembang dengan konsep interior minimalis serba putih.",
        mainImage: "assets/02.vila.jpg",
        gallery: [
            { title: "Ruang Tamu", url: "assets/2.1_ruang_tamu.jpg" },
            { title: "Kamar Tidur Utama", url: "assets/2.2_dapur.jpg" },
            { title: "Dapur Lengkap", url: "assets/2.3_kamar_tidur.jpg" },
            { title: "Kamar Mandi", url: "assets/2.4_kamar_mandi.jpg" }
        ]
    },
    {
        id: 3,
        name: "Villa Sakura",
        location: "Ubud, Bali",
        price: 3500000,
        facilities: ["Private Pool", "WiFi", "Jacuzzi", "Spa"],
        fullFacilities: [
            { icon: "fa-water", text: "Infinity Private Pool" },
            { icon: "fa-hot-tub", text: "Jacuzzi Air Hangat" },
            { icon: "fa-spa", text: "Layanan Spa & Pijat" },
            { icon: "fa-wifi", text: "Ultra Fast WiFi" },
            { icon: "fa-bed", text: "2 Master Suite Bed" }
        ],
        description: "Villa Sakura menyajikan kemewahan tropis di tengah hamparan sawah Ubud dengan fasilitas Jacuzzi outdoor.",
        mainImage: "assets/03.vila.jpg",
        gallery: [
            { title: "Ruang Tamu", url: "assets/3.1_ruang_tamu.jpg" },
            { title: "Kamar Tidur Utama", url: "assets/3.2_dapur.jpg" },
            { title: "Dapur Lengkap", url: "assets/3.3_kamar_tidur_gaming.jpg" },
            { title: "Kamar Mandi", url: "assets/3.4_kamar_mandi.jpg" }
        ]
    },
    
];

// Inisialisasi DOM Event
document.addEventListener('DOMContentLoaded', () => {
    const villaGrid = document.getElementById('villaGrid');
    const searchInput = document.getElementById('searchInput');
    const priceFilter = document.getElementById('priceFilter');
    const bookingForm = document.getElementById('bookingForm');
    const villaSelect = document.getElementById('villaSelect');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const summaryNights = document.getElementById('summaryNights');
    const summaryRate = document.getElementById('summaryRate');
    const summaryTotal = document.getElementById('summaryTotal');
    const historyList = document.getElementById('historyList');
    const btnCheck = document.getElementById('btnCheck');
    const villaModal = document.getElementById('villaModal');
    const modalBody = document.getElementById('modalBody');

    // Render Kartu Vila
    function renderVillas(items) {
        if (!villaGrid) return;
        villaGrid.innerHTML = '';

        if (items.length === 0) {
            villaGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Vila tidak ditemukan.</p>';
            return;
        }

        items.forEach(villa => {
            const card = document.createElement('div');
            card.className = 'villa-card';
            card.innerHTML = `
                <img src="${villa.mainImage}" alt="${villa.name}" onerror="this.src='https://via.placeholder.com/400x250?text=Foto+Tidak+Ditemukan'">
                <div class="villa-info">
                    <h3>${villa.name}</h3>
                    <p class="villa-location"><i class="fa-solid fa-location-dot"></i> <strong>Lokasi:</strong> ${villa.location}</p>
                    <div class="villa-facilities">
                        ${villa.facilities.map(f => `<span class="badge">${f}</span>`).join('')}
                    </div>
                    <div class="villa-price">Rp ${villa.price.toLocaleString('id-ID')} / malam</div>
                    
                    <div style="display: flex; gap: 8px; margin-top: 10px;">
                        <button onclick="openVillaModal(${villa.id})" class="btn btn-secondary" style="flex: 1;">
                            <i class="fa-solid fa-images"></i> Lihat Dalam Vila
                        </button>
                        <button onclick="selectVillaForBooking(${villa.id})" class="btn btn-primary" style="flex: 1;">
                            Pesan
                        </button>
                    </div>
                </div>
            `;
            villaGrid.appendChild(card);
        });
    }

    // Modal Pop-Up Foto Interior
    window.openVillaModal = function(id) {
        const villa = villas.find(v => v.id === id);
        if (!villa || !modalBody || !villaModal) return;

        modalBody.innerHTML = `
            <h2 style="color: var(--primary-dark); margin-bottom: 5px;">${villa.name}</h2>
            <p style="color: var(--text-muted); margin-bottom: 15px;"><i class="fa-solid fa-location-dot"></i> <strong>Lokasi Vila:</strong> ${villa.location}</p>
            <p style="margin-bottom: 20px; line-height: 1.5;">${villa.description}</p>
            
            <h3 style="color: var(--primary-dark); margin-bottom: 10px;"><i class="fa-solid fa-house-open"></i> Foto Bagian Dalam (Interior Vila):</h3>
            <div class="gallery-grid">
                ${villa.gallery.map(g => `
                    <div class="gallery-item">
                        <img src="${g.url}" alt="${g.title}" onerror="this.src='https://via.placeholder.com/200x140?text=Interior'">
                        <span style="font-size:0.85rem; font-weight:600; display:block; text-align:center; margin-top:4px;">${g.title}</span>
                    </div>
                `).join('')}
            </div>

            <h3 style="color: var(--primary-dark); margin-top: 20px; margin-bottom: 10px;"><i class="fa-solid fa-list-check"></i> Fasilitas Lengkap:</h3>
            <div class="facility-list">
                ${villa.fullFacilities.map(f => `
                    <div class="facility-item">
                        <i class="fa-solid ${f.icon}"></i>
                        <span>${f.text}</span>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 25px; text-align: right;">
                <button onclick="selectVillaForBooking(${villa.id}); closeModal();" class="btn btn-primary">
                    Pilih & Pesan Vila Ini
                </button>
            </div>
        `;

        villaModal.style.display = 'block';
    };

    window.closeModal = function() {
        if (villaModal) villaModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === villaModal) closeModal();
    };

    // Auto Select Vila & Scroll Form
    window.selectVillaForBooking = function(id) {
        if (villaSelect) {
            villaSelect.value = id;
            calculateTotal();
        }
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    };

    // Filter & Search Realtime
    function filterVillas() {
        const keyword = searchInput.value.toLowerCase();
        const filterValue = priceFilter.value;

        const filtered = villas.filter(v => {
            const matchesSearch = v.name.toLowerCase().includes(keyword) || v.location.toLowerCase().includes(keyword);
            let matchesPrice = true;

            if (filterValue === 'low') matchesPrice = v.price < 2000000;
            else if (filterValue === 'mid') matchesPrice = v.price >= 2000000 && v.price <= 3000000;
            else if (filterValue === 'high') matchesPrice = v.price > 3000000;

            return matchesSearch && matchesPrice;
        });

        renderVillas(filtered);
    }

    // Kalkulator Otomatis Total Biaya
    function calculateTotal() {
        if (!villaSelect || !checkInInput || !checkOutInput) return;

        const selectedId = parseInt(villaSelect.value);
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);

        const selectedVilla = villas.find(v => v.id === selectedId);

        if (selectedVilla && checkInInput.value && checkOutInput.value && checkOut > checkIn) {
            const timeDiff = checkOut.getTime() - checkIn.getTime();
            const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const total = nights * selectedVilla.price;

            if (summaryNights) summaryNights.textContent = `${nights} Malam`;
            if (summaryRate) summaryRate.textContent = `Rp ${selectedVilla.price.toLocaleString('id-ID')}`;
            if (summaryTotal) summaryTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        } else {
            if (summaryNights) summaryNights.textContent = '0 Malam';
            if (summaryRate) summaryRate.textContent = 'Rp 0';
            if (summaryTotal) summaryTotal.textContent = 'Rp 0';
        }
    }

    // Tombol Cek Ketersediaan
    if (btnCheck) {
        btnCheck.addEventListener('click', () => {
            if (!villaSelect.value || !checkInInput.value || !checkOutInput.value) {
                alert('Harap pilih vila dan tanggal check-in/check-out terlebih dahulu.');
                return;
            }
            alert('Vila TERSEDIA untuk tanggal tersebut! Silakan lanjutkan pemesanan.');
        });
    }

    // Penyimpanan LocalStorage
    function saveBooking(booking) {
        let bookings = JSON.parse(localStorage.getItem('villaBookings')) || [];
        bookings.push(booking);
        localStorage.setItem('villaBookings', JSON.stringify(bookings));
        renderHistory();
    }

    function renderHistory() {
        if (!historyList) return;
        let bookings = JSON.parse(localStorage.getItem('villaBookings')) || [];
        historyList.innerHTML = '';

        if (bookings.length === 0) {
            historyList.innerHTML = '<p style="text-align:center; color: var(--text-muted);">Belum ada pemesanan tersimpan.</p>';
            return;
        }

        bookings.forEach((b, index) => {
            const item = document.createElement('div');
            item.className = 'history-card';
            item.innerHTML = `
                <div>
                    <h4 style="color: var(--primary-dark);">${b.villaName}</h4>
                    <p><strong>Pemesan:</strong> ${b.name} (${b.phone})</p>
                    <p><strong>Tanggal:</strong> ${b.checkIn} s/d ${b.checkOut} (${b.nights} malam)</p>
                    <p><strong>Total Biaya:</strong> Rp ${b.totalPrice.toLocaleString('id-ID')}</p>
                </div>
                <button onclick="deleteBooking(${index})" class="btn btn-secondary" style="background-color: #fee2e2; color: #ef4444;">
                    <i class="fa-solid fa-trash"></i> Hapus
                </button>
            `;
            historyList.appendChild(item);
        });
    }

    window.deleteBooking = function(index) {
        let bookings = JSON.parse(localStorage.getItem('villaBookings')) || [];
        bookings.splice(index, 1);
        localStorage.setItem('villaBookings', JSON.stringify(bookings));
        renderHistory();
    };

    // Form Submit Event Handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const selectedId = parseInt(villaSelect.value);
            const selectedVilla = villas.find(v => v.id === selectedId);
            const checkIn = new Date(checkInInput.value);
            const checkOut = new Date(checkOutInput.value);

            if (checkOut <= checkIn) {
                alert('Tanggal check-out harus lebih baru dari tanggal check-in!');
                return;
            }

            const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
            const totalPrice = nights * selectedVilla.price;

            const bookingData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                villaName: selectedVilla.name,
                guests: document.getElementById('guests').value,
                checkIn: checkInInput.value,
                checkOut: checkOutInput.value,
                nights: nights,
                totalPrice: totalPrice
            };

            saveBooking(bookingData);
            alert('Pemesanan berhasil disimpan!');
            bookingForm.reset();
            calculateTotal();
        });
    }

    // Event Listeners
    if (searchInput) searchInput.addEventListener('input', filterVillas);
    if (priceFilter) priceFilter.addEventListener('change', filterVillas);
    if (villaSelect) villaSelect.addEventListener('change', calculateTotal);
    if (checkInInput) checkInInput.addEventListener('change', calculateTotal);
    if (checkOutInput) checkOutInput.addEventListener('change', calculateTotal);

    // Jalankan Saat Pertama Kali Dibuka
    renderVillas(villas);
    renderHistory();
});