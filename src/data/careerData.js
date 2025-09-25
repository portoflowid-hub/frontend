export const allCareerData = {
  // Bidang Informatika
  Informatika: [
    { 
      slug: 'front-end-developer',
      title: 'Front-End Developer', 
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://www.youtube.com/embed/ubdo2DzGPoE', 
      description: 'Pengembang web yang bertanggung jawab membuat tampilan antarmuka (UI) yang dilihat dan digunakan langsung oleh pengguna, memastikan pengalaman yang optimal, responsif, dan mudah digunakan.',
      mainTasks: [
        'Menerjemahkan desain UI/UX ke kode',
        'Membuat komponen UI interaktif',
        'Optimasi performa tampilan',
        'Memastikan responsif & kompatibilitas lintas browser',
        'Integrasi dengan Back-End melalui API'
      ],
      roadmap: [
        { level: 'Entry Level', skills: ['HTML 5 & CSS 3', 'Javascript ES6+', 'Git & Github', 'Responsive Design', 'Package Manager (npm/yarn)'] },
        { level: 'Junior', skills: ['Framework (React/Vue/Angular)', 'CSS Preprocessor (Sass/Less)', 'State Management (Redux/Vuex)', 'API Integration (Fetch/Axios)'] },
        { level: 'Mid-Level', skills: ['Testing (Jest, React Testing Library)', 'TypeScript', 'Performance Optimization', 'Build Tools (Webpack/Vite)'] },
        { level: 'Senior', skills: ['Design Patterns', 'CI/CD Pipelines', 'Web Security (OWASP)', 'GraphQL'] },
        { level: 'Expert', skills: ['Micro-frontends Architecture', 'Web Assembly (WASM)', 'Leadership & Mentoring', 'Open Source Contribution'] },
      ]
    },
    { 
      slug: 'back-end-developer',
      title: 'Back-End Developer', 
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://www.youtube.com/embed/XBu54nfYv_4',
      description: 'Pengembang yang bekerja di sisi server, mengelola database, logika aplikasi, dan API untuk memastikan semua proses di balik layar berjalan dengan efisien, aman, dan terstruktur.',
      mainTasks: [
        'Merancang dan mengelola database',
        'Membangun API',
        'Mengatur server & deployment',
        'Mengimplementasikan logika bisnis aplikasi',
        'Menjaga keamanan server & data'
      ],
      roadmap: [
        { level: 'Entry Level', skills: ['Bahasa Pemrograman (Node.js/Python/Go)', 'Database (SQL/NoSQL)', 'Konsep API (REST)', 'Version Control (Git)'] },
        { level: 'Junior', skills: ['Framework (Express/Django/Spring)', 'ORM/ODM (Sequelize/Mongoose)', 'Authentication & Authorization'] },
        { level: 'Mid-Level', skills: ['Caching (Redis)', 'Containerization (Docker)', 'Message Queues (RabbitMQ/Kafka)'] },
        { level: 'Senior', skills: ['Microservices Architecture', 'System Design', 'Cloud Platforms (AWS/GCP/Azure)'] },
      ]
    },
    { 
      slug: 'android-developer',
      title: 'Android Developer', 
      image: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://www.youtube.com/embed/fis26HvvDII',
      description: 'Pengembang aplikasi mobile khusus platform Android, bertanggung jawab merancang, membangun, menguji, dan merilis aplikasi yang optimal untuk berbagai perangkat Android.',
      mainTasks: [
        'Membangun aplikasi Android dengan Java/Kotlin',
        'Integrasi API dan database',
        'Mengoptimalkan performa aplikasi',
        'Mengimplementasikan Material Design',
        'Pengujian aplikasi di berbagai device'
      ],
      roadmap: [
        { level: 'Entry Level', skills: ['Java/Kotlin Dasar', 'Android Studio', 'UI Layout (XML)', 'Basic API Integration'] },
        { level: 'Junior', skills: ['Advanced Kotlin', 'Room Database/SQLite', 'Dependency Injection (Dagger/Hilt)', 'Unit Testing'] },
        { level: 'Mid-Level', skills: ['Jetpack Compose', 'Architecture Pattern (MVVM/MVP)', 'Push Notification (Firebase)', 'App Optimization'] },
        { level: 'Senior', skills: ['CI/CD Mobile', 'Security & Encryption', 'Scalable App Architecture', 'Mentoring Tim'] },
      ]
    },
    { 
      slug: 'machine-learning-engineer',
      title: 'Machine Learning Engineer', 
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://www.youtube.com/embed/Jc-2V_n3b9M',
      description: 'Engineer yang merancang, melatih, dan mengoptimalkan model machine learning untuk memecahkan masalah menggunakan data, mulai dari klasifikasi, prediksi, hingga rekomendasi.',
      mainTasks: [
        'Mengolah dan membersihkan data',
        'Membangun model machine learning',
        'Evaluasi & tuning model',
        'Implementasi model ke produksi',
        'Optimasi performa sistem AI'
      ],
      roadmap: [
        { level: 'Entry Level', skills: ['Python', 'Numpy & Pandas', 'Matplotlib/Seaborn', 'Statistika Dasar'] },
        { level: 'Junior', skills: ['Scikit-Learn', 'Supervised & Unsupervised Learning', 'Feature Engineering'] },
        { level: 'Mid-Level', skills: ['Deep Learning (TensorFlow/PyTorch)', 'NLP dasar', 'Model Deployment (Flask/FastAPI)'] },
        { level: 'Senior', skills: ['Computer Vision', 'MLOps (MLflow, Kubeflow)', 'Big Data Processing (Spark, Hadoop)'] },
        { level: 'Expert', skills: ['Research ML/AI', 'State-of-the-art Architectures', 'AI Ethics & Fairness'] },
      ]
    },
  ],

  // Bidang Akuntansi
  Akuntansi: [
    { 
      slug: 'auditor',
      title: 'Auditor', 
      image: 'https://images.pexels.com/photos/7793738/pexels-photo-7793738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://www.youtube.com/embed/C464aG3C2hA',
      description: 'Auditor bertugas memeriksa dan mengevaluasi laporan keuangan perusahaan untuk memastikan kepatuhan terhadap standar akuntansi, hukum, dan regulasi yang berlaku.',
      mainTasks: [
        'Memeriksa laporan keuangan',
        'Mengevaluasi kepatuhan terhadap standar',
        'Mengidentifikasi potensi risiko keuangan',
        'Menyusun laporan audit'
      ],
      roadmap: [
        { level: 'Entry Level', skills: ['Dasar Akuntansi', 'Excel & Spreadsheet', 'Pemahaman Laporan Keuangan'] },
        { level: 'Junior', skills: ['Audit Internal', 'Standar Akuntansi (PSAK/IFRS)', 'Analisis Data Keuangan'] },
        { level: 'Mid-Level', skills: ['Audit Eksternal', 'Teknik Sampling Audit', 'Software Audit (ACL/IDEA)'] },
        { level: 'Senior', skills: ['Manajemen Risiko', 'Forensic Audit', 'Leadership dalam tim audit'] },
      ]
    },
    { 
      slug: 'konsultan-pajak',
      title: 'Konsultan Pajak', 
      image: 'https://images.pexels.com/photos/6863240/pexels-photo-6863240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      videoUrl: 'https://www.youtube.com/embed/uG93zC34-yY',
      description: 'Konsultan Pajak membantu individu maupun perusahaan dalam perencanaan, perhitungan, dan kepatuhan pajak agar lebih efisien dan sesuai regulasi.',
      mainTasks: [
        'Menyusun laporan pajak',
        'Menganalisis peraturan pajak terbaru',
        'Memberikan konsultasi strategi pajak',
        'Membantu menyelesaikan sengketa pajak'
      ],
      roadmap: [
        { level: 'Entry Level', skills: ['Dasar Perpajakan', 'Microsoft Excel', 'Peraturan Pajak Dasar'] },
        { level: 'Junior', skills: ['PPh 21, 22, 23, 25, 29', 'PPN', 'E-Filing Pajak'] },
        { level: 'Mid-Level', skills: ['Perencanaan Pajak (Tax Planning)', 'Transfer Pricing', 'Software Pajak'] },
        { level: 'Senior', skills: ['Strategi Pajak Tingkat Lanjut', 'Tax Dispute Resolution', 'Manajemen Tim Konsultan'] },
      ]
    },
  ],
};
