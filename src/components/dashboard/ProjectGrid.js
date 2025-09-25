// src/components/dashboard/ProjectGrid.js (DIPERBAIKI)

import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/dashboard/Dashboard.module.css';
import { 
  BsPersonFill, BsPeopleFill, BsHeart, BsChat, BsShare, 
  BsBookmark, BsLink45Deg, BsBuilding, BsPlusCircleFill 
} from 'react-icons/bs';

import Modal from './Modal'; 
import AddProjectForm from './AddProjectForm';

// --- KODE ASLI ANDA UNTUK CARD DIKEMBALIKAN ---
const ProjectCard = ({ project }) => (
  <div className={styles.card}>
    <div className={styles.cardImageWrapper}>
      <Image 
        src={project.imageUrl || '/images/placeholder.jpg'} 
        alt={project.title} 
        layout="fill" 
        objectFit="cover" 
      />
    </div>
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        {project.isGroup ? (
          <BsPeopleFill title="Group Project"/>
        ) : (
          <BsPersonFill title="Solo Project"/>
        )}
      </div>
      <p className={styles.cardDescription}>{project.description}</p>
      <div className={styles.cardMeta}>
        <span>
          {new Date(project.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        {project.projectUrl && (
          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
            Lihat Proyek
          </a>
        )}
      </div>
    </div>
    <div className={styles.cardFooter}>
      <div className={styles.cardActions}>
        <button><BsHeart/></button>
        <button><BsChat/></button>
        <button><BsShare/></button>
      </div>
      <button><BsBookmark/></button>
    </div>
  </div>
);

const CertificateCard = ({ certificate }) => (
  <div className={styles.certificateCard}>
    <div className={styles.cardImageWrapper}>
      <Image src={certificate.image || '/images/placeholder.jpg'} alt={certificate.name} layout="fill" objectFit="cover" />
    </div>
    <div className={styles.certificateBody}>
      <h3 className={styles.cardTitle}>{certificate.name}</h3>
      <div className={styles.certificateMeta}>
        <p className={styles.cardDescription}>{certificate.description}</p>
        <div className={styles.certificateActions}>
          <button><BsHeart/></button>
          <button><BsBookmark/></button>
        </div>
      </div>
      <div className={styles.certificateFooter}>
        <span>{certificate.date}</span>
        <a href={certificate.link} target="_blank" rel="noopener noreferrer">
          <BsLink45Deg /> Lihat Kredensial
        </a>
      </div>
    </div>
  </div>
);

const ExperienceCard = ({ experience }) => (
  <div className={styles.experienceCard}>
    <div className={styles.experienceIcon}><BsBuilding /></div>
    <div className={styles.experienceContent}>
      <h3 className={styles.cardTitle}>{experience.role}</h3>
      <div className={styles.experienceMeta}>
        <span>{experience.company}</span>
        <span>{experience.dateRange}</span>
      </div>
      <p className={styles.cardDescription}>{experience.description}</p>
    </div>
  </div>
);
// --- Akhir Komponen Card ---


// Placeholder untuk form yang belum dibuat
const AddCertificateForm = ({ onClose }) => <div>Form Tambah Sertifikat akan dibuat.</div>;
const AddExperienceForm = ({ onClose }) => <div>Form Tambah Pengalaman akan dibuat.</div>;


// Komponen baru untuk menampilkan pesan saat daftar kosong
const EmptyState = ({ text }) => (
  <div className={styles.emptyStateContainer}>
    <p className={styles.emptyStateText}>{`Belum ada ${text.toLowerCase()} yang ditambahkan.`}</p>
  </div>
);


const DashboardContent = ({ projects, certificates, experiences, onDataAdded }) => {
  const [activeTab, setActiveTab] = useState('project');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };
  
  const handleSuccess = (newItem, type) => {
    if (onDataAdded) {
      onDataAdded(newItem, type);
    }
    closeModal();
  };

  // Logika render konten diubah untuk menggunakan EmptyState
  const renderContent = () => {
    switch (activeTab) {
      case 'project':
        return projects && projects.length > 0 
          ? projects.map(project => <ProjectCard key={project._id || project.id} project={project} />)
          : <EmptyState text="Proyek" />;
      case 'certificate':
        return certificates && certificates.length > 0 
          ? certificates.map(cert => <CertificateCard key={cert._id || cert.id} certificate={cert} />)
          : <EmptyState text="Sertifikat" />;
      case 'experience':
        return experiences && experiences.length > 0 
          ? experiences.map(exp => <ExperienceCard key={exp._id || exp.id} experience={exp} />)
          : <EmptyState text="Pengalaman" />;
      default:
        return null;
    }
  };
  
  const renderModalContent = () => {
    switch (modalType) {
      case 'project':
        return <AddProjectForm onClose={closeModal} onSuccess={(newItem) => handleSuccess(newItem, 'project')} />;
      case 'certificate':
        return <AddCertificateForm onClose={closeModal} onSuccess={(newItem) => handleSuccess(newItem, 'certificate')} />;
      case 'experience':
        return <AddExperienceForm onClose={closeModal} onSuccess={(newItem) => handleSuccess(newItem, 'experience')} />;
      default:
        return null;
    }
  };
  
  const getModalTitle = () => {
    if (modalType === 'project') return 'Tambah Proyek Baru';
    if (modalType === 'certificate') return 'Tambah Sertifikat Baru';
    if (modalType === 'experience') return 'Tambah Pengalaman Baru';
    return '';
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <div className={styles.contentTabs}>
            <button className={`${styles.tabButton} ${activeTab === 'project' ? styles.active : ''}`} onClick={() => setActiveTab('project')}>Project</button>
            <button className={`${styles.tabButton} ${activeTab === 'certificate' ? styles.active : ''}`} onClick={() => setActiveTab('certificate')}>Sertifikat</button>
            <button className={`${styles.tabButton} ${activeTab === 'experience' ? styles.active : ''}`} onClick={() => setActiveTab('experience')}>Pengalaman</button>
          </div>
          <button className={styles.addButton} onClick={() => openModal(activeTab)}>
            <BsPlusCircleFill />
            <span>Tambah</span>
          </button>
        </div>

        <div className={styles.projectGrid}>
          {renderContent()}
        </div>
      </div>
      
      <Modal show={isModalOpen} onClose={closeModal} title={getModalTitle()}>
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default DashboardContent;