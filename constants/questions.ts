export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  level: number; // 1-15
  category: string;
}

const ALL_QUESTIONS: Question[] = [
  // LEVEL 1 - Very Easy
  { id: 'q001', level: 1, category: 'umum', question: 'Berapa jumlah hari dalam seminggu?', options: ['5', '6', '7', '8'], correctIndex: 2 },
  { id: 'q002', level: 1, category: 'umum', question: 'Warna bendera Indonesia adalah...', options: ['Merah Putih', 'Biru Putih', 'Merah Biru', 'Hijau Putih'], correctIndex: 0 },
  { id: 'q003', level: 1, category: 'umum', question: 'Ibu kota Indonesia adalah...', options: ['Surabaya', 'Bandung', 'Jakarta', 'Medan'], correctIndex: 2 },
  { id: 'q004', level: 1, category: 'sains', question: 'Planet terdekat dengan Matahari adalah...', options: ['Venus', 'Mars', 'Bumi', 'Merkurius'], correctIndex: 3 },
  { id: 'q005', level: 1, category: 'umum', question: 'Berapa jumlah bulan dalam setahun?', options: ['10', '11', '12', '13'], correctIndex: 2 },
  { id: 'q006', level: 1, category: 'alam', question: 'Hewan apa yang dikenal sebagai "Raja Hutan"?', options: ['Harimau', 'Singa', 'Gajah', 'Beruang'], correctIndex: 1 },
  { id: 'q007', level: 1, category: 'umum', question: 'Berapa hasil dari 5 + 5?', options: ['8', '9', '10', '11'], correctIndex: 2 },
  { id: 'q008', level: 1, category: 'geografi', question: 'Benua terbesar di dunia adalah...', options: ['Afrika', 'Amerika', 'Eropa', 'Asia'], correctIndex: 3 },
  { id: 'q009', level: 1, category: 'umum', question: 'Bahasa resmi Indonesia adalah...', options: ['Jawa', 'Sunda', 'Indonesia', 'Melayu'], correctIndex: 2 },
  { id: 'q010', level: 1, category: 'alam', question: 'Hewan apa yang menghasilkan madu?', options: ['Kupu-kupu', 'Lebah', 'Nyamuk', 'Laba-laba'], correctIndex: 1 },

  // LEVEL 2
  { id: 'q011', level: 2, category: 'sains', question: 'Gas apa yang kita hirup untuk bernapas?', options: ['Karbon Dioksida', 'Hidrogen', 'Oksigen', 'Nitrogen'], correctIndex: 2 },
  { id: 'q012', level: 2, category: 'geografi', question: 'Sungai terpanjang di dunia adalah...', options: ['Amazon', 'Nil', 'Mississippi', 'Yangtze'], correctIndex: 1 },
  { id: 'q013', level: 2, category: 'sejarah', question: 'Proklamasi kemerdekaan Indonesia dibacakan pada tahun...', options: ['1942', '1943', '1945', '1949'], correctIndex: 2 },
  { id: 'q014', level: 2, category: 'sains', question: 'Berapa jumlah kaki pada serangga?', options: ['4', '6', '8', '10'], correctIndex: 1 },
  { id: 'q015', level: 2, category: 'umum', question: 'Mata uang resmi Indonesia adalah...', options: ['Ringgit', 'Rupiah', 'Peso', 'Baht'], correctIndex: 1 },
  { id: 'q016', level: 2, category: 'geografi', question: 'Gunung tertinggi di dunia adalah...', options: ['K2', 'Kilimanjaro', 'Everest', 'Andes'], correctIndex: 2 },
  { id: 'q017', level: 2, category: 'sains', question: 'Rumus kimia air adalah...', options: ['CO2', 'H2O', 'O2', 'NaCl'], correctIndex: 1 },
  { id: 'q018', level: 2, category: 'umum', question: 'Hari kemerdekaan Indonesia diperingati setiap tanggal...', options: ['1 Juni', '17 Agustus', '28 Oktober', '5 Juli'], correctIndex: 1 },
  { id: 'q019', level: 2, category: 'alam', question: 'Proses fotosintesis menghasilkan...', options: ['Oksigen', 'Karbon Dioksida', 'Nitrogen', 'Hidrogen'], correctIndex: 0 },
  { id: 'q020', level: 2, category: 'geografi', question: 'Danau terbesar di Indonesia adalah...', options: ['Danau Toba', 'Danau Maninjau', 'Danau Poso', 'Danau Towuti'], correctIndex: 0 },

  // LEVEL 3
  { id: 'q021', level: 3, category: 'sejarah', question: 'Siapakah presiden pertama Indonesia?', options: ['Soeharto', 'Habibie', 'Soekarno', 'Megawati'], correctIndex: 2 },
  { id: 'q022', level: 3, category: 'sains', question: 'Planet terbesar di tata surya adalah...', options: ['Saturnus', 'Neptunus', 'Jupiter', 'Uranus'], correctIndex: 2 },
  { id: 'q023', level: 3, category: 'matematika', question: 'Berapa hasil dari 12 x 12?', options: ['124', '144', '132', '148'], correctIndex: 1 },
  { id: 'q024', level: 3, category: 'geografi', question: 'Ibu kota Australia adalah...', options: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'], correctIndex: 3 },
  { id: 'q025', level: 3, category: 'sains', question: 'Berapa kecepatan cahaya per detik (kira-kira)?', options: ['100.000 km', '200.000 km', '300.000 km', '400.000 km'], correctIndex: 2 },
  { id: 'q026', level: 3, category: 'sejarah', question: 'Siapa yang menemukan lampu pijar?', options: ['Nikola Tesla', 'Thomas Edison', 'Albert Einstein', 'Alexander Graham Bell'], correctIndex: 1 },
  { id: 'q027', level: 3, category: 'alam', question: 'Berapa jumlah tulang pada tubuh manusia dewasa?', options: ['186', '196', '206', '216'], correctIndex: 2 },
  { id: 'q028', level: 3, category: 'budaya', question: 'Tari Saman berasal dari provinsi...', options: ['Sumatera Barat', 'Aceh', 'Sumatera Utara', 'Riau'], correctIndex: 1 },
  { id: 'q029', level: 3, category: 'sains', question: 'Hewan apa yang memiliki lebih banyak gigi?', options: ['Sapi', 'Gajah', 'Buaya', 'Hiu'], correctIndex: 3 },
  { id: 'q030', level: 3, category: 'geografi', question: 'Negara manakah yang memiliki penduduk terbanyak?', options: ['India', 'Amerika Serikat', 'Tiongkok', 'Indonesia'], correctIndex: 2 },

  // LEVEL 4
  { id: 'q031', level: 4, category: 'sains', question: 'Organ tubuh manakah yang memompa darah?', options: ['Paru-paru', 'Ginjal', 'Jantung', 'Hati'], correctIndex: 2 },
  { id: 'q032', level: 4, category: 'geografi', question: 'Samudra terluas di dunia adalah...', options: ['Atlantik', 'Hindia', 'Pasifik', 'Arktik'], correctIndex: 2 },
  { id: 'q033', level: 4, category: 'sejarah', question: 'Kapan Perang Dunia II berakhir?', options: ['1943', '1944', '1945', '1946'], correctIndex: 2 },
  { id: 'q034', level: 4, category: 'sains', question: 'Unsur kimia dengan simbol "Au" adalah...', options: ['Perak', 'Emas', 'Aluminium', 'Tembaga'], correctIndex: 1 },
  { id: 'q035', level: 4, category: 'budaya', question: 'Batik mendapatkan pengakuan UNESCO pada tahun...', options: ['2007', '2008', '2009', '2010'], correctIndex: 2 },
  { id: 'q036', level: 4, category: 'matematika', question: 'Berapakah nilai pi (π) hingga dua desimal?', options: ['3.12', '3.14', '3.16', '3.18'], correctIndex: 1 },
  { id: 'q037', level: 4, category: 'sains', question: 'Berapa jumlah kromosom pada sel manusia normal?', options: ['23', '44', '46', '48'], correctIndex: 2 },
  { id: 'q038', level: 4, category: 'geografi', question: 'Gunung berapi aktif paling terkenal di Indonesia adalah...', options: ['Rinjani', 'Krakatau', 'Merapi', 'Semeru'], correctIndex: 2 },
  { id: 'q039', level: 4, category: 'sejarah', question: 'Tembok Besar China dibangun oleh dinasti...', options: ['Tang', 'Han', 'Ming', 'Qin'], correctIndex: 2 },
  { id: 'q040', level: 4, category: 'teknologi', question: 'Siapa pendiri perusahaan Apple?', options: ['Bill Gates', 'Elon Musk', 'Steve Jobs', 'Mark Zuckerberg'], correctIndex: 2 },

  // LEVEL 5
  { id: 'q041', level: 5, category: 'sains', question: 'Teori relativitas dikemukakan oleh...', options: ['Isaac Newton', 'Albert Einstein', 'Stephen Hawking', 'Niels Bohr'], correctIndex: 1 },
  { id: 'q042', level: 5, category: 'geografi', question: 'Negara terkecil di dunia adalah...', options: ['Monaco', 'San Marino', 'Vatikan', 'Liechtenstein'], correctIndex: 2 },
  { id: 'q043', level: 5, category: 'sejarah', question: 'Sumpah Pemuda diikrarkan pada tanggal...', options: ['17 Agustus 1928', '28 Oktober 1928', '1 Juni 1945', '20 Mei 1908'], correctIndex: 1 },
  { id: 'q044', level: 5, category: 'sains', question: 'DNA singkatan dari...', options: ['Deoxyribonucleic Acid', 'Dynamic Nuclear Acid', 'Deoxyribose Nucleic Array', 'Double Nuclear Acid'], correctIndex: 0 },
  { id: 'q045', level: 5, category: 'matematika', question: 'Berapakah akar kuadrat dari 144?', options: ['11', '12', '13', '14'], correctIndex: 1 },
  { id: 'q046', level: 5, category: 'geografi', question: 'Gurun terbesar di dunia adalah...', options: ['Sahara', 'Gobi', 'Kalahari', 'Antartika'], correctIndex: 3 },
  { id: 'q047', level: 5, category: 'budaya', question: 'Bahasa Jawa memiliki berapa tingkatan bahasa?', options: ['2', '3', '4', '5'], correctIndex: 1 },
  { id: 'q048', level: 5, category: 'sains', question: 'Kecepatan suara di udara kira-kira...', options: ['143 m/s', '243 m/s', '343 m/s', '443 m/s'], correctIndex: 2 },
  { id: 'q049', level: 5, category: 'sejarah', question: 'Kerajaan Majapahit berpusat di...', options: ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali'], correctIndex: 2 },
  { id: 'q050', level: 5, category: 'teknologi', question: 'WWW diciptakan oleh...', options: ['Bill Gates', 'Tim Berners-Lee', 'Vint Cerf', 'Steve Jobs'], correctIndex: 1 },

  // LEVEL 6
  { id: 'q051', level: 6, category: 'sains', question: 'Berapa jumlah elemen di tabel periodik saat ini?', options: ['108', '118', '128', '138'], correctIndex: 1 },
  { id: 'q052', level: 6, category: 'geografi', question: 'Danau Baikal berada di negara...', options: ['China', 'Mongolia', 'Rusia', 'Kazakhstan'], correctIndex: 2 },
  { id: 'q053', level: 6, category: 'sejarah', question: 'Perang Diponegoro berlangsung dari tahun...', options: ['1820-1825', '1825-1830', '1830-1835', '1815-1820'], correctIndex: 1 },
  { id: 'q054', level: 6, category: 'matematika', question: 'Berapakah nilai dari 2^10?', options: ['512', '1024', '2048', '256'], correctIndex: 1 },
  { id: 'q055', level: 6, category: 'sains', question: 'Hukum gravitasi universal ditemukan oleh...', options: ['Einstein', 'Newton', 'Galileo', 'Kepler'], correctIndex: 1 },
  { id: 'q056', level: 6, category: 'budaya', question: 'Candi Borobudur dibangun pada abad ke...', options: ['6', '7', '8', '9'], correctIndex: 2 },
  { id: 'q057', level: 6, category: 'teknologi', question: 'Sistem operasi Android dikembangkan oleh...', options: ['Apple', 'Microsoft', 'Google', 'Samsung'], correctIndex: 2 },
  { id: 'q058', level: 6, category: 'sains', question: 'Berapa tekanan atmosfer standar di permukaan laut?', options: ['1 atm', '2 atm', '0.5 atm', '1.5 atm'], correctIndex: 0 },
  { id: 'q059', level: 6, category: 'geografi', question: 'Batas barat Indonesia adalah...', options: ['Papua Nugini', 'Malaysia', 'Samudra Hindia', 'Sabang'], correctIndex: 2 },
  { id: 'q060', level: 6, category: 'sejarah', question: 'Siapakah penemu telepon?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Guglielmo Marconi', 'Nikola Tesla'], correctIndex: 1 },

  // LEVEL 7
  { id: 'q061', level: 7, category: 'sains', question: 'Partikel subatomik yang bermuatan negatif disebut...', options: ['Proton', 'Neutron', 'Elektron', 'Quark'], correctIndex: 2 },
  { id: 'q062', level: 7, category: 'matematika', question: 'Jika x^2 = 169, maka x = ...', options: ['11', '12', '13', '14'], correctIndex: 2 },
  { id: 'q063', level: 7, category: 'geografi', question: 'Titik terdalam di lautan adalah Palung...', options: ['Filipina', 'Mariana', 'Puerto Rico', 'Java'], correctIndex: 1 },
  { id: 'q064', level: 7, category: 'sejarah', question: 'Revolusi Industri pertama bermula di negara...', options: ['Prancis', 'Jerman', 'Inggris', 'Amerika Serikat'], correctIndex: 2 },
  { id: 'q065', level: 7, category: 'sains', question: 'Vitamin C juga dikenal sebagai...', options: ['Asam Folat', 'Asam Askorbat', 'Asam Amino', 'Asam Palmitat'], correctIndex: 1 },
  { id: 'q066', level: 7, category: 'budaya', question: 'Gamelan merupakan alat musik tradisional dari...', options: ['Sumatera', 'Kalimantan', 'Sulawesi', 'Jawa dan Bali'], correctIndex: 3 },
  { id: 'q067', level: 7, category: 'teknologi', question: 'Komputer pertama di dunia bernama...', options: ['UNIVAC', 'ENIAC', 'IBM 701', 'Colossus'], correctIndex: 1 },
  { id: 'q068', level: 7, category: 'sains', question: 'Proses pembelahan sel disebut...', options: ['Mitosis', 'Meiosis', 'Osmosis', 'Difusi'], correctIndex: 0 },
  { id: 'q069', level: 7, category: 'geografi', question: 'Negara manakah yang memiliki garis pantai terpanjang?', options: ['Australia', 'Amerika Serikat', 'Kanada', 'Rusia'], correctIndex: 2 },
  { id: 'q070', level: 7, category: 'sejarah', question: 'Peristiwa G30S/PKI terjadi pada tanggal...', options: ['1 Oktober 1965', '30 September 1965', '17 Agustus 1965', '10 November 1965'], correctIndex: 1 },

  // LEVEL 8
  { id: 'q071', level: 8, category: 'sains', question: 'Rumus kimia gula (sukrosa) adalah...', options: ['C6H12O6', 'C12H22O11', 'C6H10O5', 'CH4'], correctIndex: 1 },
  { id: 'q072', level: 8, category: 'matematika', question: 'Log 1000 dalam basis 10 adalah...', options: ['2', '3', '4', '5'], correctIndex: 1 },
  { id: 'q073', level: 8, category: 'geografi', question: 'Sungai Amazon mengalir melewati negara...', options: ['Argentina', 'Brasil', 'Chile', 'Peru'], correctIndex: 1 },
  { id: 'q074', level: 8, category: 'sejarah', question: 'Dinasti manakah yang membangun Tembok Besar Cina?', options: ['Han', 'Tang', 'Qin', 'Ming'], correctIndex: 2 },
  { id: 'q075', level: 8, category: 'sains', question: 'Jumlah pasang kromosom seks manusia adalah...', options: ['1 pasang', '2 pasang', '3 pasang', '4 pasang'], correctIndex: 0 },
  { id: 'q076', level: 8, category: 'teknologi', question: 'Satuan kecepatan internet Gbps singkatan dari...', options: ['Gigabytes per second', 'Gigabits per second', 'Gigabaud per second', 'Gigabase per second'], correctIndex: 1 },
  { id: 'q077', level: 8, category: 'budaya', question: 'Komodo Dragon hanya ditemukan di pulau...', options: ['Lombok', 'Sumbawa', 'Flores dan Komodo', 'Timor'], correctIndex: 2 },
  { id: 'q078', level: 8, category: 'sains', question: 'Unsur terbanyak di alam semesta adalah...', options: ['Helium', 'Hidrogen', 'Oksigen', 'Karbon'], correctIndex: 1 },
  { id: 'q079', level: 8, category: 'geografi', question: 'Titik tertinggi di Indonesia adalah Puncak...', options: ['Jaya', 'Mandala', 'Rinjani', 'Kerinci'], correctIndex: 0 },
  { id: 'q080', level: 8, category: 'sejarah', question: 'Traktat Linggarjati ditandatangani pada tahun...', options: ['1945', '1946', '1947', '1948'], correctIndex: 2 },

  // LEVEL 9
  { id: 'q081', level: 9, category: 'sains', question: 'Percepatan gravitasi di permukaan bumi kira-kira...', options: ['8.8 m/s2', '9.8 m/s2', '10.8 m/s2', '11.8 m/s2'], correctIndex: 1 },
  { id: 'q082', level: 9, category: 'matematika', question: 'Deret Fibonacci dimulai dengan...', options: ['0, 1, 1, 2, 3', '1, 1, 2, 3, 5', '0, 1, 2, 3, 5', '1, 2, 3, 4, 5'], correctIndex: 0 },
  { id: 'q083', level: 9, category: 'geografi', question: 'Selat manakah yang memisahkan Pulau Jawa dan Sumatra?', options: ['Selat Bali', 'Selat Lombok', 'Selat Sunda', 'Selat Karimata'], correctIndex: 2 },
  { id: 'q084', level: 9, category: 'sejarah', question: 'Konferensi Asia Afrika berlangsung di kota...', options: ['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya'], correctIndex: 1 },
  { id: 'q085', level: 9, category: 'sains', question: 'Berapa persen oksigen di atmosfer bumi?', options: ['11%', '21%', '31%', '41%'], correctIndex: 1 },
  { id: 'q086', level: 9, category: 'teknologi', question: 'Bahasa pemrograman Python diciptakan oleh...', options: ['Linus Torvalds', 'Guido van Rossum', 'Dennis Ritchie', 'James Gosling'], correctIndex: 1 },
  { id: 'q087', level: 9, category: 'budaya', question: 'Wayang Kulit ditetapkan UNESCO sebagai warisan budaya pada tahun...', options: ['2001', '2003', '2005', '2007'], correctIndex: 1 },
  { id: 'q088', level: 9, category: 'sains', question: 'Hukum pertama Newton berbunyi tentang...', options: ['Aksi-Reaksi', 'Kelembaman', 'Percepatan', 'Gaya'], correctIndex: 1 },
  { id: 'q089', level: 9, category: 'geografi', question: 'Berapa pulau yang dimiliki Indonesia (secara resmi)?', options: ['13.466', '15.000', '17.000', '17.504'], correctIndex: 3 },
  { id: 'q090', level: 9, category: 'sejarah', question: 'ASEAN didirikan pada tahun...', options: ['1965', '1966', '1967', '1968'], correctIndex: 2 },

  // LEVEL 10
  { id: 'q091', level: 10, category: 'sains', question: 'Berapakah nilai konstanta Avogadro (kira-kira)?', options: ['6.022 x 10^22', '6.022 x 10^23', '6.022 x 10^24', '6.022 x 10^21'], correctIndex: 1 },
  { id: 'q092', level: 10, category: 'matematika', question: 'Integral dari 2x adalah...', options: ['x', 'x^2', 'x^2 + C', '2x^2 + C'], correctIndex: 2 },
  { id: 'q093', level: 10, category: 'geografi', question: 'Negara manakah yang tidak berbatasan darat dengan Rusia?', options: ['Finlandia', 'Jepang', 'China', 'Kazakhstan'], correctIndex: 1 },
  { id: 'q094', level: 10, category: 'sejarah', question: 'Perjanjian Renville ditandatangani di atas kapal Amerika bernama...', options: ['USS Renville', 'USS Canberra', 'USS Roosevelt', 'USS Missouri'], correctIndex: 0 },
  { id: 'q095', level: 10, category: 'sains', question: 'Prinsip ketidakpastian Heisenberg menyatakan bahwa...', options: ['Energi tidak bisa diciptakan', 'Posisi dan momentum tidak bisa diukur bersamaan secara tepat', 'Cahaya bersifat gelombang dan partikel', 'Atom terdiri dari inti dan elektron'], correctIndex: 1 },
  { id: 'q096', level: 10, category: 'teknologi', question: 'Protocol HTTP menggunakan port nomor...', options: ['21', '25', '80', '443'], correctIndex: 2 },
  { id: 'q097', level: 10, category: 'budaya', question: 'Epos Mahabharata berasal dari negara...', options: ['Tiongkok', 'India', 'Persia', 'Mesir'], correctIndex: 1 },
  { id: 'q098', level: 10, category: 'sains', question: 'Neutrino adalah partikel yang...', options: ['Bermuatan positif', 'Bermuatan negatif', 'Bermuatan netral', 'Tidak bermassa'], correctIndex: 2 },
  { id: 'q099', level: 10, category: 'geografi', question: 'Benua manakah yang tidak memiliki negara?', options: ['Arktik', 'Antartika', 'Greenland', 'Islandia'], correctIndex: 1 },
  { id: 'q100', level: 10, category: 'sejarah', question: 'Siapa yang mendeklarasikan kemerdekaan Amerika Serikat?', options: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'Benjamin Franklin'], correctIndex: 2 },

  // LEVEL 11
  { id: 'q101', level: 11, category: 'sains', question: 'Teori Big Bang dikemukakan pertama kali oleh...', options: ['Stephen Hawking', 'Georges Lemaitre', 'Edwin Hubble', 'Albert Einstein'], correctIndex: 1 },
  { id: 'q102', level: 11, category: 'matematika', question: 'Turunan dari sin(x) adalah...', options: ['-sin(x)', 'cos(x)', '-cos(x)', 'tan(x)'], correctIndex: 1 },
  { id: 'q103', level: 11, category: 'geografi', question: 'Titik paling utara yang bisa dijangkau manusia secara permanen adalah...', options: ['Siberia', 'Alaska', 'Svalbard', 'Greenland'], correctIndex: 2 },
  { id: 'q104', level: 11, category: 'sejarah', question: 'Perang Vietnam secara resmi berakhir pada tahun...', options: ['1973', '1974', '1975', '1976'], correctIndex: 2 },
  { id: 'q105', level: 11, category: 'sains', question: 'Lapisan atmosfer tempat pesawat terbang adalah...', options: ['Stratosfer', 'Troposfer', 'Mesosfer', 'Termosfer'], correctIndex: 1 },
  { id: 'q106', level: 11, category: 'teknologi', question: 'TCP/IP dikembangkan oleh...', options: ['Tim Berners-Lee', 'Vint Cerf dan Bob Kahn', 'Bill Gates', 'Dennis Ritchie'], correctIndex: 1 },
  { id: 'q107', level: 11, category: 'budaya', question: 'Seni ukir Jepara berasal dari provinsi...', options: ['Jawa Tengah', 'Jawa Barat', 'Jawa Timur', 'DI Yogyakarta'], correctIndex: 0 },
  { id: 'q108', level: 11, category: 'sains', question: 'Persamaan E=mc2 menyatakan bahwa...', options: ['Energi sama dengan massa dikali kecepatan', 'Energi setara dengan massa dikali kuadrat kecepatan cahaya', 'Massa berkurang saat bergerak', 'Energi tidak bergantung pada massa'], correctIndex: 1 },
  { id: 'q109', level: 11, category: 'geografi', question: 'Zona waktu Indonesia terbagi menjadi berapa bagian?', options: ['2', '3', '4', '5'], correctIndex: 1 },
  { id: 'q110', level: 11, category: 'sejarah', question: 'Runtuhnya Tembok Berlin terjadi pada tahun...', options: ['1987', '1988', '1989', '1990'], correctIndex: 2 },

  // LEVEL 12
  { id: 'q111', level: 12, category: 'sains', question: 'Boson Higgs ditemukan secara eksperimental pada tahun...', options: ['2010', '2011', '2012', '2013'], correctIndex: 2 },
  { id: 'q112', level: 12, category: 'matematika', question: 'Bilangan Prima ke-10 adalah...', options: ['23', '27', '29', '31'], correctIndex: 2 },
  { id: 'q113', level: 12, category: 'geografi', question: 'Laut Kaspia secara teknis adalah sebuah...', options: ['Laut', 'Danau', 'Selat', 'Teluk'], correctIndex: 1 },
  { id: 'q114', level: 12, category: 'sejarah', question: 'Traktat Versailles ditandatangani untuk mengakhiri...', options: ['Perang Dunia II', 'Perang Dingin', 'Perang Dunia I', 'Perang Napoleon'], correctIndex: 2 },
  { id: 'q115', level: 12, category: 'sains', question: 'Massa atom Karbon-12 didefinisikan sebagai...', options: ['10 dalton', '11 dalton', '12 dalton', '14 dalton'], correctIndex: 2 },
  { id: 'q116', level: 12, category: 'teknologi', question: 'Algoritma enkripsi RSA menggunakan konsep...', options: ['Substitusi sederhana', 'Bilangan prima besar', 'Hash function', 'Symmetric key'], correctIndex: 1 },
  { id: 'q117', level: 12, category: 'budaya', question: 'Naskah Negarakertagama ditulis oleh pujangga...', options: ['Mpu Prapanca', 'Mpu Tantular', 'Mpu Kanwa', 'Mpu Dharmaja'], correctIndex: 0 },
  { id: 'q118', level: 12, category: 'sains', question: 'Supernova terjadi ketika sebuah bintang...', options: ['Baru terbentuk', 'Meledak di akhir hidupnya', 'Bertambah besar', 'Bergerak cepat'], correctIndex: 1 },
  { id: 'q119', level: 12, category: 'geografi', question: 'Berapa lama cahaya matahari sampai ke bumi?', options: ['5 menit', '8 menit', '11 menit', '15 menit'], correctIndex: 1 },
  { id: 'q120', level: 12, category: 'sejarah', question: 'Proklamasi WHO (Organisasi Kesehatan Dunia) dideklarasikan pada tahun...', options: ['1945', '1946', '1948', '1950'], correctIndex: 2 },

  // LEVEL 13
  { id: 'q121', level: 13, category: 'sains', question: 'Konstanta Planck memiliki nilai kira-kira...', options: ['6.63 x 10^-34 J.s', '6.63 x 10^-32 J.s', '6.63 x 10^-30 J.s', '9.81 x 10^-34 J.s'], correctIndex: 0 },
  { id: 'q122', level: 13, category: 'matematika', question: 'Teorema Bayes digunakan dalam bidang...', options: ['Geometri', 'Probabilitas dan statistika', 'Aljabar linier', 'Kalkulus'], correctIndex: 1 },
  { id: 'q123', level: 13, category: 'geografi', question: 'Sesar San Andreas terletak di...', options: ['Japan', 'Chile', 'California, USA', 'New Zealand'], correctIndex: 2 },
  { id: 'q124', level: 13, category: 'sejarah', question: 'Sistem penulisan hieroglif digunakan oleh peradaban...', options: ['Mesopotamia', 'Yunani Kuno', 'Mesir Kuno', 'Romawi Kuno'], correctIndex: 2 },
  { id: 'q125', level: 13, category: 'sains', question: 'Berapakah kecepatan elektron mengorbit dalam teori Bohr model hidrogen?', options: ['1/137 kecepatan cahaya', '1/10 kecepatan cahaya', '1/100 kecepatan cahaya', '1/1000 kecepatan cahaya'], correctIndex: 0 },
  { id: 'q126', level: 13, category: 'teknologi', question: 'Machine Learning pertama kali didefinisikan oleh...', options: ['Alan Turing', 'Arthur Samuel', 'John McCarthy', 'Marvin Minsky'], correctIndex: 1 },
  { id: 'q127', level: 13, category: 'budaya', question: 'Kitab Sutasoma yang memuat kalimat "Bhinneka Tunggal Ika" ditulis pada abad ke...', options: ['13', '14', '15', '16'], correctIndex: 1 },
  { id: 'q128', level: 13, category: 'sains', question: 'Fenomena aurora borealis terjadi karena...', options: ['Pantulan cahaya matahari dari es', 'Interaksi partikel matahari dengan medan magnet bumi', 'Aktivitas gunung berapi', 'Perubahan lapisan ozon'], correctIndex: 1 },
  { id: 'q129', level: 13, category: 'geografi', question: 'Konveksi di mantel bumi mendorong terjadinya...', options: ['Hujan', 'Lempeng tektonik', 'Pasang surut', 'Angin muson'], correctIndex: 1 },
  { id: 'q130', level: 13, category: 'sejarah', question: 'Siapa ilmuwan yang membuktikan bumi mengelilingi matahari?', options: ['Galileo Galilei', 'Tycho Brahe', 'Nicolaus Copernicus', 'Johannes Kepler'], correctIndex: 2 },

  // LEVEL 14
  { id: 'q131', level: 14, category: 'sains', question: 'Fenomena entanglement kuantum pertama kali dibuktikan oleh eksperimen...', options: ['Stern-Gerlach', 'Alain Aspect', 'EPR (Einstein-Podolsky-Rosen)', 'Bell inequality'], correctIndex: 1 },
  { id: 'q132', level: 14, category: 'matematika', question: 'Hipotesis Riemann berkaitan dengan distribusi...', options: ['Bilangan irasional', 'Bilangan prima', 'Bilangan real', 'Bilangan imajiner'], correctIndex: 1 },
  { id: 'q133', level: 14, category: 'geografi', question: 'Plume mantel yang menyebabkan kepulauan Hawaii adalah...', options: ['Hotspot Hawaii', 'Ring of Fire', 'Mid-Atlantic Ridge', 'Hawaiian Ridge'], correctIndex: 0 },
  { id: 'q134', level: 14, category: 'sejarah', question: 'Peradaban Indus Valley berpusat di kota kuno...', options: ['Mohenjo-Daro', 'Babylon', 'Ur', 'Nineveh'], correctIndex: 0 },
  { id: 'q135', level: 14, category: 'sains', question: 'Protein yang membawa oksigen dalam darah adalah...', options: ['Albumin', 'Hemoglobin', 'Globulin', 'Fibrinogen'], correctIndex: 1 },
  { id: 'q136', level: 14, category: 'teknologi', question: 'Algoritma sorting yang rata-rata paling efisien adalah...', options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'], correctIndex: 2 },
  { id: 'q137', level: 14, category: 'budaya', question: 'Filosofi "Sangkan Paraning Dumadi" berasal dari tradisi...', options: ['Hindu Bali', 'Jawa Kejawen', 'Islam Jawa', 'Buddha Nusantara'], correctIndex: 1 },
  { id: 'q138', level: 14, category: 'sains', question: 'Kosmologi standar menyatakan bahwa alam semesta berusia kira-kira...', options: ['9 miliar tahun', '11 miliar tahun', '13.8 miliar tahun', '15 miliar tahun'], correctIndex: 2 },
  { id: 'q139', level: 14, category: 'geografi', question: 'Lapisan inti bumi terluar terbuat dari...', options: ['Besi dan nikel cair', 'Batuan keras', 'Magma', 'Silikon'], correctIndex: 0 },
  { id: 'q140', level: 14, category: 'sejarah', question: 'Siapakah filosof yang menulis "Kritik atas Akal Murni"?', options: ['Plato', 'Aristoteles', 'Immanuel Kant', 'Hegel'], correctIndex: 2 },

  // LEVEL 15 - Hardest
  { id: 'q141', level: 15, category: 'sains', question: 'Paradoks Fermi menanyakan mengapa kita belum bertemu dengan...', options: ['Materi gelap', 'Kehidupan alien cerdas', 'Lubang hitam', 'Anti-materi'], correctIndex: 1 },
  { id: 'q142', level: 15, category: 'matematika', question: 'Teorema terakhir Fermat akhirnya dibuktikan oleh...', options: ['Andrew Wiles', 'Pierre de Fermat', 'Carl Gauss', 'Leonhard Euler'], correctIndex: 0 },
  { id: 'q143', level: 15, category: 'sains', question: 'Dark energy diperkirakan menyusun berapa persen dari alam semesta?', options: ['5%', '27%', '68%', '50%'], correctIndex: 2 },
  { id: 'q144', level: 15, category: 'sejarah', question: 'Siapakah yang pertama kali memetakan genom manusia secara lengkap (Human Genome Project)?', options: ['James Watson', 'Craig Venter dan Francis Collins', 'Rosalind Franklin', 'Frederick Sanger'], correctIndex: 1 },
  { id: 'q145', level: 15, category: 'sains', question: 'Prinsip superposisi dalam mekanika kuantum menyatakan bahwa...', options: ['Partikel bisa ada di dua tempat sekaligus', 'Partikel selalu diam', 'Energi selalu konstan', 'Massa tidak bisa berubah'], correctIndex: 0 },
  { id: 'q146', level: 15, category: 'teknologi', question: 'Bit qubit dalam komputasi kuantum berbeda dari bit klasik karena dapat...', options: ['Bergerak lebih cepat', 'Berada dalam superposisi 0 dan 1', 'Menyimpan data lebih besar', 'Beroperasi tanpa listrik'], correctIndex: 1 },
  { id: 'q147', level: 15, category: 'matematika', question: 'Masalah P vs NP adalah salah satu dari...', options: ['Soal Olimpiade Matematika', 'Millennium Prize Problems', 'Teorema Godel', 'Paradoks Russell'], correctIndex: 1 },
  { id: 'q148', level: 15, category: 'sains', question: 'String theory menyatakan bahwa partikel fundamental adalah...', options: ['Titik dimensi nol', 'Tali bergetar berdimensi satu', 'Bola berdimensi tiga', 'Gelombang berdimensi dua'], correctIndex: 1 },
  { id: 'q149', level: 15, category: 'sejarah', question: 'Siapakah filsuf yang mengajukan konsep "cogito ergo sum"?', options: ['Blaise Pascal', 'Rene Descartes', 'Francis Bacon', 'John Locke'], correctIndex: 1 },
  { id: 'q150', level: 15, category: 'sains', question: 'Kondensasi Bose-Einstein adalah keadaan materi di mana...', options: ['Gas berubah menjadi cair', 'Atom bergerak sangat cepat', 'Partikel boson menempati keadaan kuantum yang sama', 'Elektron hilang dari atom'], correctIndex: 2 },
];

// Get questions for a specific level, rotated by day
export function getQuestionsForLevel(level: number, seed: number = 0): Question[] {
  const levelQuestions = ALL_QUESTIONS.filter(q => q.level === level);
  // Rotate questions based on seed (day/session)
  const offset = seed % Math.max(1, levelQuestions.length);
  const rotated = [...levelQuestions.slice(offset), ...levelQuestions.slice(0, offset)];
  return rotated;
}

// Get a daily question set for the full game (15 questions, one per level)
export function getDailyQuestionSet(dayOffset: number = 0): Question[] {
  const questions: Question[] = [];
  for (let level = 1; level <= 15; level++) {
    const levelQs = getQuestionsForLevel(level, dayOffset);
    if (levelQs.length > 0) {
      questions.push(levelQs[0]);
    }
  }
  return questions;
}

// Get today's seed based on date
export function getTodaySeed(): number {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

export default ALL_QUESTIONS;
